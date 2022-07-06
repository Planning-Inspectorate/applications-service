@testSuite @registration @agent
Feature: What do you want to tell us about this proposed project? page
    As a agent registering on behalf of another person, a family or organisation I do not work for
    I want to provide comments
    So that my representee can have their views on a proposed project considered

    Background: Start registration as an agent and progress to comments page
        Given I am registering as an "Agent"
        And I have been asked to provide comments on a proposed project

    Scenario: Verify page title, heading and content
        Then I am on the "what do you want to tell us about this proposed project? agent" page
        And advice to not include any personal details is present on the page

    Scenario: User continues with no comment
        When I continue with an empty value in the comments field
        Then the following error message should be presented: "Enter what you want to tell us about this proposed project"

    @ignore @asb411
    Scenario: User saves with no comment
        When I save and exit with an empty value in the comments field
        Then the following error message should be presented: "Enter what you want to tell us about this proposed project"

    Scenario: User continues with comment beyond max characters constraint
        When I continue with a comment beyond the maximum characters allowed
        Then the following error message should be presented: "What you want to tell us must be 65234 characters or less"

    @ignore @asb411
    Scenario: User saves with no comment beyond max characters constraint
        When I save and exit with a comment beyond the maximum characters allowed
        Then the following error message should be presented: "What you want to tell us must be 65234 characters or less"

    Scenario: User continues with comment at max characters constraint
        When I continue with a comment at the maximum characters allowed
        Then I am on the "check your answers before registering on behalf of someone else" page

    @ignore @asb411
    Scenario: User saves with comment at max characters constraint
        When I save and exit with a comment at the maximum characters allowed
        Then I am on the "your comments are saved agent" page
        And I can see email sent confirmation text

    Scenario: User continues with a short comment
        When I continue with a short comment
        Then I am on the "check your answers before registering on behalf of someone else" page

    @ignore @asb411
    Scenario: User saves with a short comment
        When I save and exit with a short comment
        Then I am on the "your comments are saved agent" page
        And I can see email sent confirmation text
