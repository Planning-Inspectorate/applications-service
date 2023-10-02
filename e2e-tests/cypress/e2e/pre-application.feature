@testSuite
Feature: Pre-application page
    As a Test user
    I want to navigate to Pre-application page
    So that I can verify the functionality of the page

    Background: Navigate to Pre-application page
        Given I navigate to Decision making process guide page
        Then I am on the "The decision-making process for national infrastructure projects" page
        And I click on show all link
        And I click on "Find out what you can do at this stage and check our detailed guides" link

    Scenario: verify page title, heading and contents
        Then I am on the "Pre-application" page
        And I verify below links present on Pre-application page
            | Links                                                                    |
            | The pre-application stage                                                |
            | About the pre-application service for developers                         |
            | Advice for local authorities at the pre-application stage                |
            | More detailed advice                                                     |

    Scenario: click on What happens during the preparation for the Examination link
        And I click on "What happens during the preparation for the examination" link
        Then I am on the "pre-examination" page

    Scenario: click on What happens at the Examination of the application link
        And I click on "What happens at the examination of the application" link
        Then I am on the "examination of the application" page

    Scenario: click on Making a recommendation and who makes the final decision link
        And I click on "Making a recommendation and who makes the final decision" link
        Then I am on the "recommendation and decision" page