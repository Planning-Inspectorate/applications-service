@testSuite @registration @agent
Feature: Who are you representing? page
    As a agent registering on behalf of another person, a family or organisation I do not work for
    I want to provide the details of who am I representing
    So that I can register on their behalf as an interested party

    Background: Start registration as an agent and progress to Who are you representing? page
        Given I am registering as an "Agent"
        And I have been asked to provide details of who am I representing

    Scenario: verify page title, heading, error message, select a person and continue
        Then I am on the "Who are you representing?" page
        And I click on the continue button
        Then the following error messages should be presented
            | ErrorMsg                        |
            | Select who you are representing |
        And user selects "A person" on who are you representing page
        And I click on the continue button
        Then I am on the "What is the full name of the person you are representing?" page

    Scenario: select An organisation or charity and continue
        And user selects "An organisation or charity" on who are you representing page
        And I click on the continue button
        Then I am on the "What is the full name of the organisation or charity that you are representing?" page

    Scenario: select A household and continue
        And user selects "A household" on who are you representing page
        And I click on the continue button
        Then I am on the "what is the name of the household you are representing?" page

    Scenario: User click on back link
        When I click on back link
        Then I am on the "what is your address? agent" page