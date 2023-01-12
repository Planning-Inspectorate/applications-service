@testSuite @registration @myself
Feature: What is your telephone number page
  As a Test user
  I want to navigate to What is your telephone number page
  So that I can verify the functionality

  Background: Navigate to What is your telephone number page
    Given I navigate to UK address details page
    And I enter below data into address details page
      | AddressLine1   | AddressLine2 | AddressLine3 | PostCode | Country        |
      | Address Line 1 |              |              | NE27 0QQ | United Kingdom |
    And User clicks on continue button

  Scenario: Verify page title and heading
    Then I am on the "What is your telephone number?" page

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
    Then I am on the "What do you want to tell us about this proposed project?" page

    Examples:
      | text                                                                                                                                                                                                                                                            |
      | 0                                                                                                                                                                                                                                                               |
      | 07889994313                                                                                                                                                                                                                                                     |
      | 1234567899                                                                                                                                                                                                                                                      |
      | 123456789999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999 |
