Feature: Register - Type of interested party

Scenario: Navigate to Type of party page and verify the content in the page
    Given I navigate to the Type of party page
    Then I am on the Type of party page
    And I can see the logo gov uk text
    And I can see the text This service is only for Application service
 
Scenario: Continue fron Type of paty page without selection any party is provided with an error
    Given I navigate to the Type of party page
    When Select continue without selecting any option
    Then Progress is halted with a message that a Type of party is required

Scenario: User selects An person interested in having my say and is taken to full-name page
    Given I navigate to the Type of party page
    When User selects An person interested in having my say
    Then User is navigated to full-name page