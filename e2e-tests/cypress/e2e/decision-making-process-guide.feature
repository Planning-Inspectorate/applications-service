@testSuite
Feature: Decision making process guide page
    As a Test user
    I want to navigate to Decision making process guide page
    So that I can verify the functionality of the page

    Background: Navigate to Decision making process guide page
        Given I navigate to Decision making process guide page

    Scenario: verify page title, heading and click on Find out what you can do at this stage and check our detailed guides link
        Then I am on the "The decision-making process for national infrastructure projects" page
        And I click on show all link
        And I click on "Find out what you can do at this stage and check our detailed guides" link
        Then I am on the "Pre-application" page

    Scenario: click on How the review works and what happens next link
        And I click on show all link
        And I click on "How the review works and what happens next" link
        Then I am on the "review of the application" page

    Scenario: click on What happens during the preparation for the Examination link
        And I click on show all link
        And I click on "What happens during the preparation for the Examination" link
        Then I am on the "pre-examination" page

    Scenario: click on What happens at the Examination of the application link
        And I click on show all link
        And I click on "What happens at the Examination of the application" link
        Then I am on the "examination of the application" page

    Scenario: click on Making a recommendation and who makes the final decision link
        And I click on show all link
        And I click on "Making a recommendation and who makes the final decision" link
        Then I am on the "recommendation and decision" page