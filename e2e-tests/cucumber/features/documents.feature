Feature: Document search endpoint
  Scenario: Returns error when no case reference provided
    Given the request body contains no case reference
    When I submit a POST request to the /api/v3/documents endpoint
    Then the response status code is 400
    And the response body contains error "must have required property 'caseReference'"

  Scenario: Returns error when filter without name or value provided
    Given the request body contains a property "caseReference" with value "EN010085"
    And the request body contains a filter with no name or value
    When I submit a POST request to the /api/v3/documents endpoint
    Then the response status code is 400
    And the response body contains error "must have required property 'name'"
    And the response body contains error "must have required property 'value'"

  Scenario: Returns no results for search matching no documents
    Given the request body contains a property "caseReference" with value "EN010085"
    And the request body contains a property "searchTerm" with value "this is an example search"
    When I submit a POST request to the /api/v3/documents endpoint
    Then the response status code is 200
    And the response body contains 0 documents