@testSuite
Feature: Registration complete page
    As a Test user
    I want to navigate to Regsitration complete page
    So that I can verify the functionality

    Background: Complete registration journey
        Given I navigate to UK address details page
        And I enter below data into address details page
            | AddressLine1   | AddressLine2 | AddressLine3 | PostCode | Country        |
            | Address Line 1 |              |              | NE27 0QQ | United Kingdom |
        And User clicks on continue button
        And I enter "test@gmail.com" into email address field
        And User clicks on continue button
        And I enter "1234567899" into telephone number field
        And User clicks on continue button
        And I enter "Project topic" into topic field
        And I enter "used by the examining panel to decide if they recommend the project goes ahead, published on our website" into comments field
        And User clicks on continue button
        And user selects "No" radio option on Do you want to add another comment page
        And User clicks on continue button
        And User clicks on accept and continue button
        And User clicks on accept and register button

    Scenario: verify page title, heading
        Then I am on the "Registration complete" page
        And I click on find out more about having your say during the Examination of the application link
        Then I am on the "Having your say about a national infrastructure project" page