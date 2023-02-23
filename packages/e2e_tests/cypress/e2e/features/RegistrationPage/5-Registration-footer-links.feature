Feature: Verify footer links registration page
	As a Test user
	I want to click on footer links of the application
	So that I can verify the functionality

	Background: User start the registration process
		Given I navigate to the registration start page

	Scenario: Click on footer links on the registration page
		And I click on 'Terms and conditions' footer link
		Then I am on the 'Terms and conditions' page

		And I click on 'Accessibility' footer link
		Then I am on the 'Accessibility statement' page

		And I click on 'Privacy Notice (on GOV.UK)' footer link
		Then I am on the 'Customer Privacy Notice' page





