# Common Testing Scenario Workflows

Amazon Q prompts for frequently encountered functional testing scenarios.

## Scenario 1: Adding a New Feature to Test

### Adding New UI Component
```
I need to add a new "User Profile" page to the QE Playground application. Create:
- A new route "/profile" in the React client
- User profile page component with form fields for name, email, role
- Update navigation to include profile link
- Add data-testid attributes for all interactive elements
- Include form validation and error handling
Follow the existing patterns from login and dashboard pages.
```

### Creating Tests for New Feature
```
Create comprehensive tests for the new User Profile page:
- Page object in src/pages/profile.page.ts extending BasePage
- UI tests in tests/ui/profile.spec.ts covering form interactions and validation
- API tests if new endpoints are needed
- Include positive and negative test scenarios
- Follow existing naming conventions and import patterns
```

## Scenario 2: Debugging Flaky Tests

### Identifying Flaky Test Patterns
```
I have a flaky test that fails intermittently. Help me add debugging capabilities:
- Add retry logic with exponential backoff
- Implement wait strategies for dynamic content
- Add detailed logging and screenshots on failure
- Create test stability analysis utilities
- Add timing measurements to identify race conditions
```

### Stabilizing Flaky Tests
```
My dashboard search test is flaky. Help me make it more reliable:
- Add proper wait conditions for search results to load
- Implement polling for dynamic content updates
- Add network idle waiting after search input
- Create custom matchers for eventual consistency
- Add test isolation to prevent data contamination between tests
```

## Scenario 3: Testing Error Scenarios

### API Error Handling Tests
```
Create comprehensive error handling tests for the tasks API:
- Test network timeout scenarios
- Test server error responses (500, 503)
- Test malformed request handling
- Test authentication failures and token expiration
- Verify error messages are user-friendly and actionable
```

### UI Error State Testing
```
Create tests for UI error states and edge cases:
- Test form validation with various invalid inputs
- Test network failure handling in the UI
- Test empty states when no data is available
- Test loading states and spinners
- Test error boundary behavior for JavaScript errors
```

## Scenario 4: Data-Driven Testing

### Parameterized Test Creation
```
Convert my existing login tests to use data-driven approaches:
- Create test data files (JSON/CSV) with multiple user scenarios
- Implement parameterized test execution
- Add test data validation and cleanup
- Create reusable data factories for different entity types
- Support for environment-specific test data
```

### Dynamic Test Generation
```
Create dynamic test generation based on API responses:
- Generate tests for each user role automatically
- Create tests for all task status combinations
- Implement property-based testing for form validation
- Add boundary value testing for numeric inputs
- Generate negative test cases automatically
```

## Scenario 5: Integration Testing Scenarios

### End-to-End User Journeys
```
Create comprehensive end-to-end test scenarios:
- Complete user registration and onboarding flow
- Task lifecycle from creation to completion
- Multi-user collaboration scenarios
- Data synchronization between UI and API
- Cross-browser user journey validation
```

### Third-Party Integration Testing
```
Add testing for external service integrations:
- Mock external API dependencies
- Test authentication with external providers
- Validate data transformation between services
- Test fallback behavior when external services are unavailable
- Add contract testing for service boundaries
```

## Scenario 6: CI Pipeline Integration

### CI Setup
```
Set up the test framework for CI/CD integration:
- Create Docker containers for consistent test environments
- Add parallel test execution configuration
- Set up test result reporting and notifications
- Create environment-specific test configurations
- Add automated test scheduling and triggers
```

### Test Environment Management
```
Create robust test environment management:
- Add database seeding and cleanup for CI environments
- Implement test data isolation between parallel runs
- Create environment health checks before test execution
- Add test environment provisioning and teardown
- Implement test result archiving and historical analysis
```

## Usage Guidelines

### When to Use These Scenarios
- **New Feature Testing**: Scenario 1 — adding new functionality
- **Flaky Tests**: Scenario 2 — unreliable tests
- **Error Handling**: Scenario 3 — robust error coverage
- **Data Variations**: Scenario 4 — comprehensive data coverage
- **System Integration**: Scenario 5 — end-to-end validation
- **CI/CD**: Scenario 6 — pipeline automation

### Best Practices
1. Start with the base framework from the main guide
2. Choose scenarios that match your current needs
3. Implement incrementally
4. Test each addition before moving to the next
5. Follow existing conventions established in the framework
