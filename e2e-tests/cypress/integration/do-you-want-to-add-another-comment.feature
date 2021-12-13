@testSuite
Feature: Do you want to add another comment? page
    As a Test user
    I want to navigate to Do you want to add another comment page
    So that I can verify the functionality

    Scenario: verify page title, heading, error message and select yes and continue
        Given I navigate to UK address details page
        And I enter below data into address details page
            | AddressLine1   | AddressLine2 | AddressLine3 | PostCode | Country        |
            | Address Line 1 |              |              | NE27 0QQ | United Kingdom |
        And User clicks on continue button
        And I enter "test@gmail.com" into email address field
        And User clicks on continue button
        And I enter "1234567899" into telephone number field
        And User clicks on continue button
        And I enter "Project topic" into topic field
        And I enter "used by the examining panel to decide if they recommend the project goes ahead, published on our website" into comments field
        And User clicks on continue button
        Then I am on the "Do you want to add another comment?" page
        And User clicks on continue button
        Then below error message should be presented on Do you want to add another comment page
            | ErrorMsg                                      |
            | Select yes if you want to add another comment |
        And user selects "Yes" radio option on Do you want to add another comment page
        And User clicks on continue button
        Then I am on the "What do you want to tell us about this proposed project?" page

    Scenario: select No and Continue
        Given I navigate to UK address details page
        And I enter below data into address details page
            | AddressLine1   | AddressLine2 | AddressLine3 | PostCode | Country        |
            | Address Line 1 |              |              | NE27 0QQ | United Kingdom |
        And User clicks on continue button
        And I enter "test@gmail.com" into email address field
        And User clicks on continue button
        And I enter "1234567899" into telephone number field
        And User clicks on continue button
        And I enter "Project topic" into topic field
        And I enter "used by the examining panel to decide if they recommend the project goes ahead, published on our website" into comments field
        And User clicks on continue button
        And user selects "No" radio option on Do you want to add another comment page
        And User clicks on continue button
        Then I am on the "Check your answers before registering" page

    Scenario: select Change
        Given I navigate to UK address details page using organisation route
        And I enter below data into address details page
            | AddressLine1   | AddressLine2 | AddressLine3 | PostCode | Country        |
            | Address Line 1 |              |              | NE27 0QQ | United Kingdom |
        And User clicks on continue button
        And I enter "test@gmail.com" into email address field
        And User clicks on continue button
        And I enter "1234567899" into telephone number field
        And User clicks on continue button
        And I enter "Project topic" into topic field
        And I enter "used by the examining panel to decide if they recommend the project goes ahead, published on our website" into comments field
        And User clicks on continue button
        And User clicks on "change" link
        Then I am on the "What do you want to tell us about this proposed project?" page

    Scenario: select Remove
        Given I navigate to UK address details page using organisation route
        And I enter below data into address details page
            | AddressLine1   | AddressLine2 | AddressLine3 | PostCode | Country        |
            | Address Line 1 |              |              | NE27 0QQ | United Kingdom |
        And User clicks on continue button
        And I enter "test@gmail.com" into email address field
        And User clicks on continue button
        And I enter "1234567899" into telephone number field
        And User clicks on continue button
        And I enter "Project topic" into topic field
        And I enter "used by the examining panel to decide if they recommend the project goes ahead, published on our website" into comments field
        And User clicks on continue button
        And User clicks on "remove" link
        Then I am on the "Are you sure you want to remove this comment?" page