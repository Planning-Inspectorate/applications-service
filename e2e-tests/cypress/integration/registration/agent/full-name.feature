@testSuite @registration @agent
Feature: What is your full name page
  As a agent registering on behalf of another person, a family or organisation I do not work for
  I want to provide my full name
  So that I can register on their behalf as an interested party 

  Background: Start registration as an agent and progress to What is your full name page
    Given I am registering as an "Agent"

  Scenario: User click on back link
    When I click on back link
    Then I am on the "who are you registering for?" page

  Scenario: Navigate to full name page and verify the content in the page
    Then I can see the logo gov uk text
    And I am on the "what is your full name? agent" page
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
    Then I am on the "what is the name of the organisation you work for?" page

    Examples:
      | text                                                             |
      | Test MiddleName LastName                                         |
      | abc                                                              |
      | some long name which is one character short of the max length!!  |
      | some long name which is only just within the max length allowed! |
