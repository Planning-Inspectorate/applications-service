@wip
Feature: What type of interested party are you page
  As a Test user
  I want to navigate to What type of interested party are you page
  In order to verify the functionality

Scenario: Navigate to What type of interested party are you page and verify the content in the page and validate error message
    Given I navigate to the Type of party page
    Then I am on the Type of party page
    And I can see the logo gov uk text
    And I can see the text This service is only for Application service
    And User clicks on continue button
    Then Progress is halted with a message that a Type of party is required
 
Scenario: User selects An person interested in having my say and click continue
    Given I navigate to the Type of party page
    When User selects "An person interested in having my say"
    And User clicks on continue button
    Then User is navigated to full-name page
