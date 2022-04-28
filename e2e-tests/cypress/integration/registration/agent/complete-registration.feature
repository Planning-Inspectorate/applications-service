@testSuite @registration @agent @completion
Feature: Complete registration as Agent representing a person journey
    As a agent registering on behalf of another person, a family or organisation I do not work for
    I want to verify my answers before completing registration
    So that I can register on their behalf as an interested party

    Background: Start registration as an agent and progress to check your answers page as a representative of a person
        Given I am registering as an "Agent"
        And I have been asked to check my answers

    Scenario: verify page title, heading, data and complete Agent representing a person journey
        Then I am on the "check your answers before registering on behalf of someone else" page
        And I verify below data is present on Check your answers before registering page
            | Column1                                     | Column2                                                                                  | Column3                                            |
            | Who are you registering for?                | On behalf of another person, a family group or an organisation I do not work for         | Change who are you registering for                 |
            | Full name                                   | TestFirstName TestMiddleName TestLastName                                                | Change your full name                              |
            | Organisation name                           | Test Organisation Name                                                                   | Change your organisation name                      |
            | Address                                     | \nAddress Line 1\n        \n        \n        NE27 0BB\n        United Kingdom\n         | Change your address                                |
            | Email address                               | testpins2@gmail.com                                                                      | Change your email address                          |
            | Telephone number                            | 123456789                                                                                | Change your telephone number                       |
            | Who are you representing                    | A person                                                                                 | Change who are you representing for                |
            | The name of the person you are representing | Representee FirstName Representee LastName                                               | Change the name of the person you are representing |
            | Are they 18 or over?                        | Yes                                                                                      | Change if they are over 18                         |
            | Their address                               | Representee Address Line 1\n        \n        \n        NE27 0BB\n        United Kingdom | Change their address                               |
            | Their email address                         | representeetestpins2@gmail.com                                                           | Change their email address                         |
            | Their telephone number                      | 12121212121                                                                              | Change their telephone number                      |
            | Registration comments                       | I am against the proposal since it will reduce resident parking provision                | Change registration comments                       |
        And User clicks on accept and continue button for "on behalf"
        Then I am on the "declaration registering on behalf of someone else" page
        And User clicks on accept and register button
        Then I am on the "registration complete registering on behalf of someone else" page
        And the page includes a link to the project

    Scenario: click change link, select organisation or charity and continue
        And I click on "Who are you representing" change link
        Then I am on the "Who are you representing?" page
        And user selects "An organisation or charity" on who are you representing page
        And I click on the continue button
        Then I am on the "What is the full name of the organisation or charity that you are representing?" page

    Scenario: click change link, select A family group and continue
        And I click on "Who are you representing" change link
        Then I am on the "Who are you representing?" page
        And user selects "A family group" on who are you representing page
        And I click on the continue button
        Then I am on the "What is the name of the family group you are representing?" page