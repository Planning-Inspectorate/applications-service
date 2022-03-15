@testSuite @registration @organisation
Feature: What is your job title or volunteer role? page
  As a Test user
  I want to navigate to What is your job title or volunteer role? page
  So that I can verify the functionality

  Background: Navigate to What is your job title or volunteer role? page
    Given I am registering as an organisation
    And I have been asked to provide my job title or volunteer role

  Scenario Outline: User continues with invalid data
    When I continue with the value "<text>" in the job title/role field
    Then the following error message should be presented: "<error message>"

    Examples:
      | text                                                                 | error message                                                  |
      |                                                                      | Enter your job title or volunteer role                         |
      | qJr3qypBAeTMVBPLUHa3hDAM8FwKiVMZqCJLAHgyewrjFv9cmc5CG9VETkzE8ypBB    | Your job title or volunteer role must be 64 characters or less |
      | Some really long job title or volunteer role which exceeds max chars | Your job title or volunteer role must be 64 characters or less |

  Scenario Outline: User continues with valid data
    When I continue with the value "<text>" in the job title/role field
    Then I am on the "what is your email address? organisation" page

    Examples:
      | text                                                             |
      | Administration Officer                                           |
      | AO                                                               |
      | CIO                                                              |
      | qJr3qypBAeTMVBPLUHa3hDAM8FwKiVMZqCJLAHgyewrjFv9cmc5CG9VETkzE8ypB |
      | Some long job title or volunteer role within maximum characters! |

