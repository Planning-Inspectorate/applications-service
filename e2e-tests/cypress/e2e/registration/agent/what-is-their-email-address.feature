@testSuite @registration @agent
Feature: What is their email address? page
    As a agent registering on behalf of another person, a family or organisation I do not work for
    I want to provide representee email address
    So that I can register on their behalf as an interested party

    Background: Start registration as agent and progress to What is their email address? page
        Given I am registering as an "Agent"
        And I have been asked to provide representee email address

    Scenario: User click on back link
        Then I am on the "what is their email address?" page
        When I click on back link
        Then I am on the "are they 18 or over?" page

    Scenario Outline: User continues with invalid data
        When I continue with the value "<text>" in the representee email address field
        Then the following error message should be presented: "<error message>"

        Examples:
            | text                                                                                                                                                                                                                                                             | error message                                                       |
            |                                                                                                                                                                                                                                                                  | Enter their email address                                            |
            | a                                                                                                                                                                                                                                                                | Email address must be between 3 and 255 characters                  |
            | aa                                                                                                                                                                                                                                                               | Email address must be between 3 and 255 characters                  |
            | testpins2.com                                                                                                                                                                                                                                                    | Enter an email address in the correct format, like name@example.com |
            | some long name which is one character short of the max length!! some long name which is one character short of the max length!! some long name which is one character short of the max length!! some long name which is one character short of the max length!!a | Email address must be between 3 and 255 characters                  |

    Scenario Outline: User continues with valid data
        When I continue with the value "<text>" in the representee email address field
        Then I am on the "what is their address?" page

        Examples:
            | text                   |
            | reptestpins2@gmail.com |