Feature:Documents page-Filtered results
  I want to be able to view the project type and document type my filtered results are based on
  So that I am certain that the right documents are displayed

  Background: User is on the filter page
    Given A user has navigated to the document Filter page


  Scenario: 1 - Apply 1 document type filter 1 project stage
    And User selects the Pre-application stage Filter
    When User selects 1 document type checkbox within the Pre-application filter
    And User clicks Apply filters
    And A Filtered results section is displayed with the project stage Pre-application
    And The document type is displayed against the project stage

  Scenario: 2 - Apply 2 document type filter 1 project stage
    And User selects the Pre-application stage Filter
    When User selects 2 document type checkbox within the Pre-application filter
    And User clicks Apply filters
    And A Filtered results section is displayed with the project stage Pre-application
    And The document type is displayed against the project stage

  Scenario: 3 - Select all filters in 1 project stage
    And User selects the Pre-application stage Filter
    When the user clicks the  Select all filters link within the Pre-application filter
    And User clicks Apply filters
    And A Filtered results section is displayed with the project stage Pre-application
    And The document type is displayed against the project stage

   