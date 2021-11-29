@testSuite
Feature: Are you 18 or over page
    As a Test user
    I want to navigate to Are you 18 or over page
    So that I can verify the functionality

    Background: Navigate to Are you 18 or over page
        Given I navigate to Are you 18 or over page

    Scenario: Verify page title, Heading, error message and select yes and continue
        Then I am on the "Are you 18 or over?" page
        And User clicks on continue button
        Then below error message should be presented on are you 18 or over page
            | ErrorMsg                         |
            | Select yes if you are 18 or over |
        And user selects "Yes" radio option on are you 18 or over page
        And User clicks on continue button
        Then I am on the "UK address details" page

    Scenario: select No and continue
        And user selects "No" radio option on are you 18 or over page
        And User clicks on continue button
        Then I am on the "UK address details" page
