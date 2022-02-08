@testSuite
Feature: Check your answers before registering page
    As a Test user
    I want to navigate to Check your answers before registering page
    So that I can verify the functionality

    Background: Navigate to Check your answers before registering page
        Given I navigate to UK address details page
        And I enter below data into address details page
            | AddressLine1   | AddressLine2 | AddressLine3 | PostCode | Country        |
            | Address Line 1 |              |              | NE27 0QQ | United Kingdom |
        And User clicks on continue button
        And I enter "1234567899" into telephone number field
        And User clicks on continue button
        And I enter "used by the examining panel to decide if they recommend the project goes ahead, published on our website" into comments field
        And User clicks on continue button

    Scenario: verify page title, heading, data and continue
        Then I am on the "Check your answers before registering" page
        And I verify below data is present on Check your answers before registering page
            | Column1                      | Column2                                                                                                  | Column3   |
            | Who are you registering for? | Myself                                                                                                   | Change    |
            | Full name                    | TestFirstName TestMiddleName TestLastName                                                                | Change    |
            | Are you 18 or over?          | Yes                                                                                                      | Change    |
            | Email address                | test@gmail.com                                                                                           | Change    |
            | Telephone number             | 1234567899                                                                                               | Change    |
            | Address                      | Address Line 1\n        \n        \n        NE27 0QQ\n        United Kingdom                             | Change    |
            | Registration comments        | used by the examining panel to decide if they recommend the project goes ahead, published on our website | Change ?? |
        And User clicks on accept and continue button for "myself"
        Then I am on the "Declaration" page

    Scenario: Click on Who are you registering for? change link
        And I click on "Who are you registering for?" change link
        Then I am on the "Who are you registering for?" page

    Scenario: Click on Full name change link
        And I click on "Full name" change link
        Then I am on the "what is your full name?" page

    Scenario: Click on Are you 18 or over change link
        And I click on "Are you 18 or over?" change link
        Then I am on the "are you 18 or over?" page

    Scenario: Click on Email address change link
        And I click on "Email address" change link
        Then I am on the "what is your email address?" page

    Scenario: Click on Telephone number change link
        And I click on "Telephone number" change link
        Then I am on the "what is your telephone number?" page

    Scenario: Click on Address change link
        And I click on "Address" change link
        Then I am on the "what is your address?" page

    Scenario: Click on Comments change link
        And I click on "Your comments change" change link
        Then I am on the "what do you want to tell us about this proposed project?" page