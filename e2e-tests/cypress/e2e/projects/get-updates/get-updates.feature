@testSuite @ignore
Feature: Get updates
    As a local user
    I want to subscribe to project updates
    So that the local get updates journey stays covered

    Background: Open the local project information page for updates
        Given I open the local project information page for updates

    Scenario: A user can subscribe to all project updates
        When I open the get updates journey from the project information page
        And I start the get updates journey
        And I enter "test@test.com" as the get updates email address
        And I choose to receive all project updates
        Then I am on the get updates confirmation page
        When I complete the get updates confirmation through the local api
        Then I see the get updates success page
        And I can return to the local project information page from the success page
