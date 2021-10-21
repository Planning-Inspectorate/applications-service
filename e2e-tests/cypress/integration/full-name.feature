@testSuite
Feature: What is your full name page validation
  As a Test user
  I want to navigate to what is your full name page
  In order to verify the functionality

  Scenario: Navigate to what is your full name page and assert the content and error message
    Given I navigate to the Type of party page
    When User selects An person interested in having my say
    Then User is navigated to full-name page
    Then I am on the Type of party page
    And I can see the logo gov uk text
    And I can see the text This service is only for Application service
