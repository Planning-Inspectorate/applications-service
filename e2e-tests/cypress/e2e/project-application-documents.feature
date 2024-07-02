@testSuite
Feature: Project Application documents page
	As a Test user
	I want to navigate to Project Application documents page
	So that I can verify the functionality

#	 ------- Documents Found / Not found
	Scenario: verify documents available for project is in descending order by date published
		Given I navigate to "Hinkley Point C New Nuclear Power Station Material Change 1" project Overview page
		When I click on "Documents" link
		Then I can verify that the project documents displayed in descending order
			| Date          | Stage           | Title                |
			| 22 April 2019 | Pre-application | Material Change - 9  |
			| 21 April 2019 | Pre-application | Material Change - 8  |
			| 20 April 2019 | Pre-application | Material Change - 7  |
			| 19 April 2019 | Pre-application | Material Change - 6  |
			| 18 April 2019 | Pre-application | Material Change - 5  |
			| 17 April 2019 | Pre-application | Material Change - 4  |
			| 16 April 2019 | Pre-application | Material Change      |
			| 16 April 2019 | Pre-application | Material Change      |
			| 16 April 2019 | Pre-application | Material Change - 3  |
			| 16 April 2019 | Pre-application | Material Change - 10 |
			| 16 April 2019 | Pre-application | Material Change - 11 |
			| 16 April 2019 | Pre-application | Material Change - 12 |
			| 16 April 2019 | Pre-application | Material Change - 13 |
			| 16 April 2019 | Pre-application | Material Change - 14 |
			| 16 April 2019 | Pre-application | Material Change - 15 |
			| 16 April 2019 | Pre-application | Material Change - 16 |
			| 16 April 2019 | Pre-application | Material Change - 17 |
			| 16 April 2019 | Pre-application | Material Change - 18 |
			| 16 April 2019 | Pre-application | Material Change - 19 |
			| 16 April 2019 | Pre-application | Material Change - 20 |
			| 16 April 2019 | Pre-application | Material Change - 21 |
			| 16 April 2019 | Pre-application | Material Change - 22 |
			| 16 April 2019 | Pre-application | Material Change - 23 |
			| 16 April 2019 | Pre-application | Material Change - 24 |
			| 16 April 2019 | Pre-application | Material Change - 25 |

	Scenario: verify no documents displayed for a project
		Given I navigate to "Ho Ho Hooo" project Overview page
		When I click on "Documents" link
		Then I verify that no project application documents found text displayed on the page

# ------- Search Terms -------
	Scenario: search returns matching documents
		Given I navigate to "Cleve Hill Solar Park" project Overview page
		When I click on "Documents" link
		When I enter text "england" into search field
		And I click on search button
		Then I can verify that below project documents were returned
			| Document                                                                                                                                                                                                                              | Date             | Stage                                  | Title                   |
			| Additional Submission Ã¢â‚¬â€œ Accepted at the discretion of the Examining Authority - Signed Statement of Common Ground between the Applicant and Natural England. (PDF, 846KB)                                                      | 11 December 2019 | Examination                            | Additional Submissions  |
			| Deadline 4 Submission - 12.2.4 - Statement of Common Ground between the Applicant and Natural England (PDF, 403KB)                                                                                                                    | 3 September 2019 | Examination                            | Deadline 4              |
			| Deadline 4 Submission - 12.2.3 - Statement of Common Ground between the Applicant and Historic England (PDF, 197KB)                                                                                                                   | 3 September 2019 | Examination                            | Deadline 4              |
			| Deadline 2 Submission - 10.3.4 Updated Statement of Common Ground between the Applicant and Historic England (PDF, 283KB)                                                                                                             | 28 June 2019     | Examination                            | Deadline 2              |
			| Additional Submission accepted at the discretion of the Examining Authority Ã¢â‚¬â€œ Agreed Statement of Common Ground between the Applicant and Public Health England (PDF, 268KB)                                                   | 23 May 2019      | Additional Submissions                 | Additional Submissions  |
			| Deadline 3 Submission - 11.4.9 Letters of no Impediment to the Applicant from Natural England (PDF, 470KB)                                                                                                                            | 8 February 2019  | Examination                            | Deadline 3              |
			| Deadline 3 Submission - A statement on Climate Change and Carbon Sequestration, supported by a partial transcript of evidence given by the Chairman of Natural England to the Environmental Audit Committee on 23rd July (PDF, 580KB) | 8 February 2019  | Examination                            | Deadline 3              |
			| 6.4.8.9 Environmental Statement - Letter of No Impediment Request and Response From Natural England (PDF, 9MB)         	From NULL on behalf of Removed                                                                                | 23 November 2018 | Acceptance                             | Environmental Statement |
			| 6.4.8.8 Environmental Statement - Natural England Initial Advice DAS (PDF, 246KB)      	From NULL on behalf of Removed                                                                                                                | 23 November 2018 | Acceptance                             | Environmental Statement |
		When I enter text "" into search field
		And I click on search button
		Then I verify text "Showing 1 to 25 of 987 results" is present on the page

	Scenario: search returns no matching documents
		Given I navigate to "Hinkley Point C New Nuclear Power Station Material Change 1" project Overview page
		When I click on "Documents" link
		When I enter text "search" into search field
		And I click on search button
		Then I verify that no search term documents found text displayed on the page
		And I click on clear search link
		When I enter text "attachment" into search field
		And I click on search button
		Then I verify text "Showing 1 to 25 of 149 results" is present on the page
		Then I verify that only "25" results present on each page
		When I navigate to page "6" of the results
		Then I verify below pagination is present on the page
			| Data     |
			| Previous |
			| 1        |
			| ...      |
			| 4        |
			| 5        |
			| 6        |
			| Next     |
		Then I verify text "Showing 126 to 149 of 149 results" is present on the page
		Then I verify that only "24" results present on each page

