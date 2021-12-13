@testSuite
Feature: What is the name of your organisation or charity? page
    As a Test user
    I want to navigate to What is the name of your organisation or charity? page
    So that I can verify the functionality

    Background: Navigate to What is the name of your organisation or charity? page
        Given I navigate to What is the name of your organisation or charity page

    Scenario: verify page title, error message
        Then I am on the "What is the name of your organisation or charity?" page
        And User clicks on continue button
        Then below error message should be presented on What is the name of your organisation or charity page
            | ErrorMsg                     |
            | Enter your organisation name |

    Scenario: User enter data and continue
        And I enter text "Organisation Name" into name of organisation field
        And User clicks on continue button
        Then I am on the "What is your job title or volunteer role?" page