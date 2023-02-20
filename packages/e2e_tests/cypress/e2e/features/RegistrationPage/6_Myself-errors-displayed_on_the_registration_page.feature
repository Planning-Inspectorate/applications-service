Feature: Error Message Assertion on the registration page - Myself

	As a user
	I want to see error messages displayed on the web page
	So that I know what went wrong and can take appropriate actions

	Background: Myself start the registration process
		Given I navigate to the registration start page


	Scenario: Myself Submitting a form without filling out required fields
		When I and click the submit button on all the pages without completing the mandatory options
		Then And a error message is displayed - Select who you are registering for
		Then And a error message is displayed - Enter your full name
		Then And a error message is	displayed - Select yes if you are 18 or over
		Then And a error message is  displayed - Enter your email address
		Then And error messages are displayed in the address fields
    Then And a error message is displayed - Enter your telephone number
		Then And a error message is displayed - Enter what you want to tell us about this proposed project

