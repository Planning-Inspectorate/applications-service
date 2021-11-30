@testSuite
Feature: What is your full name page
    As a Test user
    I want to navigate to what is your full name page
    So that I can verify the functionality

    Background: Navigate to full name page
        Given I navigate to what is your full name page selecting "Myself"

    Scenario: Navigate to full name page and verify the content in the page and validate error message
        And I can see the logo gov uk text
        And I am on the "what is your full name?" page
        And I can see the text This service is only for Application service
        And User clicks on continue button
        Then below error message should be presented on full name page
            | ErrorMsg             |
            | Enter your full name |

    Scenario: User click on back link
        When I click on back link
        Then I am on the "who are you registering for?" page

    Scenario: User enter data and continue
        And I enter text "Test MiddleName LastName" into full name field
        And User clicks on continue button
        Then I am on the "Are you 18 or over?" page