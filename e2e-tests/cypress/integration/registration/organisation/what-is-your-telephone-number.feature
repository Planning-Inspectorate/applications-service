@testSuite @registration @organisation
Feature: What is your telephone number page
  As a representative from an organisation
  I want to provide my telephone number
  So that my organisation can be registered as an interested party

  Background: Start registration as an organisation and progress to telephone number page
    Given I am registering as an organisation
    And I have been asked to provide my telephone number

  Scenario Outline: User continues with invalid data
    When I continue with the value "<text>" in the telephone number field
    Then the following error message should be presented: "<error message>"

    Examples:
      | text                                                                                                                                                                                                                                                             | error message                                                                  |
      |                                                                                                                                                                                                                                                                  | Enter your telephone number                                                    |
      | abc                                                                                                                                                                                                                                                              | Enter a telephone number, like 01632 960 001, 07700 900 982 or 44 808 157 0192 |
      | 1234567899999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999 | Telephone number must be 255 characters or less                                |

  Scenario Outline: User continues with valid data
    When I continue with the value "<text>" in the telephone number field
    Then I am on the "what do you want to tell us about this proposed project? organisation" page

    Examples:
      | text                                                                                                                                                                                                                                                            |
      | 0                                                                                                                                                                                                                                                               |
      | 07889994313                                                                                                                                                                                                                                                     |
      | 1234567899                                                                                                                                                                                                                                                      |
      | 123456789999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999 |
