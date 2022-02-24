@testSuite
Feature: What is your job title or volunteer role? page
    As a Test user
    I want to navigate to What is your job title or volunteer role? page
    So that I can verify the functionality

    Background: Navigate to What is your job title or volunteer role? page
        Given I navigate to What is your job title or volunteer role page

    Scenario: verify page title, error message
        Then I am on the "What is your job title or volunteer role?" page
        And User clicks on continue button
        Then below error message should be presented on What is your job title or volunteer role page
            | ErrorMsg                               |
            | Enter your job title or volunteer role |

    Scenario: User enter data and continue
        And I enter text "Volunteer role" into name of job title field
        And User clicks on continue button
        Then I am on the "what is your address? organisation" page