@testSuite
Feature: What is your full name page
    As a Test user
    I want to navigate to what is your full name page
    So that I can verify the functionality

    Scenario: Navigate to full name page and verify the content in the page and validate error message
        Given I navigate to what is your full name page selecting "An person interested in having my say"
        And I can see the logo gov uk text
        And I verify the page title and heading of full name page
        And I can see the text This service is only for Application service
        And User clicks on continue button
        Then below error message should be presented on full name page
            | ErrorMsg                    |
            | Please enter your full name |