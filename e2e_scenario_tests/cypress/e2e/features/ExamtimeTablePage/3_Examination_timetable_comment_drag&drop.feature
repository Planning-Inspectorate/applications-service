Feature: User Completes submission of examination timetable for a national infrastructure project
  As Myself
  As an organisation I work or volunteer for
  On behalf of another person, a family group or an organisation I do not work for

  Background: User Starts submission of examination timetable process
    Given I navigate to the submission start page
    


  Scenario: 1 - User completes submission of examination timetable process as myself - drag-drop & comment
    Then I complete the submission process as myself - drag and drop
    Then I sucessfully complete the submission as myself "Submission Complete"

  Scenario: 2 - User completes submission of examination timetable process as a agent - drag-drop & comment
    Then I complete the submission process as a agent - drag and drop
    Then I sucessfully complete the submission as a agent "Submission Complete"

  Scenario: 3 - User completes submission of examination timetable process as an organisation - drag-drop & comment
    Then I complete the submission process as an organisation - drag and drop
    Then I sucessfully complete the submission as an organisation "Submission Complete"
    