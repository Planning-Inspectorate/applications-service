@testSuite @existingFailing
Feature: Registering to have your say about a national infrastructure project page
    As a Test user
    I want to navigate to Registering to have your say about a national infrastructure project page
    So that I can verify the functionality

    Background: Navigate to initial page within "Have your say" guide
        Given I have navigated to the "Have your say" guide
        And I select the "How to register link"

    Scenario: verify page title and click Nationally Significant Infrastructure planning process step by step link
        Given I have navigated to the "Have your say" guide
        When I select the "How to register link"
        Then I am on the "registering to have your say about a national infrastructure project" page
        And the page does not include a link to a project
        And I verify below links present on Registering to have your say about a national infrastructure project
            | Links                     |
            | Who can register          |
            | When to register          |
            | What you need to register |
            | After you have registered |
            | Register to have your say |
            | More detailed advice      |
        When I click on "The Nationally Significant Infrastructure planning process step by step" link
        Then I am on the "Having your say about a national infrastructure project" page

    Scenario: View a project before selecting "Have your say during the examination of the project" link
        Given I have viewed the overview page for a project
        And I have selected the "Have your say" link from the related guides section
        When I select the "How to register link"
        Then I am on the "registering to have your say about a national infrastructure project" page
        And the page includes a link to the project

    Scenario: click taking part in the pre-application stage link
        When I click on "taking part in the pre-application stage" link
        Then I am on the "taking part at the pre-application stage" page

    Scenario: click Have your say during the examination of the project link
        When I click on "have your say during the examination of the project" link
        Then I am on the "Have your say during the examination of the project" page

    Scenario: click Have your say during the examination of the project link
        When I click on "have your say during the examination of the project" link
        Then I am on the "Have your say during the examination of the project" page

    Scenario: click What you can do after the decision has been made link
        When I click on "what you can do after the decision has been made" link
        Then I am on the "What you can do after the decision has been made" page

    Scenario: click Next link
        When I click on Next link
        Then I am on the "Get involved in the preliminary meeting" page

    Scenario: click Get involved in the preliminary meeting link
        When I click on Get involved in the preliminary meeting link
        Then I am on the "Get involved in the preliminary meeting" page

    Scenario: click on feedback link
        When I click on feedback link
        Then I am on the "feedback" page