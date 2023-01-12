@testSuite @registration @organisation
Feature: Are you 18 or over page
    As an organisation
    I want to indicate whether I am 18 years old or older
    So that my organisation can be registered as an interested party

    Background: Navigate to Are you 18 or over page
        Given I am registering as an "Organisation"
        And I have been asked whether I am 18 or over

    Scenario: Verify page title, Heading, error message and select yes and continue
        Then I am on the "Are you 18 or over? organisation" page
        And I click on the continue button
        Then the following error messages should be presented
            | ErrorMsg                         |
            | Select yes if you are 18 or over |
        When user selects "Yes" radio option on are you 18 or over page
        And I click on the continue button
        Then I am on the "what is the name of your organisation or charity?" page

    Scenario: select No and continue
        When user selects "No" radio option on are you 18 or over page
        And I click on the continue button
        Then I am on the "what is the name of your organisation or charity?" page
