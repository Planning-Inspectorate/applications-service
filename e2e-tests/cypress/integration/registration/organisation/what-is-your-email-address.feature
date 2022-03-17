@testSuite @registration @organisation
Feature: What is your email address page
  As a representative from an organisation
  I want to provide my email address
  So that my organisation can be registered as an interested party

  Background: Start registration as an organisation and progress to email address page
    Given I am registering as an "An organisation I work or volunteer for"
    And I have been asked to provide my email address

  Scenario Outline: User continues with invalid data
    When I continue with the value "<text>" in the email field
    Then the following error message should be presented: "<error message>"

    Examples:
      | text                                                                                                                                                                                                                                                             | error message                                      |
      |                                                                                                                                                                                                                                                                  | Enter your email address                           |
      | a                                                                                                                                                                                                                                                                | Email address must be between 3 and 255 characters |
      | ab                                                                                                                                                                                                                                                               | Email address must be between 3 and 255 characters |
      | some-ultra-long-name-from-outta-space-the-galaxy-and-probably-the-known-universe@some-ultra-long-subdomain-from-outta-space-the-galaxy-and-probably-the-known-universe.some-ultra-long-domain-from-outta-space-the-galaxy-and-probably-the-known-universe.gov.uk | Email address must be between 3 and 255 characters |
      | test@                                                                                                                                                                                                                                                            | Enter an email address in the correct format       |
      | test@gmail                                                                                                                                                                                                                                                       | Enter an email address in the correct format       |
      | test@.com                                                                                                                                                                                                                                                       | Enter an email address in the correct format       |


  Scenario Outline: User continues with valid data
    When I continue with the value "<text>" in the email field
    Then I am on the "what is your address? organisation" page

    Examples:
      | text                                                                                                                                                                                                                                                            |
      | test@gmail.com                                                                                                                                                                                                                                                  |
      | someone@some-ultra-long-sub-domain-from-outta-space-and-the-galaxy.some-ultra-long-sub-domain-from-outta-space-and-the-galaxy.some-ultra-long-sub-domain-from-outta-space-and-the-galaxy.some-ultra-long-domain-from-outta-space-maybe-even-the-universe.co.uk |
