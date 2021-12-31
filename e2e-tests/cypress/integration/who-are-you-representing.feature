@testSuite
Feature: Who are you representing? page
    As a Test user
    I want to navigate to Who are you representing? page
    So that I can verify the functionality

    Background: Navigate to Who are you representing? page
        Given I navigate to UK address details page as a representative of a person
        And I enter below data into address details page
            | AddressLine1                  | AddressLine2 | AddressLine3 | PostCode | Country        |
            | Representative Address Line 1 |              |              | NE27 0BB | United Kingdom |
        And User clicks on continue button

    Scenario: verify page title, heading, error message, select a person and continue
        Then I am on the "Who are you representing?" page
        And User clicks on continue button
        Then below error message should be presented on who are you representing page
            | ErrorMsg                            |
            | Select who are you representing for |
        And user selects "A person" on who are you representing page
        And User clicks on continue button
        Then I am on the "What is the full name of the person you are representing?" page

    Scenario: select An organisation or charity and continue
        And user selects "An organisation or charity" on who are you representing page
        And User clicks on continue button
        Then I am on the "What is the full name of the organisation or charity that you are representing?" page

    Scenario: select A family group and continue
        And user selects "A family group" on who are you representing page
        And User clicks on continue button
        Then I am on the "What is the name of the family group you are representing?" page