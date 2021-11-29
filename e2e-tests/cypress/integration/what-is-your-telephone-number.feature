@testSuite
Feature: What is your telephone number page
    As a Test user
    I want to navigate to What is your telephone number page
    So that I can verify the functionality

    Background: Navigate to What is your telephone number page
        Given I navigate to UK address details page
        And I enter below data into address details page
            | AddressLine1   | AddressLine2 | AddressLine3 | PostCode | Country        |
            | Address Line 1 |              |              | NE27 0QQ | United Kingdom |
        And User clicks on continue button
        And I enter "test@gmail.com" into email address field
        And User clicks on continue button

    Scenario: verify page title, heading, error message and continue
        Then I am on the "What is your telephone number?" page
        And User clicks on continue button
        Then below error message should be presented on What is your telephone number page
            | ErrorMsg                    |
            | Enter your telephone number |
        And I enter "1234567899" into telephone number field
        And User clicks on continue button
        Then I am on the "What do you want to tell us about this proposed project?" page
