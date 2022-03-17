@testSuite @registration @agent
Feature: What is the name of the organisation you work for? page
    As a agent registering on behalf of another person, a family or organisation I do not work for
    I want to provide the name of the organisation I work for
    So that I can register on their behalf as an interested party

    Background: Start registration as agent and progress to What is the name of the organisation you work for? page
        Given I am registering as an "On behalf of another person, a family group or an organisation I do not work for"
        And I have been asked what is the name of the organisation you work for

    Scenario: User click on back link
        Then I am on the "what is the name of the organisation you work for?" page
        When I click on back link
        Then I am on the "What is your full name? agent" page

    Scenario Outline: User continues with invalid data
        When I continue with the value "<text>" in the organisation name field
        Then the following error message should be presented: "<error message>"

        Examples:
            | text                                                                                                                                                                                                                                                             | error message                                                            |
            |                                                                                                                                                                                                                                                                  | Enter the name of the organisation you work for                          |
            | some long name which is one character short of the max length!! some long name which is one character short of the max length!! some long name which is one character short of the max length!! some long name which is one character short of the max length!!a | The name of the organisation you work for must be 255 characters or less |

    Scenario Outline: User continues with valid data
        When I continue with the value "<text>" in the organisation name field
        Then I am on the "what is your email address? agent" page

        Examples:
            | text                                                                                                                                                                                                                                                            |
            | Organisation Name                                                                                                                                                                                                                                               |
            | abc                                                                                                                                                                                                                                                             |
            | some long name which is one character short of the max length!! some long name which is one character short of the max length!! some long name which is one character short of the max length!! some long name which is one character short of the max length!  |
            | some long name which is one character short of the max length!! some long name which is one character short of the max length!! some long name which is one character short of the max length!! some long name which is one character short of the max length!! |