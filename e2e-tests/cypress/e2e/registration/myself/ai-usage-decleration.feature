@testSuite @registration @myself
Feature: Check your answers before registering page
	As a Test user
	I want to navigate to Check your answers before registering page
	So that I can verify the functionality

	Background: Navigate to Check your answers before registering page
		Given I navigate to UK address details page
		And I enter below data into address details page
			| AddressLine1   | AddressLine2 | AddressLine3 | PostCode | Country        |
			| Address Line 1 |              |              | NE27 0QQ | United Kingdom |
		And User clicks on continue button
		And I enter "1234567899" into telephone number field
		And User clicks on continue button
		And I enter "used by the examining panel to decide if they recommend the project goes ahead, published on our website" into comments field
		And User clicks on continue button

	Scenario: Select Yes
		When user selects "Yes" radio option on are you 18 or over page
		And I click on the continue button

	Scenario: Select No
		When user selects "No" radio option on are you 18 or over page
		And I click on the continue button

