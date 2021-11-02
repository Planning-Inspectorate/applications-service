@testSuite
Feature: What type of interested party are you page
    As a Test user
    I want to navigate to What type of interested party are you page
    So that I can verify the functionality

    Background: Navigate to the service
        Given I navigate to the Type of party page


    Scenario: Navigate to What type of interested party are you page and verify the content in the page and validate error message
        And I can see the logo gov uk text
        And I verify the page title and heading of interested party page
        And I can see the text This service is only for Application service
        And I can see the radio options content
        And User clicks on continue button
        Then below error message should be presented on interested party page
            | ErrorMsg                                     |
            | Select what type of interested party are you |

    Scenario: User click on Planning inspectorate logo
        When I click on "planning inspectorate" logo
        Then I navigate to "planning inspectorate" home page

    Scenario: User click on crown copyright logo
        When I click on "crown copyright" logo
        Then I navigate to "crown copyright" home page

    Scenario: User click on feedback link
        When I click on feedback link
        Then I navigate to "feedback" home page

    Scenario: User click on back link
        When I click on back link
        Then I navigate to start page

    Scenario: User selects An person interested in having my say and click continue
        When User selects "An person interested in having my say"
        And User clicks on continue button
        Then User is navigated to full-name page