@testSuite
Feature: Examination page
    As a Test user
    I want to navigate to Examination page
    So that I can verify the functionality of the page

    Background: Navigate to Examination page
        Given I navigate to Decision making process guide page
        Then I am on the "The decision-making process for national infrastructure projects" page
        And I click on show all link
        And I click on "What happens at the examination stage" link

    Scenario: verify page title, heading and contents
        Then I am on the "examination" page
        And I verify below links present on Examination page
            | Links                                                   |
            | About the examination stage                             |
            | What happens at the examination stage                   |
            | What you can do if you have registered to have your say |
            | If you have missed the deadline to register             |
            | More detailed advice                                    |
        And I click on "Find out what you can do at this stage and check our detailed guides" link
        Then I am on the "Pre-application" page