# ------- Filtering -------
	Scenario: Option to show filters
		Given I navigate to "Cleve Hill Solar Park" project Overview page
		When I click on "Documents" link
		Then all the filter stages should "not be visible" by default
		And I click on "show all" section
		Then all the filter stages should "be visible" by default
		And I click on "hide all" section
		Then all the filter stages should "not be visible" by default

	Scenario Outline: Check <name> filter exist
		Given I navigate to "Cleve Hill Solar Park" project Overview page
		When I click on "Documents" link
		Then I verify that the "<name>" section expanded with <filterAmount> filters
		And I verify the filter "<name>" name is "<expectedLabel>" <sum>
		And I click on "<name>" section
		Then all the filter stages should "not be visible" by default
		Examples:
			| name                   | filterAmount | expectedLabel           | sum |
			| pre-application        | 2            | Pre-application         | 7   |
			| developers-application | 7            | Developer's application | 258 |
			| acceptance             | 11           | Acceptance              | 266 |
			| pre-examination        | 6            | Pre-examination         | 24  |
			| examination            | 20           | Examination             | 671 |
			| recommendation         | 1            | Recommendation          | 1   |
			| decision               | 5            | Decision                | 16  |
			| post-decision          | 1            | Post-decision           | 2   |

	Scenario: Option to show pre-application filters including everything else checkbox
		Given I navigate to "Cleve Hill Solar Park" project Overview page
		When I click on "Documents" link
		Then all the filter stages should "not be visible" by default
		And I click on "pre-application" section
		And I select "stage-1" checkbox
		And I click on Apply button to apply filters
		Then I can verify that below project documents were returned
			| Document                                                                           | Date             | Stage           | Title                                   |
			| Late scoping consultation response (PDF, 79KB)                                     | 25 January 2018  | Pre-application | Environmental Impact Assessment Scoping |
			| Adopted by the Secretary of State on 19 January 2018 (PDF, 5MB)                    | 19 January 2018  | Pre-application | Environmental Impact Assessment Scoping |
			| Late scoping consultation response (PDF, 191KB)                                    | 11 January 2018  | Pre-application | Environmental Impact Assessment Scoping |
			| Late scoping consultation response (PDF, 722KB)                                    | 11 January 2018  | Pre-application | Environmental Impact Assessment Scoping |
			| Scoping Report submitted to the Secretary of State on 11 December 2017 (PDF, 38MB) | 12 November 2017 | Pre-application | Environmental Impact Assessment Scoping |

 #	- two filters work together
	Scenario: Selecting Two filters of different stages returns a combined documents list
		Given I navigate to "Cleve Hill Solar Park" project Overview page
		When I click on "Documents" link
		Then all the filter stages should "not be visible" by default
		And I click on "pre-application" section
		And I select "stage-1" checkbox
		And I click on "acceptance" section
		And I select "stage-2" checkbox
		And I click on Apply button to apply filters
		Then I can verify that below project documents were returned
			| Document                                                                               | Date             | Stage                                  | Title                                   |
			| NULL (PDF, 92KB) From NULL on behalf of Notification of Decision to Accept Application | 14 December 2018 | Acceptance                             | Acceptance letter                       |
			| Late scoping consultation response (PDF, 79KB)                                         | 25 January 2018  | Pre-application                        | Environmental Impact Assessment Scoping |
			| Adopted by the Secretary of State on 19 January 2018 (PDF, 5MB)                        | 19 January 2018  | Pre-application                        | Environmental Impact Assessment Scoping |
			| Late scoping consultation response (PDF, 191KB)                                        | 11 January 2018  | Pre-application                        | Environmental Impact Assessment Scoping |
			| Late scoping consultation response (PDF, 722KB)                                        | 11 January 2018  | Pre-application                        | Environmental Impact Assessment Scoping |
			| Scoping Report submitted to the Secretary of State on 11 December 2017 (PDF, 38MB)     | 12 November 2017 | Pre-application                        | Environmental Impact Assessment Scoping |

