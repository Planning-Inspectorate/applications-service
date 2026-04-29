@testSuite
Feature: Beta banner feedback link
    As a local user
    I want to access the service feedback form from the beta banner
    So that the shared feedback entry point remains covered

    Background: Open the local homepage for feedback
        Given I open the local homepage for feedback

    Scenario: The beta banner feedback link points to the service feedback form
        Then the beta banner feedback link points to the service feedback form
