@testSuite @smoketest
Feature: Project information page
    As a local user
    I want to review the local project information page
    So that key project details and navigation remain covered

    Background: Open the local project information page
        Given I open the local project information page

    Scenario: Project information sections are displayed
        Then I am on the local project information page
        And the project information page shows these sections
            | Section              |
            | About the project    |
            | Project stage        |
            | Project location     |
            | Get updates          |
            | Contact us           |
        And the project information page shows these details
            | Detail                               |
            | Type of application                  |
            | Name of applicant                    |
            | This project is at                   |
            | Enter your email address to receive: |
            | Telephone: 0303 444 5000             |

    Scenario: Register to have your say can be opened from the project information page
        When I open the register to have your say journey from the project information page
        Then I am on the register to have your say page
        When I return to the local project information page from project navigation
        Then I am on the local project information page

    Scenario: Get updates can be opened from the project information page
        When I open the get updates journey from the project information page
        Then I am on the get updates start page
        When I return to the local project information page from project navigation
        Then I am on the local project information page
