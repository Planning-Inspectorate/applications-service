@testSuite
Feature: What you can do after the decision has been made page
    As a Test user
    I want to navigate to What you can do after the decision has been made page
    So that I can verify the functionality

    Background: Navigate to page
        Given I navigate to what you can do after the decision has been made page

    Scenario: verify page title and click Nationally Significant Infrastructure planning process step by step link
        Then I am on the "What you can do after the decision has been made" page
        And I verify below links present on What you can do after the decision has been made
            | Links                                                                                  |
            | After the decision is made                                                             |
        When I click on "The Nationally Significant Infrastructure planning process step by step" link
        Then I am on the "Having your say about a national infrastructure project" page

    Scenario: click taking part in the pre-application stage link
        When I click on "taking part in the pre-application stage" link
        Then I am on the "taking part at the pre-application stage" page

    Scenario: click get involved in the preliminary meeting link
        When I click on "get involved in the preliminary meeting" link
        Then I am on the "Get involved in the preliminary meeting" page

    Scenario: click Have your say during the examination of the project link
        When I click on "Have your say during the examination of the project" link
        Then I am on the "Have your say during the examination of the project" page

    Scenario: click What happens after a decision has been made link
        When I click on "What happens after a decision has been made" link
        Then I am on the "What you can do after the decision has been made" page