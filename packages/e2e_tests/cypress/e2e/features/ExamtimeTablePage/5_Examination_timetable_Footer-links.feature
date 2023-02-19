Feature: Verify footer links examination timetable page
	As a Test user
	I want to click on footer links of the application
	So that I can verify the functionality

	Background: User Starts submission of examination timetable process
    Given I navigate to the submission start page

	Scenario: click on footer links on the registration page
		And I click on Terms and conditions footer link
		Then I am on the Terms and conditions page
		And I click on accessibility footer link
		Then I am on the accessibility page
		And I click on privacy Notice footer link
		Then I am on the privacy Notice page
		And I click on cookies footer link
		Then I am on the cookies settings page



