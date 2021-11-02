@testSuite
Feature: Overview page
    As a Test user
    I want to navigate to Overview page
    So that I can verify the functionality

    Scenario: Navigate to overview page
        Given I navigate to project Overview page
        And I verify the page title and heading of overview page
        When I click on register to have your say about national infrastructure project link
        Then user is navigated to project start page