@testSuite @registration @agent
Feature: AI usage declaration page
	As a Test user
	I want to confirm whether I used AI to prepare my registration comments
	So that I can complete the registration journey

	Background: Navigate to the AI usage declaration page
		Given I navigate to AI usage declaration page using agent route
		Then I am on the "AI usage declaration" page

	Scenario: Select Yes
		When user selects "Yes" radio option on AI usage declaration page
		And I click on the continue button
		Then I am on the "check your answers before registering on behalf of someone else" page

	Scenario: Select No
		When user selects "No" radio option on AI usage declaration page
		And I click on the continue button
		Then I am on the "check your answers before registering on behalf of someone else" page

	Scenario: Page layout and content
		Then the AI declaration page displays all required content

	Scenario: Error message when no selection is made
		When I click on the continue button
		Then an error message is displayed for AI declaration: "Select yes if you used AI to help produce your registration comments"

	@welsh
	Scenario: Welsh translation content
		Given I switch the language to Welsh
		Then the AI declaration page displays correct Welsh content
		When I click on the continue button
		Then an error message is displayed for AI declaration: "Dewiswch 'ie' os ydych wedi defnyddio AI i helpu i gynhyrchu eich sylwadau cofrestru"
