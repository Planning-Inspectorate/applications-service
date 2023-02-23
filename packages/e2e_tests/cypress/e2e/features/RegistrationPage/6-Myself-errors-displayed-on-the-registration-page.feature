Feature: Error Message Assertion on the registration page - Myself

	As a user
	I want to see error messages displayed on the web page
	So that I know what went wrong and can take appropriate actions

	Background: Myself start the registration process
		Given I navigate to the registration start page

	Scenario: 1 - Myself Submitting a form without filling out required fields
	  When User starts the registartion process as myself
		Then An error message is displayed on the registering for page "Select who you are registering for"
		Then An error message is displayed on the full name page "Enter your full name"
		Then An error message is	displayed on the 18 or over page "Select yes if you are 18 or over"
		Then An error message is displayed on email address page "Enter your email address"
		Then An error messages are displayed on address page "Enter address line 1" "Enter a postcode" "Enter a country"
    Then An error message is displayed on phone page "Enter your telephone number"
		Then An error message is displayed "Enter what you want to tell us about this proposed project"

