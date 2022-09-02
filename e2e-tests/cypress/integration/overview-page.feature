@testSuite
Feature: Overview page
    As a Test user
    I want to navigate to Overview page
    So that I can verify the functionality

    Background: Navigate to overview page
        Given I navigate to "North Lincolnshire Green Energy Park" project Overview page

    Scenario: verify page title, heading and click on register to have your say about national infrastructure project
        And I am on the "North Lincolnshire Green Energy Park project information" page
        When I click on register to have your say about national infrastructure project link
        Then I am on the "register to have your say" page

    Scenario: click on Project timeline link
        When I click on "Project timeline" link

    Scenario: click on Relevant Representations (Registration comments) link
        When I click on "Relevant Representations (Registration comments)" link
        Then I click on required "Return to the project overview" link
        Then I am on the "North Lincolnshire Green Energy Park project information" page

    Scenario: click on Examination timetable link
        When I click on "Examination timetable" link

    Scenario: click on All Examination documents link
        When I click on "All Examination documents" link
        Then I click on required "Return to the project overview" link
        Then I am on the "North Lincolnshire Green Energy Park project information" page

    Scenario: click on Recommendation and decision link
        When I click on "Recommendation and decision" link
        Then I click on required "Return to the project overview" link
        Then I am on the "North Lincolnshire Green Energy Park project information" page

    Scenario: click on Find out more about the decision making process for national infrastructure projects link
        When I click on "Find out more about the decision making process for national infrastructure projects" link

    Scenario: click on Having your say about a national infrastructure project link
        When I click on "Having your say about a national infrastructure project" link
        Then I am on the "Having your say about a national infrastructure project" page

    Scenario: click on Find out more about registering to have your say
        And I click on Find out more about registering to have your say
        Then I am on the "Having your say about a national infrastructure project" page
