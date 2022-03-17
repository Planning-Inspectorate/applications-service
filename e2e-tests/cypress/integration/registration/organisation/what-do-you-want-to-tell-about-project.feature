@testSuite @registration @organisation
Feature: What do you want to tell us about this proposed project? page
  As a representative from an organisation
  I want to provide comments
  So that my organisation can have their views on a proposed project considered

    Background: Start registration as an organisation and progress to comments page
      Given I am registering as an "Organisation"
      And I have been asked for comments on a proposed project

    Scenario: Verify page title, heading and content
      Then I am on the "what do you want to tell us about this proposed project? organisation" page
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
      Then I am on the "check your answers before registering organisation" page

    Scenario: User saves with comment at max characters constraint
      When I save and exit with a comment at the maximum characters allowed
      Then I am on the "your comments are saved organisation" page
      And I can see email sent confirmation text

    Scenario: User continues with a short comment
      When I continue with a short comment
      Then I am on the "check your answers before registering organisation" page

    Scenario: User saves with a short comment
      When I save and exit with a short comment
      Then I am on the "your comments are saved organisation" page
      And I can see email sent confirmation text
