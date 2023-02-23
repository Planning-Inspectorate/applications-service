Feature: User Completes submission of examination timetable for a project
    As Myself
    As an organisation I work or volunteer for
    On behalf of another person, a family group or an organisation I do not work for
    Background: User Starts submission of examination timetable process
        Given I navigate to the submission start page


    Scenario: 1 - User completes submission of examination timetable process as myself with both comments and file upload
        Then I complete the submission process as myself with both comments and file upload
        Then I sucessfully complete the submission as myself with both comments and file upload "Submission Complete"

    Scenario: 2 - User completes submission of examination timetable process as a agent with both comments and file upload
        Then I complete the submission process as a agent with both comments and file upload
        Then I sucessfully complete the submission as a agent with both comments and file upload "Submission Complete"

    Scenario: 3 - User completes submission of examination timetable process as an organisation with both comments and file upload
        Then I complete the submission process as an organisation with both comments and file upload
        Then I sucessfully complete the submission as an organisation with both comments and file upload "Submission Complete"
