@testSuite @registration @organisation
Feature: AI usage declaration page
	As a Test user
	I want to confirm whether I used AI to prepare my registration comments
	So that I can complete the registration journey

	Background: Navigate to the AI usage declaration page
		Given I navigate to AI usage declaration page using organisation route
		Then I am on the "AI usage declaration" page

	Scenario: Select Yes
		When user selects "Yes" radio option on AI usage declaration page
		And I click on the continue button
		Then I am on the "check your answers before registering" page

	Scenario: Select No
		When user selects "No" radio option on AI usage declaration page
		And I click on the continue button
		Then I am on the "check your answers before registering" page
