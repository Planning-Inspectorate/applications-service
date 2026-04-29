@testSuite
Feature: Relevant representations
    As a local user
    I want to search and review relevant representations
    So that the local listing behaviour stays covered

    Background: Open the local relevant representations page
        Given I open the local relevant representations page

    Scenario: Relevant representations are listed and can be paged
        Then relevant representations are displayed on the first page
        When I open page "2" of relevant representations
        Then relevant representations are displayed

    Scenario: Relevant representations can be searched and reset
        When I change relevant representation results per page to "50"
        Then the relevant representations url includes "itemsPerPage=50"
        When I search relevant representations for "unlikely-search-term-12345"
        Then the no relevant representations results message is displayed
        When I clear the relevant representations search
        Then relevant representations are displayed

    Scenario: A relevant representation can be opened and returned from
        When I open the first relevant representation
        Then the relevant representation detail page is displayed
        When I return to the relevant representations results
        Then relevant representations are displayed
