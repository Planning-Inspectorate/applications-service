@testSuite @registration @agent
Feature: Complete registration as Agent representing a person journey
    As a agent registering on behalf of another person, a family or organisation I do not work for
    I want to verify my answers before completing registration 
    So that I can register on their behalf as an interested party

    Background: Start registration as an agent and progress to check your answers page as a representative of a person
        Given I am registering as an "On behalf of another person, a family group or an organisation I do not work for"
        And I have been asked to check my answers

    Scenario: verify page title, heading, data and complete Agent representing a person journey
        Then I am on the "check your answers before registering on behalf of someone else" page
        And I verify below data is present on Check your answers before registering page
            | Column1                                                   | Column2                                                                                  | Column3                |
            | Who are you registering for?                              | An organisation or charity                                                               | Change registering-for |
            | Full name                                                 | TestFirstName TestMiddleName TestLastName                                                | Change ??              |
            | Organisation name                                         | Test Organisation Name                                                                   | Change ??              |
            | Address                                                   | \nAddress Line 1\n        \n        \n        NE27 0BB\n        United Kingdom\n         | Change ??              |
            | Email address                                             | testpins2@gmail.com                                                                      | Change ??              |
            | Telephone number                                          | 123456789                                                                                | Change ??              |
            | What is the full name of the person you are representing? | Representee FirstName Representee LastName                                               | Change ??              |
            | Are they 18 or over?                                      | Yes                                                                                      | Change ??              |
            | Their address                                             | Representee Address Line 1\n        \n        \n        NE27 0BB\n        United Kingdom | Change ??              |
            | Their email address                                       | representeetestpins2@gmail.com                                                           | Change ??              |
            | Their telephone number                                    | 12121212121                                                                              | Change ??              |
            | Registration comments                                     | I am against the proposal since it will reduce resident parking provision                | Change ??              |
        And User clicks on accept and continue button for "on behalf"
        Then I am on the "declaration registering on behalf of someone else" page
        And User clicks on accept and register button
        Then I am on the "registration complete registering on behalf of someone else" page