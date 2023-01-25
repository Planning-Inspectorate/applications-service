@testSuite @registration @myself @organisation @failing
Feature: who are you registering for? page
    As a Test user
    I want to navigate to who are you registering for? page
    So that I can verify the functionality

    Background: Navigate to the service
        Given I navigate to the who are you registering for page


    Scenario: Navigate to who are you registering for? page and verify the content in the page and validate error message
        And I am on the "who are you registering for?" page
        And I can see the radio options content
        And User clicks on continue button
        Then below error message should be presented on who are you registering for page
            | ErrorMsg                           |
            | Select who you are registering for |

    Scenario: User click on feedback link
        When I click on feedback link
        Then I am on the "feedback" page

    Scenario: User click on back link
        When I click on back link
        Then I am on the "Register to have your say" page

    Scenario: User selects Myself and click continue
        When User selects "Myself"
        And User clicks on continue button
        Then I am on the "what is your full name?" page

    Scenario: User selects An organisation I work or volunteer for and click continue
        When User selects "Organisation"
        And User clicks on continue button
        Then I am on the "what is your full name? organisation" page

    Scenario: click on Crown copyright logo
        And I click on "crown copyright" logo
        Then I am on the "crown copyright" page