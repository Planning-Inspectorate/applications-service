@testSuite
Feature: Document date filtering
    As a local user
    I want to filter documents by date published
    So that local date filtering remains covered

    Background: Open the local documents page
        Given I open the local documents page

    Scenario: Filter by a from date only
        When I enter "17" "10" "2019" into the from published date filter
        And I apply the documents filters
        Then the active documents filters include the from date
        And the documents are published on or after the selected from date

    Scenario: Filter by a to date only
        When I enter "25" "10" "2021" into the to published date filter
        And I apply the documents filters
        Then the active documents filters include the to date
        And the documents are published on or before the selected to date

    Scenario: Missing from day shows an error
        When I enter only from month "1" and year "2020"
        Then the from date error is "The from date must include day"

    Scenario: Missing to day shows an error
        When I enter only to month "2" and year "2020"
        Then the to date error is "The to date must include day"

    Scenario: Missing from month shows an error
        When I enter only from day "3" and year "2021"
        Then the from date error is "The from date must include month"

    Scenario: Missing to month shows an error
        When I enter only to day "6" and year "2020"
        Then the to date error is "The to date must include month"

    Scenario: Filter by a from and to date range
        When I enter "17" "10" "2019" into the from published date filter
        And I enter "25" "10" "2021" into the to published date filter
        And I apply the documents filters
        Then the active documents filters include the selected date range
        And the documents are published within the selected date range

    Scenario: To date earlier than from date shows an error
        When I enter "11" "10" "2015" into the from published date filter
        And I enter "16" "2" "2015" into the to published date filter
        And I apply the documents filters
        Then the from date error is "The from date entered should start before the to date"

    Scenario: Invalid from date text shows an error
        When I enter invalid text into the from published date filter
        And I apply the documents filters
        Then the from date error is "The from date must be a real date"

    Scenario: Invalid to date text shows an error
        When I enter invalid text into the to published date filter
        And I apply the documents filters
        Then the to date error is "The to date must be a real date"

    Scenario: Missing from year shows an error
        When I enter only from month "1" and day "3"
        Then the from date error is "The from date must include year"

    Scenario: Missing to year shows an error
        When I enter only to month "2" and day "7"
        Then the to date error is "The to date must include year"
