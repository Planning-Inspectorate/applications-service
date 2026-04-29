@testSuite
Feature: Homepage locale switcher
    As a local user
    I want to change the service language
    So that homepage language switching stays covered

    Background: Open the local homepage
        Given I open the local homepage

    Scenario: Switch to Welsh
        When I switch the homepage language to "cy"
        Then the homepage is displayed in Welsh

    Scenario: Switch back to English
        When I switch the homepage language to "cy"
        And I switch the homepage language to "en"
        Then the homepage is displayed in English
