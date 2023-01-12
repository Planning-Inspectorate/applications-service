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
            | The Pre-application stage                                                |
            | About the Pre-application service for developers                         |
            | People or organisations who want to comment at the Pre-application stage |
            | Advice for local authorities at the Pre-application stage                |
            | More detailed advice                                                     |

    Scenario: click on What happens during the preparation for the Examination link
        And I click on "What happens during the preparation for the Examination" link
        Then I am on the "pre-examination" page

    Scenario: click on What happens at the Examination of the application link
        And I click on "What happens at the Examination of the application" link
        Then I am on the "examination of the application" page

    Scenario: click on Making a recommendation and who makes the final decision link
        And I click on "Making a recommendation and who makes the final decision" link
        Then I am on the "recommendation and decision" page

    Scenario: click on What you can do after the decision has been made link
        And I click on "What happens after the decision is made" link
        Then I am on the "what happens after the decision is made" page