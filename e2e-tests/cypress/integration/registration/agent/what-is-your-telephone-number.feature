@testSuite @registration @agent
Feature: What is your telephone number? page
    As a agent registering on behalf of another person, a family or organisation I do not work for
    I want to provide my telephone number
    So that I can register on their behalf as an interested party

    Background: Start registration as agent and progress to telephone number page
        Given I am registering as an "On behalf of another person, a family group or an organisation I do not work for"
        And I have been asked what is your telephone number

    Scenario: User click on back link
        Then I am on the "what is your telephone number? agent" page
        When I click on back link
        Then I am on the "what is your email address? agent" page

    Scenario Outline: User continues with invalid data
        When I continue with the value "<text>" in the telephone number field
        Then the following error message should be presented: "<error message>"

        Examples:
            | text                                                                                                                                                                                                                                                             | error message                                                                  |
            |                                                                                                                                                                                                                                                                  | Enter your telephone number                                                    |
            | abcd                                                                                                                                                                                                                                                             | Enter a telephone number, like 01632 960 001, 07700 900 982 or 44 808 157 0192 |
            | 1234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234 | Telephone number must be 255 characters or less                                |

    Scenario Outline: User continues with valid data
        When I continue with the value "<text>" in the telephone number field
        Then I am on the "what is your address? agent" page

        Examples:
            | text                                                                                                                                                                                                                                                            |
            | 123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123 |
            | 1                                                                                                                                                                                                                                                               |