Feature:Documents page-Filtered results
	I want to be able to view the project type and document type my filtered results are based on
	So that I am certain that the right documents are displayed

	Background: User is on the filter page
		Given A user has navigated to the document Filter page


	Scenario: 1 - Apply 1 document type filter 1 project stage
		And User selects the "Pre-application" stage Filter
		When User selects 1 document type checkbox within the "Pre-application" filter
		And the user click the apply filter button
		And the filtered results section is displayed with the project stage "Pre-application"
		And The document type is displayed against the project stage

	Scenario: 2 - Apply 2 document type filter 1 project stage
		And User selects the "Pre-application" stage Filter
		When User selects 2 document type checkbox within the Pre-application filter
		And the user click the apply filter button
		And the filtered results section is displayed with the project stage "Pre-application"
		And The document type is displayed against the project stage

	Scenario: 3 - Select all filters in 1 project stage
		And User selects the "Pre-application" stage Filter
		When the user clicks the selects all filters link within the "Pre-application" stage
		And the user click the apply filter button
		And the filtered results section is displayed with the project stage "Pre-application"
		And The document type is displayed against the project stage

	Scenario: 4 - Apply 1 document type filter in all available project stages
		And the user expands all the filters
		When User selects 1 document type checkbox within the "Pre-application" filter
		And The user selects 1 document type checkbox within the Acceptance stage
		And The user selects 1 document type checkbox within the Pre-examination stage
		And The user selects 1 document type checkbox within the Examination stage
		And the user click the apply filter button
		Then the filtered results section is displayed with the project stage "Pre-application"
		And the filtered results section is displayed with the project stage "Acceptance"
		And the filtered results section is displayed with the project stage "Pre-examination"


	Scenario: 5 - Select all filters in all available project stages
		And the user expands all the filters
		When the user clicks the selects all filters link within the "Pre-application" stage
		And the user clicks the selects all filters link within the "Developers application" stage
		And the user clicks the selects all filters link within the "Acceptance" stage
		And the user clicks the selects all filters link within the "Pre-examination" stage
		And the user clicks the selects all filters link within the "Examination" stage
		And the user click the apply filter button
		Then the filtered results section is displayed with the project stage "Pre-application"
		And the filtered results section is displayed with the project stage "Developer's application"
		And the filtered results section is displayed with the project stage "Acceptance"
		And the filtered results section is displayed with the project stage "Pre-examination"
		And the filtered results section is displayed with the project stage "Examination"

	Scenario: 6 - Apply 1 document type filter 1 project stage and the dates displayed in a descending order
		And the user expands all the filters
		When User selects 1 document type checkbox within the "Pre-application" filter
		And the user click the apply filter button
		And The dates are displayed in a descending order
