@testSuite
Feature: Section 51 advice
    As a local user
    I want to search and review section 51 advice
    So that the local advice listing remains covered

    Background: Open the local section 51 advice page
        Given I open the local section 51 advice page

    Scenario: Section 51 advice page structure is displayed
        Then I am on the local section 51 advice page
        And the section 51 advice page content is displayed

    Scenario: Section 51 advice can be searched and filtered
        When I search section 51 advice for an invalid term
        Then the no section 51 advice results message is displayed
        When I clear the current section 51 advice search
        Then section 51 advice results are displayed
        When I change section 51 results per page to "50"
        Then the section 51 advice url includes "itemsPerPage=50"

    Scenario: A section 51 advice result can be opened
        When I open the first section 51 advice result
        Then the section 51 advice detail page is displayed
        When I return to the section 51 advice list
        Then I am on the local section 51 advice page

    Scenario: Section 51 related guides are displayed
        Then the section 51 related guides are displayed
