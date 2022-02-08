@testSuite
Feature: What do you want to tell us about this proposed project? page
    As a Test user
    I want to navigate to What do you want to tell us about this proposed project? page
    So that I can verify the functionality

    Background: Navigate to What do you want to tell us about this proposed project? page
        Given I navigate to UK address details page
        And I enter below data into address details page
            | AddressLine1   | AddressLine2 | AddressLine3 | PostCode | Country        |
            | Address Line 1 |              |              | NE27 0QQ | United Kingdom |
        And User clicks on continue button
        And I enter "1234567899" into telephone number field
        And User clicks on continue button

    Scenario: verify page title, heading, error message and continue
        Then I am on the "What do you want to tell us about this proposed project?" page
        And Do not include any personal details is present on the page
        And User clicks on continue button
        Then below error message should be presented on What do you want to tell us about this proposed project page
            | ErrorMsg                                                   |
            | Enter what you want to tell us about this proposed project |
        And I enter "used by the examining panel to decide if they recommend the project goes ahead, published on our website" into comments field
        And User clicks on continue button
        Then I am on the "Check your answers before registering" page

    Scenario: click save and exit
        And user clicks on save and exit button
        Then below error message should be presented on What do you want to tell us about this proposed project page
            | ErrorMsg                                                   |
            | Enter what you want to tell us about this proposed project |
        And I enter "used by the examining panel to decide if they recommend the project goes ahead, published on our website" into comments field
        And user clicks on save and exit button
        Then I am on the "your comments are saved" page
        Then I can see email sent confimation text
