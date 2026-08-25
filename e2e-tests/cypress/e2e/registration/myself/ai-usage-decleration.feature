@testSuite @registration @myself
Feature: AI usage declaration page
	As a Test user
	I want to confirm whether I used AI to prepare my registration comments
	So that I can complete the registration journey

	Background: Navigate to the AI usage declaration page
		Given I navigate to UK address details page
		And I enter below data into address details page
			| AddressLine1   | AddressLine2 | AddressLine3 | PostCode | Country        |
			| Address Line 1 |              |              | NE27 0QQ | United Kingdom |
		And User clicks on continue button
		And I enter "1234567899" into telephone number field
		And User clicks on continue button
		And I enter "used by the examining panel to decide if they recommend the project goes ahead, published on our website" into comments field
		And User clicks on continue button
		Then I am on the "AI usage declaration" page

	Scenario: Select Yes
		When user selects "Yes" radio option on AI usage declaration page
		And I click on the continue button
		Then I am on the "Check your answers before registering" page

	Scenario: Select No
		When user selects "No" radio option on AI usage declaration page
		And I click on the continue button
		Then I am on the "Check your answers before registering" page

