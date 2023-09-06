@testSuite
Feature: verify footer links
    As a Test user
    I want to click on footer links of the application
    So that I can verify the functionality

    Background: Navigate to the service
        Given I navigate to the who are you registering for page

    Scenario: click on Terms and conditions
        And I click on "Terms and conditions" footer link
        Then I am on the "Terms and conditions" page

    Scenario: click on Accessibility
        And I click on "Accessibility" footer link
        Then I am on the "Accessibility" page

    Scenario: click on Privacy Notice
        And I click on "Privacy Notice" footer link
        Then I am on the "Privacy Notice" page

    Scenario: click on Cookies
        And I click on "Cookies" footer link
        Then I am on the "Cookies settings" page
