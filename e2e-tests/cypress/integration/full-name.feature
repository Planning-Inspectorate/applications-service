@testSuite
Feature: What is your full name page
  As a Test user
  I want to navigate to what is your full name page
  So that I can verify the functionality

  Background: Navigate to full name page
    Given I navigate to what is your full name page selecting "Myself"

  Scenario: User click on back link
    When I click on back link
    Then I am on the "who are you registering for?" page

  Scenario: Navigate to full name page and verify the content in the page
    Then I can see the logo gov uk text
    And I am on the "what is your full name?" page
    And I can see the text This service is only for Application service

  Scenario Outline: User continues with invalid data
    When I continue with the value "<text>" in the full name field
    Then the following error message should be presented: "<error message>"

    Examples:
      | text                                                                                             | error message                                 |
      |                                                                                                  | Enter your full name                          |
      | a                                                                                                | Full name must be between 3 and 64 characters |
      | ab                                                                                               | Full name must be between 3 and 64 characters |
      | some long name from outta space and probably the universe, maybe?                                | Full name must be between 3 and 64 characters |
      | some very long name from outta space very out of touch with reality and most likely middle-class | Full name must be between 3 and 64 characters |

  Scenario Outline: User continues with valid data
    When I continue with the value "<text>" in the full name field
    Then I am on the "Are you 18 or over?" page

    Examples:
      | text                                                             |
      | Test MiddleName LastName                                         |
      | abc                                                              |
      | some long name which is one character short of the max length!!  |
      | some long name which is only just within the max length allowed! |
