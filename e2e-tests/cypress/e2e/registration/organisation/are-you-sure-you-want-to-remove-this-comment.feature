@ignore
Feature: Are you sure you want to remove this comment? page
    As a Test user
    I want to navigate to Are you sure you want to remove this comment page
    So that I can verify the functionality

    Background: Navigate to Are you sure you want to remove this comment? page
        Given I navigate to UK address details page using organisation route
      And I enter "test@gmail.com" into email address field
      And User clicks on continue button
        And I enter below data into address details page
            | AddressLine1   | AddressLine2 | AddressLine3 | PostCode | Country        |
            | Address Line 1 |              |              | NE27 0QQ | United Kingdom |
        And User clicks on continue button
        And I enter "1234567899" into telephone number field
        And User clicks on continue button
        And I enter "used by the examining panel to decide if they recommend the project goes ahead, published on our website" into comments field
        And User clicks on continue button
        And User clicks on "remove" link

    Scenario: verify page title, heading, error message, select yes and continue
        Then I am on the "Are you sure you want to remove this comment?" page
        And User clicks on continue button
        Then below error message should be presented on Are you sure you want to remove this comment page
            | ErrorMsg                                      |
            | Select yes if you wnat to remove this comment |
        And user selects "Yes" radio option on Are you sure you want to remove this comment page
        And User clicks on continue button
        Then I am on the "Do you want to add another registration comment?" page

    Scenario: select no and continue
        And user selects "No" radio option on Are you sure you want to remove this comment page
        And User clicks on continue button
        Then I am on the "Do you want to add another registration comment?" page
