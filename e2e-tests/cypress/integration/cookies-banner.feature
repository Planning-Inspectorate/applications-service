@testSuite
Feature: cookies banner page
    As a Test user
    I want to navigate to who are you registering for? page to see cookie banner
    So that I can verify the functionality of cookie banner

    Background: Navigate to who are you registering for page
        Given I navigate to the who are you registering for page


    Scenario: Navigate to who are you registering for? page and accept analytics cookies
        And I click on "accept" cookies button
        Then I verify below text is present on the page
            | Text                                                                                |
            | You’ve accepted analytics cookies. You can change your cookie settings at any time. |
        And I click on "accepted message hide" cookies button

    Scenario: Navigate to who are you registering for? page and reject analytics cookies
        And I click on "reject" cookies button
        Then I verify below text is present on the page
            | Text                                                                                |
            | You’ve rejected analytics cookies. You can change your cookie settings at any time. |
        And I click on "rejected message hide" cookies button

    Scenario: Navigate to cookies page, verify page title and heading, select yes and save changes
        And I click on "view" cookies button
        Then I am on the "Cookies settings" page
        And I select "yes" radio choice
        And I click on save changes on cookie settings page
        Then I verify below text is present on the page
            | Text                            |
            | Your cookie settings were saved |
        And I click on go back to the page you were looking at link
        Then I am on the "who are you registering for?" page

    Scenario: Navigate to cookies page select no and save changes
        And I click on "view" cookies button
        And I select "no" radio choice
        And I click on save changes on cookie settings page
        Then I verify below text is present on the page
            | Text                            |
            | Your cookie settings were saved |
        And I click on go back to the page you were looking at link
        Then I am on the "who are you registering for?" page

    Scenario: click back link
        And I click on "view" cookies button
        And I click on back link
        Then I am on the "who are you registering for?" page


