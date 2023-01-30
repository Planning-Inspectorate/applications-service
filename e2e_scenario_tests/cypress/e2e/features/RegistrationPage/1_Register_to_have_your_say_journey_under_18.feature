Feature: User completes have your say registration journey on a national infrastructure project
    As Myself
    As an organisation I work or volunteer for
    On behalf of another person, a family group or an organisation I do not work for

    Background: User start the registration process
        Given I navigate to the registration start page
        

    Scenario: 1 - User completes registration process as myself - under 18
        And I selects checkbox for myself - under 18
        And I complete the registration process as myself - under 18
        Then I sucessfully complete the registration process for myself - under 18 "Registration complete"

    Scenario: 2 - User completes registration process for organisation I work or volunteer - under 18
        And I selects checkbox for organisation I work or volunteer - under 18
        And I complete the registration process for an organisation I work or volunteer - under 18
        Then I sucessfully complete the registration for an organisation I work or volunteer - under 18 "Registration complete"


    Scenario: 3 - User completes registration process on behalf of another person, a family group or an organisation - under 18
        And I selects checkbox on behalf of another person, family - under 18
        And I complete the registration process on behalf of another person, family - under 18
        Then I sucessfully complete the registration on behalf of another person, family - under 18 "Registration complete"