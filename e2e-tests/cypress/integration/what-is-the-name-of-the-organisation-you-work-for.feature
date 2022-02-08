Feature: What is the name of organisation you work for page
    As a Test user
    I want to navigate to What is the name of organisation you work for page
    So that I can verify the functionality

    Scenario: Navigate to What is the name of organisation you work for page and verify error message and continue
        Given I navigate to What is the name of organisation you work for page
        And User clicks on continue button
        Then below error message should be presented on What is the name of organisation you work for page
            | ErrorMsg                                        |
            | Enter the name of the organisation you work for |
        And I enter "Organisation name" into name of org you work for field
        And User clicks on continue button
        Then I am on the "What is your email address? organisation" page

    Scenario: Click on I dont work for organisation link
        Given I navigate to What is the name of organisation you work for page
        And user clicks on I dont work for organisation link
        Then I am on the "What is your email address? organisation" page
