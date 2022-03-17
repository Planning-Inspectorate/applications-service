@testSuite @registration @organisation
Feature: UK Address details page
  As a representative from an organisation
  I want to provide my postal address
  So that my organisation can be registered as an interested party

  Background: Start registration as an organisation and progress to postal address page
    Given I am registering as an "An organisation I work or volunteer for"
    And I have been asked to provide my postal address

  Scenario: User continues with no data
    When I click on the continue button
    Then the following error messages should be presented
      | ErrorMsg             |
      | Enter address line 1 |
      | Enter a postcode     |
      | Enter a country      |

  Scenario: User continues with all data beyond the max length constraints
    When I continue with the following values in the address fields
      | AddressLine1                                                                                                                                                                                                                                                     | AddressLine2                                                                                      | AddressLine3                                                      | PostCode          | Country                                                           |
      | Some ultra long house number from outta space, the galaxy and probably the known universe - and - some ultra long street name from outta space, the galaxy and probably the known universe - really - the system should not really allow this many characters??? | Some ultra long address line 2 from outta space, the galaxy and probably the known universe!!!!!! | Some ultra long address line 3 from outta space and the galaxy!!! | NE27 0QQQQQQQQQQQ | United Kingdom of Great Britain and Northern Ireland - long name! |
    Then the following error messages should be presented
      | ErrorMsg                                      |
      | Address line 1 must be 255 characters or less |
      | Address line 2 must be 96 characters or less  |
      | Address line 3 must be 64 characters or less  |
      | Postcode must be 16 characters or less        |
      | Country must be 64 characters or less         |

  Scenario: User continues with required data beyond the max length constraints
    When I continue with the following values in the address fields
      | AddressLine1                                                                                                                                                                                                                                                     | AddressLine2  | AddressLine3 | PostCode          | Country                                                           |
      | Some ultra long house number from outta space, the galaxy and probably the known universe - and - some ultra long street name from outta space, the galaxy and probably the known universe - really - the system should not really allow this many characters??? | Some locality | Some county  | NE27 0QQQQQQQQQQQ | United Kingdom of Great Britain and Northern Ireland - long name! |
    Then the following error messages should be presented
      | ErrorMsg                                      |
      | Address line 1 must be 255 characters or less |
      | Postcode must be 16 characters or less        |
      | Country must be 64 characters or less         |

  Scenario: User continues with optional data beyond the max length constraints
    When I continue with the following values in the address fields
      | AddressLine1 | AddressLine2                                                                                      | AddressLine3                                                      | PostCode | Country                                              |
      | 1, Some Road | Some ultra long address line 2 from outta space, the galaxy and probably the known universe!!!!!! | Some ultra long address line 3 from outta space and the galaxy!!! | NE27 0QQ | United Kingdom of Great Britain and Northern Ireland |
    Then the following error messages should be presented
      | ErrorMsg                                     |
      | Address line 2 must be 96 characters or less |
      | Address line 3 must be 64 characters or less |

  Scenario: User continues with valid data
    When I continue with the following values in the address fields
      | AddressLine1   | AddressLine2 | AddressLine3 | PostCode | Country        |
      | Address Line 1 |              |              | NE27 0QQ | United Kingdom |
    Then I am on the "what is your telephone number? organisation" page

  Scenario: User continues with valid data just within the max length constraints
    When I continue with the following values in the address fields
      | AddressLine1                                                                                                                                                                                                                                                    | AddressLine2 | AddressLine3 | PostCode | Country        |
      | Some ultra long house number from outta space, the galaxy and probably the known universe - and - some ultra long street name from outta space, the galaxy and probably the known universe - really - should the system really allow for this many characters?? |              |              | NE27 0QQ | United Kingdom |
    Then I am on the "what is your telephone number? organisation" page

