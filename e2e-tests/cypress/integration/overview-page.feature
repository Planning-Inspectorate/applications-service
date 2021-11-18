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

    Scenario: click on All Examination documents link
        When I click on "All Examination documents" link
        Then I am on the "A404 Dewsbury" page