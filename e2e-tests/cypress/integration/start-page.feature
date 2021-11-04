@testSuite
Feature: Start page - Register to have your say
    As a Test user
    I want to navigate to Register to have your say page
    So that I can verify the functionality

    Scenario: Navigate to the start page
        Given I navigate to Register to have your say page
        And I verify the page title and heading of start page
        When I click on start now button "/register/type-of-party"
        Then user is navigated to type of interested party page