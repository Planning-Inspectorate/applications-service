@testSuite
Feature: Acceptance page
    As a Test user
    I want to navigate to Acceptance page
    So that I can verify the functionality of the page

    Background: Navigate to Acceptance page
        Given I navigate to Decision making process guide page
        Then I am on the "The decision-making process for national infrastructure projects" page
        And I click on show all link
        And I click on "how the acceptance stage works and what happens next" link

    Scenario: verify page title, heading and contents
        Then I am on the "Acceptance" page
        And I verify below links present on Acceptance page
            | Links                                     |
            | The acceptance stage                      |
            | What we consider at the acceptance stage  |