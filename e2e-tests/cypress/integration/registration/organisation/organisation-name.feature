@testSuite @registration @organisation
Feature: Organisation name page
  As a representative from an organisation
  I want to provide the name of my organisation
  So that my organisation can be registered as an interested party

  Background: Start registration as organisation
    Given I am registering as an "An organisation I work or volunteer for"
    And I have been asked for the name of my organisation or charity

  Scenario: User click on back link
    When I click on back link
    Then I am on the "Are you 18 or over? organisation" page

  Scenario Outline: User continues with invalid data
    When I continue with the value "<text>" in the organisation name field
    Then the following error message should be presented: "<error message>"

    Examples:
      | text                                                                                                                                                                                                                                                             | error message                                                            |
      |                                                                                                                                                                                                                                                                  | Enter your organisation or charity name                                  |
      | qJr3qypBAeTMVBPLUHa3hDAM8FwKiVMZqCJLAHgyewrjFv9cmc5CG9VETkzE8ypBBhT8gJQD7zYTrCtqfP36YDtKqJKpYTn4w64TdYAZS455fmvYbHcBXLhiiKdQXL9QpcTqPpS4wC7aZRKkq7NUY5dPquyUamDpxUyvpp6QQn6HV4uH3UhBuJnj3d6bPgHLHF6vRBZKCRYdYSvSbTvFdUVJ3BVEck8beh3LC2aHAkQG7Y5Y7AbiUWH5d56HEtgg | Name of your organisation or charity name must be 255 characters or less |

  Scenario Outline: User continues with valid data
    When I continue with the value "<text>" in the organisation name field
    Then I am on the "what is your job title or volunteer role?" page

    Examples:
      | text                                                                                                                                                                                                                                                            |
      | Test MiddleName LastName                                                                                                                                                                                                                                        |
      | abc                                                                                                                                                                                                                                                             |
      | qJr3qypBAeTMVBPLUHa3hDAM8FwKiVMZqCJLAHgyewrjFv9cmc5CG9VETkzE8ypBBhT8gJQD7zYTrCtqfP36YDtKqJKpYTn4w64TdYAZS455fmvYbHcBXLhiiKdQXL9QpcTqPpS4wC7aZRKkq7NUY5dPquyUamDpxUyvpp6QQn6HV4uH3UhBuJnj3d6bPgHLHF6vRBZKCRYdYSvSbTvFdUVJ3BVEck8beh3LC2aHAkQG7Y5Y7AbiUWH5d56HEt  |
      | qJr3qypBAeTMVBPLUHa3hDAM8FwKiVMZqCJLAHgyewrjFv9cmc5CG9VETkzE8ypBBhT8gJQD7zYTrCtqfP36YDtKqJKpYTn4w64TdYAZS455fmvYbHcBXLhiiKdQXL9QpcTqPpS4wC7aZRKkq7NUY5dPquyUamDpxUyvpp6QQn6HV4uH3UhBuJnj3d6bPgHLHF6vRBZKCRYdYSvSbTvFdUVJ3BVEck8beh3LC2aHAkQG7Y5Y7AbiUWH5d56HEtg |
