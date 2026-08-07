# CI/CD Pipeline — Test Automation Accelerator

Automated Playwright test execution via AWS CodeBuild, triggered on push to the `main` branch of the CodeCommit repository.

## Architecture

```
CodeCommit (push to main)
  → CodeBuild (buildspec.yml)
    → Install deps (cached via S3)
    → Run Playwright tests (or BrowserStack nightly)
    → Publish HTML report to S3 (always, even on failure)
    → Upload artifacts to S3
    → Publish results to CodeBuild Reports

EventBridge (nightly cron)
  → CodeBuild (NIGHTLY_BROWSERSTACK=true)
    → Run BrowserStack Chrome tests
```

## Infrastructure

Defined in `codebuild-cfn.yml` (CloudFormation):

| Resource | Purpose |
|----------|---------|
| `ArtifactBucket` | Build artifacts + S3 cache (30-day retention) |
| `ReportBucket` | Static website hosting for HTML reports (90-day retention) |
| `CodeBuildProject` | Build execution environment |
| `CodeBuildRole` | IAM permissions (S3, CloudWatch, CodeCommit, SSM) |
| `EventBridgeRole` | Permissions to trigger CodeBuild |
| `CodeCommitPushRule` | Trigger on push to main |
| `NightlyBrowserStackRule` | Nightly BrowserStack run (midnight UTC) |

All resources tagged with `Project: box-cc-jg-qa-2026` for cost tracking.

## Prerequisites

- AWS CLI configured with appropriate permissions
- Access to the `test-automation-workspace` CodeCommit repository
- Permissions to create CloudFormation stacks (IAM, CodeBuild, S3)

## Setup

### 1. Deploy the pipeline

```bash
aws cloudformation deploy \
  --template-file codebuild-cfn.yml \
  --stack-name test-automation-pipeline \
  --capabilities CAPABILITY_NAMED_IAM \
  --tags Key=Project,Value=box-cc-jg-qa-2026 \
  --region us-west-2
```

### 2. Verify deployment

```bash
aws codebuild batch-get-projects \
  --names test-automation-pipeline \
  --region us-west-2 \
  --query 'projects[0].name'
```

### 3. Trigger a manual build

```bash
aws codebuild start-build \
  --project-name test-automation-pipeline \
  --region us-west-2
```

## Viewing Test Reports

Reports are published to an S3 static website after every build (even failed ones):

```
http://test-automation-pipeline-reports-<ACCOUNT_ID>.s3-website-us-west-2.amazonaws.com/latest/index.html
```

Historical reports are at:
```
.../runs/<YYYY-MM-DD-HHMMSS>/index.html
```

Get the report URL from stack outputs:

```bash
aws cloudformation describe-stacks \
  --stack-name test-automation-pipeline \
  --region us-west-2 \
  --query 'Stacks[0].Outputs[?OutputKey==`ReportURL`].OutputValue' --output text
```

## Pipeline Triggers

| Trigger | Behavior |
|---------|----------|
| Push to `main` | Automatic build (Playwright headless Chromium) |
| Nightly (midnight UTC) | BrowserStack Chrome on Windows 11 |
| Manual | `aws codebuild start-build --project-name test-automation-pipeline` |

## Environment Variables

All defined in `codebuild-cfn.yml` (single source of truth):

| Variable | Default | Description |
|----------|---------|-------------|
| `CI` | `true` | Enables CI mode in Playwright (forbidOnly, retries) |
| `ENV` | `dev` | Environment name |
| `BASE_URL` | `http://localhost:5173` | Client app URL |
| `API_BASE_URL` | `http://localhost:3000` | API server URL |
| `NODE_OPTIONS` | `--max-old-space-size=4096` | Node memory limit |
| `REPORT_BUCKET` | (from CFN) | S3 bucket for HTML reports |
| `NIGHTLY_BROWSERSTACK` | `false` | Triggers BrowserStack mode |
| `BROWSERSTACK_USERNAME` | (from SSM) | BrowserStack credentials |
| `BROWSERSTACK_ACCESS_KEY` | (from SSM) | BrowserStack credentials |

Override variables for a specific build:

```bash
aws codebuild start-build \
  --project-name test-automation-pipeline \
  --environment-variables-override \
    name=ENV,value=staging \
    name=BASE_URL,value=https://staging.example.com \
  --region us-west-2
```

## Caching

S3 cache is enabled for faster builds:

| Cached Path | Contents |
|-------------|----------|
| `/root/.npm/` | npm packages |
| `/root/.cache/ms-playwright/` | Playwright browser binaries |

First build populates the cache; subsequent builds skip re-downloading (~1-3 min saved).

## Build Logs

```bash
aws logs tail /aws/codebuild/test-automation-pipeline --follow --region us-west-2
```

## Customization

### Change the branch

```bash
aws cloudformation deploy \
  --template-file codebuild-cfn.yml \
  --stack-name test-automation-pipeline \
  --capabilities CAPABILITY_NAMED_IAM \
  --parameter-overrides BranchName=develop \
  --region us-west-2
```

### Run specific test projects

```bash
aws codebuild start-build \
  --project-name test-automation-pipeline \
  --buildspec-override "version: 0.2
phases:
  install:
    runtime-versions:
      nodejs: 22
    commands:
      - cd test-accelerator && npm ci && npx playwright install --with-deps chromium
  build:
    commands:
      - cd test-accelerator && npx playwright test --project=api" \
  --region us-west-2
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `Playwright browser not found` | Ensure `npx playwright install --with-deps chromium` runs in install phase |
| `Connection refused on localhost` | App may not have started — Playwright's webServer config handles this in CI |
| `Build timeout` | Default is 30 min. Increase `TimeoutInMinutes` in the CFN template |
| `Permission denied` | Verify the CodeBuild IAM role has CodeCommit, S3, and CloudWatch permissions |
| Report not published | `on-failure: CONTINUE` ensures post_build always runs. Check REPORT_BUCKET env var |

## Teardown

```bash
# Get bucket names
ARTIFACT_BUCKET=$(aws cloudformation describe-stacks --stack-name test-automation-pipeline --region us-west-2 --query 'Stacks[0].Outputs[?OutputKey==`ArtifactBucketName`].OutputValue' --output text)
REPORT_BUCKET=$(aws cloudformation describe-stacks --stack-name test-automation-pipeline --region us-west-2 --query 'Stacks[0].Outputs[?OutputKey==`ReportBucketName`].OutputValue' --output text)

# Empty buckets (required before stack deletion)
aws s3 rm s3://$ARTIFACT_BUCKET --recursive
aws s3 rm s3://$REPORT_BUCKET --recursive

# Delete the stack
aws cloudformation delete-stack --stack-name test-automation-pipeline --region us-west-2
```
