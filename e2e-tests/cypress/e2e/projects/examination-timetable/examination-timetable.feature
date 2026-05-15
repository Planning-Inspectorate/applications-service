@testSuite @smoketest
Feature: Examination timetable
    As a local user
    I want to review examination availability
    So that local examination behaviour remains covered

    Background: Open the local examination timetable page
        Given I open the local examination timetable page

    Scenario: The examination timetable shows the current local state
        Then the examination timetable shows no upcoming deadlines
        And the examination timetable shows past deadlines and events

    Scenario: The examination project navigation is displayed
        Then the examination project navigation is displayed

    Scenario: The have your say link leads to the no open deadlines page
        When I open the have your say journey from the examination timetable page
        Then the no open deadlines message is displayed on the examination submission page
        And the examination submission form is not displayed

    Scenario: The direct examination submission page shows no open deadlines
        When I open the local examination submission page
        Then the no open deadlines message is displayed on the examination submission page
        And the examination submission form is not displayed