#	- filter and text search returns value
#	- filter and bad search returns empty

# ------- Pagination -------
	Scenario: verify pagination functionality on Project application documents page
		Given I navigate to "North Lincolnshire Green Energy Park" project Overview page
		When I click on "Documents" link
		Then I verify below pagination is present on the page
			| Data              |
			| 1                 |
			| 2                 |
			| Next set of pages |
		Then I verify text "Showing 1 to 25 of 46 results" is present on the page
		Then I verify that only "25" results present on each page
		When I navigate to page "2" of the results
		Then I verify below pagination is present on the page
			| Data                  |
			| Previous set of pages |
			| 1                     |
			| 2                     |
			| Next set of pages     |
		Then I verify text "Showing 26 to 46 of 46 results" is present on the page
		Then I verify that only "21" results present on each page
		Then I verify below pagination is present on the page
			| Data                  |
			| Previous set of pages |
			| 1                     |
			| 2                     |


	Scenario: verify Next/Previous pagination links on Project application documents page
		Given I navigate to "North Lincolnshire Green Energy Park" project Overview page
		When I click on "Documents" link
		And I navigate to page "Next set of pages" of the results
		Then I verify below pagination is present on the page
			| Data                  |
			| Previous set of pages |
			| 1                     |
			| 2                     |
			| Next set of pages     |
		Then I verify text "Showing 26 to 46 of 46 results" is present on the page
		Then I verify that only "21" results present on each page
		When I navigate to page "Previous set of pages" of the results
		Then I verify below pagination is present on the page
			| Data              |
			| 1                 |
			| 2                 |
			| Next set of pages |
		Then I verify text "Showing 1 to 25 of 46 results" is present on the page
		Then I verify that only "25" results present on each page

	Scenario: verify ellipsis on Project application documents page
		Given I navigate to "Hinkley Point C New Nuclear Power Station Material Change 1" project Overview page
		When I click on "Documents" link
		Then I verify below pagination is present on the page
			| Data              |
			| 1                 |
			| 2                 |
			| 3                 |
			| ...               |
			| 7                 |
			| Next set of pages |
		Then I verify text "Showing 1 to 25 of 152 results" is present on the page
		Then I verify that only "25" results present on each page
		When I navigate to page "3" of the results
		Then I verify below pagination is present on the page
			| Data                  |
			| Previous set of pages |
			| 1                     |
			| 2                     |
			| 3                     |
			| 4                     |
			| ...                   |
			| 7                     |
			| Next set of pages     |
		Then I verify text "Showing 51 to 75 of 152 results" is present on the page
		Then I verify that only "25" results present on each page
		When I navigate to page "4" of the results
		Then I verify below pagination is present on the page
			| Data                  |
			| Previous set of pages |
			| 1                     |
			| ...                   |
			| 3                     |
			| 4                     |
			| 5                     |
			| ...                   |
			| 7                     |
			| Next set of pages     |
		Then I verify text "Showing 76 to 100 of 152 results" is present on the page
		Then I verify that only "25" results present on each page
		When I navigate to page "Previous set of pages" of the results
		Then I verify below pagination is present on the page
			| Data                  |
			| Previous set of pages |
			| 1                     |
			| 2                     |
			| 3                     |
			| 4                     |
			| ...                   |
			| 7                     |
			| Next set of pages     |
		Then I verify text "Showing 51 to 75 of 152 results" is present on the page
		Then I verify that only "25" results present on each page
		When I navigate to page "Next set of pages" of the results
		Then I verify below pagination is present on the page
			| Data                  |
			| Previous set of pages |
			| 1                     |
			| ...                   |
			| 3                     |
			| 4                     |
			| 5                     |
			| ...                   |
			| 7                     |
			| Next set of pages     |
		Then I verify text "Showing 76 to 100 of 152 results" is present on the page
		Then I verify that only "25" results present on each page
		When I navigate to page "7" of the results
		Then I verify below pagination is present on the page
			| Data                  |
			| Previous set of pages |
			| 1                     |
			| ...                   |
			| 5                     |
			| 6                     |
			| 7                     |
		Then I verify text "Showing 151 to 152 of 152 results" is present on the page
		Then I verify that only "2" results present on each page
