@testSuite @registration @myself
Feature: What do you want to tell us about this proposed project? page
    As a Test user
    I want to navigate to What do you want to tell us about this proposed project? page
    So that I can verify the functionality

    Background: Navigate to What do you want to tell us about this proposed project? page
        Given I navigate to UK address details page
        And I continue with the following values in the address fields
          | AddressLine1   | AddressLine2 | AddressLine3 | PostCode | Country        |
          | Address Line 1 |              |              | NE27 0QQ | United Kingdom |
        And I continue with the value "1234567899" in the telephone number field

    Scenario: Verify page title, heading and content
      Then I am on the "What do you want to tell us about this proposed project?" page
      And advice to not include any personal details is present on the page

    Scenario: User continues with no comment
      When I continue with an empty value in the comments field
      Then the following error message should be presented: "Enter what you want to tell us about this proposed project"

    Scenario: User saves with no comment
      When I save and exit with an empty value in the comments field
      Then the following error message should be presented: "Enter what you want to tell us about this proposed project"

    Scenario: User continues with comment beyond max characters constraint
      When I continue with a comment beyond the maximum characters allowed
      Then the following error message should be presented: "What you want to tell us must be 65234 characters or less"

    Scenario: User saves with no comment beyond max characters constraint
      When I save and exit with a comment beyond the maximum characters allowed
      Then the following error message should be presented: "What you want to tell us must be 65234 characters or less"

    Scenario: User continues with comment at max characters constraint
      When I continue with a comment at the maximum characters allowed
      Then I am on the "Check your answers before registering" page

    Scenario: User saves with comment at max characters constraint
      When I save and exit with a comment at the maximum characters allowed
      Then I am on the "your comments are saved" page
      And I can see email sent confirmation text

    Scenario: User continues with a short comment
      When I continue with a short comment
      Then I am on the "Check your answers before registering" page

    Scenario: User saves with a short comment
      When I save and exit with a short comment
      Then I am on the "your comments are saved" page
      And I can see email sent confirmation text
