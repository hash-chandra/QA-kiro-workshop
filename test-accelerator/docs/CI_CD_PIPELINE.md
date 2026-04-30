# CI/CD Pipeline — Test Automation Accelerator

Automated Playwright test execution via AWS CodeBuild, triggered on push to the `main` branch of the CodeCommit repository.

## Architecture

```
CodeCommit (push to main)
  → CodeBuild (buildspec.yml)
    → Install deps (server + client + Playwright)
    → Start qe-playground (API + UI)
    → Run Playwright tests
    → Upload artifacts to S3
    → Publish results to CodeBuild Reports
```

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
  --region us-west-2
```

### 2. Verify deployment

```bash
aws codebuild batch-get-projects \
  --names test-automation-pipeline \
  --region us-west-2 \
  --query 'projects[0].name'
```

### 3. Trigger a manual build (first validation run)

```bash
aws codebuild start-build \
  --project-name test-automation-pipeline \
  --region us-west-2
```

Monitor the build:

```bash
# Get the latest build ID
BUILD_ID=$(aws codebuild list-builds-for-project \
  --project-name test-automation-pipeline \
  --region us-west-2 \
  --query 'ids[0]' --output text)

# Check status
aws codebuild batch-get-builds \
  --ids $BUILD_ID \
  --region us-west-2 \
  --query 'builds[0].{Status:buildStatus,Phase:currentPhase,Start:startTime}'
```

## Pipeline Triggers

| Trigger | Behavior |
|---------|----------|
| Push to `main` | Automatic build via webhook |
| Manual | `aws codebuild start-build --project-name test-automation-pipeline` |

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `CI` | `true` | Enables CI mode in Playwright (forbidOnly, retries) |
| `ENV` | `dev` | Environment name |
| `BASE_URL` | `http://localhost:5173` | Client app URL |
| `API_BASE_URL` | `http://localhost:3000` | API server URL |

Override variables for a specific build:

```bash
aws codebuild start-build \
  --project-name test-automation-pipeline \
  --environment-variables-override \
    name=ENV,value=staging \
    name=BASE_URL,value=https://staging.example.com \
  --region us-west-2
```

## Artifacts & Reports

### Test Reports

View in the AWS Console under **CodeBuild → Report groups → test-automation-pipeline-playwright-results**, or:

```bash
aws codebuild list-reports-for-report-group \
  --report-group-arn arn:aws:codebuild:us-west-2:<ACCOUNT_ID>:report-group/test-automation-pipeline-playwright-results \
  --region us-west-2
```

### Build Artifacts (S3)

Each build uploads:
- `playwright-report/` — HTML report (downloadable, viewable locally)
- `test-results/` — JSON results, traces, screenshots, videos

```bash
# List artifacts for the latest build
BUCKET=$(aws cloudformation describe-stacks \
  --stack-name test-automation-pipeline \
  --region us-west-2 \
  --query 'Stacks[0].Outputs[?OutputKey==`ArtifactBucketName`].OutputValue' --output text)

aws s3 ls s3://$BUCKET/ --recursive
```

### Viewing the HTML Report Locally

```bash
# Download and extract
aws s3 cp s3://$BUCKET/<BUILD_ID>/test-results.zip ./report.zip
unzip report.zip -d ./report
npx playwright show-report ./report/test-accelerator/playwright-report
```

## Build Logs

Logs stream to CloudWatch at `/aws/codebuild/test-automation-pipeline`. View in console or:

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

Override the build command:

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
| `Connection refused on localhost` | Check pre_build logs — app may not have started. Increase retry count in buildspec |
| `Build timeout` | Default is 30 min. Increase `TimeoutInMinutes` in the CFN template |
| `Permission denied` | Verify the CodeBuild IAM role has CodeCommit, S3, and CloudWatch permissions |

## Teardown

```bash
# Empty the artifact bucket first
aws s3 rm s3://$BUCKET --recursive

# Delete the stack
aws cloudformation delete-stack \
  --stack-name test-automation-pipeline \
  --region us-west-2
```
