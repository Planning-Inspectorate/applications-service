@testSuite @registration @agent
Feature: What is the full name of the person you are representing? page
    As a agent registering on behalf of another person, a family or organisation I do not work for
    I want to provide representee full name
    So that I can register on their behalf as an interested party

    Background: Start registration as an agent and progress to What is the full name of the person you are representing? page
        Given I am registering as an "On behalf of another person, a family group or an organisation I do not work for"
        And I have been asked to provide details of the name of the person you are representing

    Scenario: User click on back link
        When I click on back link
        Then I am on the "Who are you representing?" page

    Scenario Outline: User continues with invalid data
        When I continue with the value "<text>" in the representee name field
        Then the following error message should be presented: "<error message>"

        Examples:
            | text                                                                                             | error message                                                                    |
            |                                                                                                  | Enter the full name of the person you are representing                           |
            | a                                                                                                | Full name of the person you are representing must be between 3 and 64 characters |
            | ab                                                                                               | Full name of the person you are representing must be between 3 and 64 characters |
            | some long name from outta space and probably the universe, maybe?                                | Full name of the person you are representing must be between 3 and 64 characters |
            | some very long name from outta space very out of touch with reality and most likely middle-class | Full name of the person you are representing must be between 3 and 64 characters |

    Scenario Outline: User continues with valid data
        When I continue with the value "<text>" in the representee name field
        Then I am on the "Are they 18 or over?" page

        Examples:
            | text                                                             |
            | Representee FirstName Representee LastName                       |
            | abc                                                              |
            | some long name which is one character short of the max length!!  |
            | some long name which is only just within the max length allowed! |
