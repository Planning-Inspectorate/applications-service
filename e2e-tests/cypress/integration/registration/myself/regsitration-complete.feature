@testSuite @registration @myself @completion
Feature: Registration complete page
    As a Test user
    I want to navigate to Registration complete page
    So that I can verify the functionality

    Background: Complete registration journey
        Given I navigate to UK address details page
        And I enter below data into address details page
            | AddressLine1   | AddressLine2 | AddressLine3 | PostCode | Country        |
            | Address Line 1 |              |              | NE27 0QQ | United Kingdom |
        And User clicks on continue button
        And I enter "1234567899" into telephone number field
        And User clicks on continue button
        And I enter "used by the examining panel to decide if they recommend the project goes ahead, published on our website" into comments field
        And User clicks on continue button
        And User clicks on accept and continue button for "myself"
        And User clicks on accept and register button

    Scenario: verify page title, heading
        Then I am on the "Registration complete" page
        And the page includes a link to the project
