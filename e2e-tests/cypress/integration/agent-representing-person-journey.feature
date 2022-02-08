@testSuite
Feature: Agent representing a person journey
    As a Test user
    I want to complete Agent representing a person journey
    So that I can verify the functionality

    Background: Navigate to check your answers page as a representative of a person
        Given I navigate to UK address details page as a representative of a person
        And I enter below data into address details page
            | AddressLine1                  | AddressLine2 | AddressLine3 | PostCode | Country        |
            | Representative Address Line 1 |              |              | NE27 0BB | United Kingdom |
        And User clicks on continue button
        And user selects "A person" on who are you representing page
        And User clicks on continue button
        And I enter text "Test MiddleName LastName" into full name field
        And User clicks on continue button
        And user selects "Yes" radio option on are you 18 or over page
        And User clicks on continue button
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

    Scenario: verify page title, heading, data and complete Agent representing a person journey
        Then I am on the "Check your answers before registering organisation" page
        And I verify below data is present on Check your answers before registering page
            | Column1                                                   | Column2                                                                                                           | Column3                 |
            | Who are you representing for?                             | An organisation or charity                                                                                        | Change representing-for |
            | Full name                                                 | RepresentativeTest MiddleName LastName                                                                            | Change ??               |
            | Organisation name                                         | Organisation Name                                                                                                 | Change ??               |
            | Address                                                   | \n          Representative Address Line 1\n          \n          \n          NE27 0BB\n          United Kingdom\n | Change ??               |
            | Email address                                             | Representative_test@gmail.com                                                                                     | Change ??               |
            | Telephone number                                          | 1234567888                                                                                                        | Change ??               |
            | What is the full name of the person you are representing? | Test MiddleName LastName                                                                                          | Change ??               |
            | Are they 18 or over?                                      | Yes                                                                                                               | Change ??               |
            | Their address                                             | Address Line 1\n        \n        \n        NE27 0QQ\n        United Kingdom                                      | Change ??               |
            | Their email address                                       | test@gmail.com                                                                                                    | Change ??               |
            | Their telephone number                                    | 1234567899                                                                                                        | Change ??               |
            | Registration comments                                     | used by the examining panel to decide if they recommend the project goes ahead, published on our website          | Change ??               |
        And User clicks on accept and continue button for "on behalf"
        Then I am on the "Declaration organisation" page
        And User clicks on accept and register button
        Then I am on the "Registration complete organisation" page

