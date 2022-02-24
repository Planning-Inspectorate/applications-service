@testSuite
Feature: Examination of the application page
    As a Test user
    I want to navigate to Examination of the application page
    So that I can verify the functionality of the page

    Background: Navigate to Examination of the application page
        Given I navigate to Decision making process guide page
        Then I am on the "The decision-making process for national infrastructure projects" page
        And I click on show all link
        And I click on "What happens at the Examination of the application" link

    Scenario: verify page title, heading and contents
        Then I am on the "examination of the application" page
        And I verify below links present on Examination of the application page
            | Links                                                   |
            | About the Examination of the application                |
            | What happens at the Examination stage                   |
            | What you can do if you have registered to have your say |
            | If you have missed the deadline to register             |
            | More detailed advice                                    |
        And I click on "Find out what you can do at this stage and check our detailed guides" link
        Then I am on the "Pre-application" page

    Scenario: click on How the review works and what happens next link
        And I click on "How the review works and what happens next" link
        Then I am on the "review of the application" page

    Scenario: click on What happens during the preparation for the Examination link
        And I click on "What happens during the preparation for the Examination" link
        Then I am on the "pre-examination" page

    Scenario: click on What you can do after the decision has been made link
        And I click on "What happens after the decision is made" link
        Then I am on the "what happens after the decision is made" page