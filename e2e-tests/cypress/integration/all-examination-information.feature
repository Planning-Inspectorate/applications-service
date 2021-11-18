@testSuite
Feature: All Examination information page
    As a Test user
    I want to navigate to All Examination information page
    So that I can verify the functionality

    Background: Navigate to All Examination information page
        Given I navigate to All Examination information page

    Scenario: Navigate to overview page
        And I am on the "A404 Dewsbury" page
        When I click on "A404 Dewsbury project information" link
        Then I am on the "North Lincolnshire Green Energy Park project information" page

    Scenario: Search functionality
        When I enter text "EN010116-000001-Smalll Test document for Doc upload" into search field
        And I click on search
        Then below rows should be returned
            | Data                                                |
            | Advice Attachment                                   |
            | EN010116-000001-Smalll Test document for Doc upload |
            | Environmental Impact Assessment Scoping             |
            | EN010116-000001-Smalll Test document for Doc upload |
        And sort by drop down should be having Recently updated