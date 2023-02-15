Feature: As a user I want to be able to filter documents by date published
    User can find the documents I need within a specific timeframe.


    Background: User is on the filter page
        Given A user has navigated to the document Filter page

    Scenario: 1-User enters 'From' date only
        When The user enters a from date "17" "10" "2019" into date published box
        And Clicks Apply filter
        Then A filtered results section is displayed with the date from active filter
        And A list of documents that were published from 17 10 2019 until the current date are displayed

    Scenario: 2-User enter 'To' date only
        When The user enters a to date "6" "2" "2020" into date published box
        And Clicks Apply filter
        Then A Filtered results section is displayed with the date to active filters
        And A list of all documents that were published up to and including 06 2 2020 with new first


    Scenario: 3-Incomplete information - Missing Day - 'From' published box
        When The user completes only from month and year "1" "2020" into the published box
        Then The user is presented with an error "The from date must include day"


    Scenario: 4-Incomplete information - Missing Day - 'To' published box
        When The user completes only to month and year "2" "2020" into the published box
        Then The user is presented with a error "The to date must include day"


    Scenario: 5-Incomplete information - Missing Month - 'From' published box
        When The user completes only from day and year "3" "2021" into the published box
        Then The user is presented with an error "The from date must include month"


    Scenario: 6-Incomplete information - Missing Month - 'To' published box
        When The user completes only to day and year "6" "2020" into the published box
        And The user is presented with an error message


    Scenario: 7-User completes the 'From' and 'To' published box
        When The user enters a date into the from published box "17" "10" "2019"
        And  The user completes a date into the to published box "2" "11" "2020"
        And Users clicks apply filter
        Then A filter results section is displayed with the from and to filtered results
        And A list of documents that were published from 17 10 2019 until the current date are displayed