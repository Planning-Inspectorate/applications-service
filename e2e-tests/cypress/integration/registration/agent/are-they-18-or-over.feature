@testSuite @registration @agent
Feature: Are they 18 or over page
    As a agent registering on behalf of another person, a family or organisation I do not work for
    I want to provide representee full name
    So that I can register on their behalf as an interested party

    Background: Start registration as an agent and progress to are they 18 or over? page
        Given I am registering as an "On behalf of another person, a family group or an organisation I do not work for"
        And I have been asked whether the person I am representing 18 or over

    Scenario: Verify page title, Heading, error message and select yes and continue
        Then I am on the "Are they 18 or over?" page
        And I click on the continue button
        Then the following error messages should be presented
            | ErrorMsg                          |
            | Select yes if they are 18 or over |
        When user selects "Yes" radio option on are they 18 or over page
        And I click on the continue button
        Then I am on the "What is their address?" page

    Scenario: select No and continue
        When user selects "No" radio option on are they 18 or over page
        And I click on the continue button
        Then I am on the "What is their address?" page

    Scenario: User click on back link
        When I click on back link
        Then I am on the "What is the full name of the person you are representing?" page