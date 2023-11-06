@testSuite
Feature: Having your say about a national infrastructure project page
    As a Test user
    I want to navigate to Having your say about a national infrastructure project page
    So that I can verify the functionality

    Background: Navigate to page
        Given I navigate to Having your say about a national infrastructure project page
        And I click on show all link

    Scenario: verify page title
        Then I am on the "Having your say about a national infrastructure project" page

    Scenario: Navigate to Taking part in the Pre-application stage
        And I click on "Taking part in the Pre-application stage" link
        Then I am on the "taking part at the pre-application stage" page

    Scenario: Navigate to Registering to have your say about a national infrastructure project
        And I click on "Registering to have your say about a national infrastructure project" link
        Then I am on the "Registering to have your say about a national infrastructure project" page

    Scenario: Navigate to Get involved in the preliminary meeting
        And I click on "Get involved in the preliminary meeting" link
        Then I am on the "Get involved in the preliminary meeting" page

    Scenario: Navigate to Have your say during the examination of the project
        And I click on "Have your say during the examination of the project" link
        Then I am on the "Have your say during the examination of the project" page

    Scenario: Navigate to What happens after a decision has been made
        And I click on "What happens after a decision has been made" link
        Then I am on the "what you can do after the decision has been made" page