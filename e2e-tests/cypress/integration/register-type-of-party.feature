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

    Scenario: User selects An person interested in having my say and click continue
        When User selects "An person interested in having my say"
        And User clicks on continue button
        Then User is navigated to full-name page
