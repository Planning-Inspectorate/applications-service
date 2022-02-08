@testSuite
Feature: Organisation Registration complete page
    As a Test user
    I want to navigate to Organisation Regsitration complete page
    So that I can verify the functionality

    Background: Complete Organisation registration journey
        Given I navigate to UK address details page using organisation route
        And I enter below data into address details page
            | AddressLine1   | AddressLine2 | AddressLine3 | PostCode | Country        |
            | Address Line 1 |              |              | NE27 0QQ | United Kingdom |
        And User clicks on continue button
        And I enter "test@gmail.com" into email address field
        And User clicks on continue button
        And I enter "1234567899" into telephone number field
        And User clicks on continue button
        And I enter "used by the examining panel to decide if they recommend the project goes ahead, published on our website" into comments field
        And User clicks on continue button
        And User clicks on accept and continue button for "organisation"
        And User clicks on accept and register button

    Scenario: verify page title, heading
        Then I am on the "Registration complete organisation" page