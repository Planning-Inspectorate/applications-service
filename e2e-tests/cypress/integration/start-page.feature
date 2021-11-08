@testSuite
Feature: Start page - Register to have your say
    As a Test user
    I want to navigate to Register to have your say page
    So that I can verify the functionality

    Scenario: Navigate to the start page
        Given I navigate to Register to have your say page
        Then I am on the "register to have your say" page
        When I click on start now button
        Then I am on the "What type of interested party are you?" page