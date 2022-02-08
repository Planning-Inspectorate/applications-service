@testSuite
Feature: Having your say at the pre-application stage page
    As a Test user
    I want to navigate to Having your say at the pre-application stage page
    So that I can verify the functionality

    Background: Navigate to page
        Given I navigate to Having your say at the pre-application stage page

    Scenario: verify page title and click Nationally Significant Infrastructure planning process step by step link
        Then I am on the "taking part at the pre-application stage" page
        And I verify below links present on Having your say at the pre-application stage
            | Links                                                         |
            | What happens at the Pre-application stage                     |
            | What the developer must do                                    |
            | How you can get involved at this point                        |
            | What you can do if the application has already been submitted |
        When I click on "The Nationally Significant Infrastructure planning process step by step" link
        Then I am on the "Having your say about a national infrastructure project" page

    Scenario: click Having your say at the pre-application stage link
        When I click on "having your say at pre-application stage" link
        Then I am on the "Having your say at the pre-application stage" page

    Scenario: click Registering to have your say about a national infrastructure project link
        When I click on registering to have your say about a national infrastructure project link
        Then I am on the "Registering to have your say about a national infrastructure project" page

    Scenario: click Get involved in the preliminary meeting link
        When I click on get involved in the preliminary meeting link
        Then I am on the "Get involved in the preliminary meeting" page

    Scenario: click Have your say during the examination of the project link
        When I click on "have your say during the examination of the project" link
        Then I am on the "Have your say during the examination of the project" page

    Scenario: click What you can do after the decision has been made link
        When I click on "what you can do after the decision has been made" link
        Then I am on the "What you can do after the decision has been made" page

    Scenario: click Next link
        When I click on Next link
        Then I am on the "Registering to have your say about a national infrastructure project" page

    Scenario: click Having your say during the examination of the project link
        When I click on Having your say during the examination of the project link
        Then I am on the "Registering to have your say about a national infrastructure project" page