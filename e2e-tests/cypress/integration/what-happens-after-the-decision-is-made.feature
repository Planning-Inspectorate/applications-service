@testSuite
Feature: What happens after the decision is made page
    As a Test user
    I want to navigate to What happens after the decision is made page
    So that I can verify the functionality of the page

    Background: Navigate to What happens after the decision is made page
        Given I navigate to Decision making process guide page
        Then I am on the "The decision-making process for national infrastructure projects" page
        And I click on show all link
        And I click on "What happens after the decision is made" link

    Scenario: verify page title, heading and contents
        Then I am on the "what happens after the decision is made" page
        And I verify below links present on What happens after the decision is made page
            | Links                      |
            | After the decision is made |
            | About the judicial review  |
        And I click on "Find out what you can do at this stage and check our detailed guides" link
        Then I am on the "Pre-application" page

    Scenario: click on How the review works and what happens next link
        And I click on "How the review works and what happens next" link
        Then I am on the "review of the application" page

    Scenario: click on What happens during the preparation for the Examination link
        And I click on "What happens during the preparation for the Examination" link
        Then I am on the "pre-examination" page

    Scenario: click on What happens at the Examination of the application link
        And I click on "What happens at the Examination of the application" link
        Then I am on the "examination of the application" page

    Scenario: click on Making a recommendation and who makes the final decision link
        And I click on "Making a recommendation and who makes the final decision" link
        Then I am on the "recommendation and decision" page

    Scenario: click on What you can do after the decision has been made link
        And I click on "What happens after the decision is made" link
        Then I am on the "what happens after the decision is made" page