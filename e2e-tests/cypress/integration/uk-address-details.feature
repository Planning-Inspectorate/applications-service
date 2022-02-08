@testSuite
Feature: UK Address details page
    As a Test user
    I want to navigate to UK Address details page
    So that I can verify the functionality

    Background: Navigate to UK Address details page
        Given I navigate to UK address details page

    Scenario: Verify page title, heading, error messages and continue
        Then I am on the "what is your address?" page
        And User clicks on continue button
        Then below error message should be presented on UK address details page
            | ErrorMsg             |
            | Enter address line 1 |
            | Enter a postcode     |
            | Enter a country      |
        And I enter below data into address details page
            | AddressLine1   | AddressLine2 | AddressLine3 | PostCode | Country        |
            | Address Line 1 |              |              | NE27 0QQ | United Kingdom |
        And User clicks on continue button
        Then I am on the "what is your telephone number?" page
