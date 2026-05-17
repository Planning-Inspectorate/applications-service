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

    Scenario: click on How the acceptance stage works and what happens next link
        And I click on show all link
        And I click on "How the acceptance stage works and what happens next" link
        Then I am on the "Acceptance" page

    Scenario: click on What happens during the pre-examination stage link
        And I click on show all link
        And I click on "What happens during the pre-examination stage" link
        Then I am on the "Pre-examination" page

    Scenario: click on What happens at the examination stage link
        And I click on show all link
        And I click on "What happens at the examination stage" link
        Then I am on the "Examination" page

    Scenario: click on Making a recommendation link
        And I click on show all link
        And I click on "Making a recommendation" link
        Then I am on the "Recommendation" page

    Scenario: click on Who makes the final decision link
        And I click on show all link
        And I click on "Who makes the final decision" link
        Then I am on the "Decision" page

    Scenario: click on What you can do after the decision has been made link
        And I click on show all link
        And I click on "What you can do after the decision has been made" link
        Then I am on the "What happens after the decision is made" page