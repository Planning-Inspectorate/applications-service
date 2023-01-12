@testSuite @registration @organisation @completion
Feature: Organisation Registration complete page
    As a Test user
    I want to navigate to Organisation Regsitration complete page
    So that I can verify the functionality

  Background: Start registration as an organisation and progress to check answers page
    Given I am registering as an "Organisation"
    And I have been asked to check my answers

    Scenario: Complete registration
        When I confirm my answers are correct
        And I accept the declaration
        Then I am on the "Registration complete organisation" page
        And the page includes a link to the project
