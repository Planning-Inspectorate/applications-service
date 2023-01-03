@testSuite
Feature: Project Application documents page
	As a Test user
	I want to navigate to Project Application documents page
	So that I can verify the functionality

	Scenario: verify pagination functionality on Project application documents page
		Given I navigate to "North Lincolnshire Green Energy Park" project Overview page
		When I click on "Documents" link
		Then I verify below pagination is present on the page
			| Data              |
			| 1                 |
			| 2                 |
			| 3                 |
			| Next set of pages |
		Then I verify text "Showing 1 to 20 of 46 results" is present on the page
		Then I verify that only "20" results present on each page
		When I navigate to page "2" of the results
		Then I verify below pagination is present on the page
			| Data                  |
			| Previous set of pages |
			| 1                     |
			| 2                     |
			| 3                     |
			| Next set of pages     |
		Then I verify text "Showing 21 to 40 of 46 results" is present on the page
		Then I verify that only "20" results present on each page
		When I navigate to page "3" of the results
		Then I verify below pagination is present on the page
			| Data                  |
			| Previous set of pages |
			| 1                     |
			| 2                     |
			| 3                     |
		Then I verify text "Showing 41 to 46 of 46 results" is present on the page
		Then I verify that only "6" results present on each page

	Scenario: verify Next/Previous pagination links on Project application documents page
		Given I navigate to "North Lincolnshire Green Energy Park" project Overview page
		When I click on "Documents" link
		And I navigate to page "Next set of pages" of the results
		Then I verify below pagination is present on the page
			| Data                  |
			| Previous set of pages |
			| 1                     |
			| 2                     |
			| 3                     |
			| Next set of pages     |
		Then I verify text "Showing 21 to 40 of 46 results" is present on the page
		Then I verify that only "20" results present on each page
		When I navigate to page "Next set of pages" of the results
		Then I verify below pagination is present on the page
			| Data                  |
			| Previous set of pages |
			| 1                     |
			| 2                     |
			| 3                     |
		Then I verify text "Showing 41 to 46 of 46 results" is present on the page
		Then I verify that only "6" results present on each page
		When I navigate to page "Previous set of pages" of the results
		Then I verify below pagination is present on the page
			| Data                  |
			| Previous set of pages |
			| 1                     |
			| 2                     |
			| 3                     |
			| Next set of pages     |
		Then I verify text "Showing 21 to 40 of 46 results" is present on the page
		Then I verify that only "20" results present on each page
		When I navigate to page "Previous set of pages" of the results
		Then I verify below pagination is present on the page
			| Data              |
			| 1                 |
			| 2                 |
			| 3                 |
			| Next set of pages |
		Then I verify text "Showing 1 to 20 of 46 results" is present on the page
		Then I verify that only "20" results present on each page

	Scenario: verify ellipsis on Project application documents page
		Given I navigate to "Hinkley Point C New Nuclear Power Station Material Change 1" project Overview page
		When I click on "Documents" link
		Then I verify below pagination is present on the page
			| Data              |
			| 1                 |
			| 2                 |
			| 3                 |
			| ...               |
			| 8                 |
			| Next set of pages |
		Then I verify text "Showing 1 to 20 of 152 results" is present on the page
		Then I verify that only "20" results present on each page
		When I navigate to page "3" of the results
		Then I verify below pagination is present on the page
			| Data                  |
			| Previous set of pages |
			| 1                     |
			| 2                     |
			| 3                     |
			| 4                     |
			| ...                   |
			| 8                     |
			| Next set of pages     |
		Then I verify text "Showing 41 to 60 of 152 results" is present on the page
		Then I verify that only "20" results present on each page
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
			| 8                     |
			| Next set of pages     |
		Then I verify text "Showing 61 to 80 of 152 results" is present on the page
		Then I verify that only "20" results present on each page
		When I navigate to page "Previous set of pages" of the results
		Then I verify below pagination is present on the page
			| Data                  |
			| Previous set of pages |
			| 1                     |
			| 2                     |
			| 3                     |
			| 4                     |
			| ...                   |
			| 8                     |
			| Next set of pages     |
		Then I verify text "Showing 41 to 60 of 152 results" is present on the page
		Then I verify that only "20" results present on each page
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
			| 8                     |
			| Next set of pages     |
		Then I verify text "Showing 61 to 80 of 152 results" is present on the page
		Then I verify that only "20" results present on each page
		When I navigate to page "8" of the results
		Then I verify below pagination is present on the page
			| Data                  |
			| Previous set of pages |
			| 1                     |
			| ...                   |
			| 6                     |
			| 7                     |
			| 8                     |
		Then I verify text "Showing 141 to 152 of 152 results" is present on the page
		Then I verify that only "12" results present on each page

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


	Scenario: verify no documents displayed for a project
		Given I navigate to "Ho Ho Hooo" project Overview page
		When I click on "Documents" link
		Then I verify that no project application documents found text displayed on the page


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
			| 6.4.8.9 Environmental Statement - Letter of No Impediment Request and Response From Natural England (PDF, 9MB)         	From NULL on behalf of Removed                                                                                | 23 November 2018 | Acceptance (Review of the application) | Environmental Statement |
			| 6.4.8.8 Environmental Statement - Natural England Initial Advice DAS (PDF, 246KB)      	From NULL on behalf of Removed                                                                                                                | 23 November 2018 | Acceptance (Review of the application) | Environmental Statement |
		When I enter text "" into search field
		And I click on search button
		Then I verify text "Showing 1 to 20 of 987 results" is present on the page

	Scenario: search returns no matching documents
		Given I navigate to "Hinkley Point C New Nuclear Power Station Material Change 1" project Overview page
		When I click on "Documents" link
		When I enter text "search" into search field
		And I click on search button
		Then I verify that no search term documents found text displayed on the page
		And I click on clear search link
		When I enter text "attachment" into search field
		And I click on search button
		Then I verify text "Showing 1 to 20 of 149 results" is present on the page
		Then I verify that only "20" results present on each page
		When I navigate to page "8" of the results
		Then I verify below pagination is present on the page
			| Data                  |
			| Previous set of pages |
			| 1                     |
			| ...                   |
			| 6                     |
			| 7                     |
			| 8                     |
		Then I verify text "Showing 141 to 149 of 149 results" is present on the page
		Then I verify that only "9" results present on each page


	Scenario: Option to show filters
		Given I navigate to "Cleve Hill Solar Park" project Overview page
		When I click on "Documents" link
		Then all the filter stages should "not be visible" by default
		And I click on "show all" section
		Then all the filter stages should "be visible" by default
		And I click on "hide all" section
		Then all the filter stages should "not be visible" by default


	Scenario Outline: Check <name> flter exist
		Given I navigate to "Cleve Hill Solar Park" project Overview page
		When I click on "Documents" link
		Then I verify that the "<name>" section expanded with <filterAmount> filters
		And I verify the filter "<name>" name is "<expectedLabel>" <sum>
		And I click on "<name>" section
		Then all the filter stages should "not be visible" by default
		Examples:
			| name                   | filterAmount | expectedLabel           | sum |
			| pre-application        | 2            | Pre-application         | 7   |
			| developers-application | 7            | Developer's Application | 258 |
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



# ---------- Older tests -------------
# Scenario: filter by project stage
#     Given I navigate to "Cleve Hill Solar Park" project Overview page
#     When I click on "Documents" link
#     And I click on "project stage" section
#     And I select "Deadline 7 (152)" checkbox
#     And I click on Apply button to apply filters
#     Then I can verify that below project documents were returned
#         | Document                                                                                                                                                                         |
#         | Deadline 7 Submission Ã¢â‚¬â€œ Late Non-IP submission accepted at the discretion of the Examining Authority Ã¢â‚¬â€œ Comments on the proposed planning application (PDF, 2MB)    |
#         | Able Acoustics - Review of Environmental Statement, Noise and Vibration Chapter (PDF, 5MB)                                                                                       |
#         | Deadline 7 Submission Ã¢â‚¬â€œ Late submission accepted at the discretion of the Examining Authority Ã¢â‚¬â€œ DCO Validation Report (PDF, 609KB)                                 |
#         | Deadline 7 Submission Ã¢â‚¬â€œ Final comments on the proposed planning application (PDF, 71KB)                                                                                   |
#         | Deadline 7 Submission Ã¢â‚¬â€œ Final comments on the proposed planning application (PDF, 71KB)                                                                                   |
#         | Non-Interested Party accepted at the discretion of the Examining Authority - Objection to planning application (PDF, 8MB)                                                        |
#         | Deadline 7 Submission Ã¢â‚¬â€œ Late submission accepted at the discretion of the Examining Authority Ã¢â‚¬â€œ Concerns raised about the proposed planning application (PDF, 3MB) |
#         | Comments on responses submitted up to Deadline 6 (PDF, 597KB)                                                                                                                    |
#         | Objection to planning application (PDF, 43KB)                                                                                                                                    |
#         | Objection to planning application (PDF, 125KB)                                                                                                                                   |
#         | Objection to planning application (PDF, 29KB)                                                                                                                                    |
#         | Objection to planning application (PDF, 17KB)                                                                                                                                    |
#         | Objection to planning application (PDF, 76KB)                                                                                                                                    |
#         | Review of Environmental Statement, Noise and Vibration Chapter (PDF, 87KB)                                                                                                       |
#         | Objection to planning application (PDF, 15KB)                                                                                                                                    |
#         | Objection to planning application (PDF, 14KB)                                                                                                                                    |
#         | Objection to planning application (PDF, 94KB)                                                                                                                                    |
#         | Non-Interested Party accepted at the discretion of the Examining Authority - Objection to planning application (PDF, 14KB)                                                       |
#         | Late Filing of Wirsol Annual Accounts (PDF, 83KB)                                                                                                                                |
#         | Rare Bird Sighting (PDF, 83KB)                                                                                                                                                   |
#     And I click on "project stage" section

# Scenario: search by text and filter by project stage
#     Given I navigate to "Cleve Hill Solar Park" project Overview page
#     When I click on "Documents" link
#     When I enter text "late" into search field
#     And I click on search button
#     And I click on "project stage" section
#     And I select "Deadline 7 (152)" checkbox
#     And I click on Apply button to apply filters
#     Then I can verify that below project documents were returned
#         | Document                                                                                                                                                                         |
#         | Deadline 7 Submission Ã¢â‚¬â€œ Late Non-IP submission accepted at the discretion of the Examining Authority Ã¢â‚¬â€œ Comments on the proposed planning application (PDF, 2MB)    |
#         | Deadline 7 Submission Ã¢â‚¬â€œ Late submission accepted at the discretion of the Examining Authority Ã¢â‚¬â€œ DCO Validation Report (PDF, 609KB)                                 |
#         | Deadline 7 Submission Ã¢â‚¬â€œ Late submission accepted at the discretion of the Examining Authority Ã¢â‚¬â€œ Concerns raised about the proposed planning application (PDF, 3MB) |
#         | Deadline 7 Submission - Medway Estuary and Swale Strategy - Stratedgy Appraisal Report Template for a FCRM Template (PDF, 2MB)                                                   |
#         | Deadline 7 Submission - Late Filing of Wirsol Annual Accounts (PDF, 83KB)                                                                                                        |
#     And I click on "project stage" section

# Scenario: filter by project stage and search for text
#     Given I navigate to "Cleve Hill Solar Park" project Overview page
#     When I click on "Documents" link
#     And I click on "project stage" section
#     And I select "Deadline 7 (152)" checkbox
#     And I click on Apply button to apply filters
#     When I enter text "rare bird" into search field
#     And I click on search button
#     Then I can verify that below project documents were returned
#         | Document                                               |
#         | Deadline 7 Submission - Rare Bird Sighting (PDF, 83KB) |
#     And I click on "project stage" section

# Scenario: filter by document type
#     Given I navigate to "Cleve Hill Solar Park" project Overview page
#     When I click on "Documents" link
#     And I click on "document type" section
#     And I select "Environmental Statement (221)" checkbox
#     And I click on Apply button to apply filters
#     Then I can verify that below project documents were returned
#         | Document                                                                                                                                                                                             |
#         | 6.3.8 Environmental Statement - Photomontage Summer - Year 1 Viewpoint 9 (PDF, 18MB) From NULL on behalf of Removed 23 November 2018Acceptance(Reviewoftheapplication)Environmental Statement        |
#         | 6.3.8 Environmental Statement - Photomontage Summer - Year 1 Viewpoint 22 North (PDF, 13MB) From NULL on behalf of Removed 23 November 2018Acceptance(Reviewoftheapplication)Environmental Statement |
#         | 6.3.8 Environmental Statement - Photomontage Summer - Year 1 Viewpoint 12 (PDF, 15MB) From NULL on behalf of Removed 23 November 2018Acceptance(Reviewoftheapplication)Environmental Statement       |
#         | 6.3.7 Environmental Statement - Photomontage Summer - Existing View Viewpoint 6 (PDF, 29MB) From NULL on behalf of Removed 23 November 2018Acceptance(Reviewoftheapplication)Environmental Statement |
#         | 6.3.7 Environmental Statement - Photomontage Summer - Existing View Viewpoint 8 (PDF, 28MB) From NULL on behalf of Removed 23 November 2018Acceptance(Reviewoftheapplication)Environmental Statement |
#         | 6.3.8 Environmental Statement - Photomontage Summer- Year 1 Viewpoint 2 (PDF, 21MB) From NULL on behalf of Removed 23 November 2018Acceptance(Reviewoftheapplication)Environmental Statement         |
#         | 6.3.7 Environmental Statement - Photomontage Summer - Existing View Viewpoint 9 (PDF, 33MB) From NULL on behalf of Removed 23 November 2018Acceptance(Reviewoftheapplication)Environmental Statement |
#         | 6.3.8 Environmental Statement - Photomontage Summer - Year 1 Viewpoint 22 South (PDF, 15MB) From NULL on behalf of Removed 23 November 2018Acceptance(Reviewoftheapplication)Environmental Statement |
#         | 6.3.7 Environmental Statement - Photomontage Summer - Existing View Viewpoint 7 (PDF, 36MB) From NULL on behalf of Removed 23 November 2018Acceptance(Reviewoftheapplication)Environmental Statement |
#         | 6.3.8 Environmental Statement - Photomontage Year 1 Summer Cover and Contents (PDF, 141KB) From NULL on behalf of Removed 23 November 2018Acceptance(Reviewoftheapplication)Environmental Statement  |
#         | 6.3.8 Environmental Statement - Photomontage Summer - Year 1 Viewpoint 1 (PDF, 16MB) From NULL on behalf of Removed 23 November 2018Acceptance(Reviewoftheapplication)Environmental Statement        |
#         | 6.3.8 Environmental Statement - Photomontage Summer - Year 1 Viewpoint 8 (PDF, 24MB) From NULL on behalf of Removed 23 November 2018Acceptance(Reviewoftheapplication)Environmental Statement        |
#         | 6.3.8 Environmental Statement - Photomontage Summer - Year 1 Viewpoint 3 (PDF, 9MB) From NULL on behalf of Removed 23 November 2018Acceptance(Reviewoftheapplication)Environmental Statement         |
#         | 6.3.9 Environmental Statement - Photomontage Summer- Year 5 Viewpoint 2 (PDF, 11MB) From NULL on behalf of Removed 23 November 2018Acceptance(Reviewoftheapplication)Environmental Statement         |
#         | 6.3.9 Environmental Statement - Photomontage Summer - Year 5 Viewpoint 22 North (PDF, 7MB) From NULL on behalf of Removed 23 November 2018Acceptance(Reviewoftheapplication)Environmental Statement  |
#         | 6.3.9 Environmental Statement - Photomontage Summer - Year 5 Viewpoint 7 (PDF, 11MB) From NULL on behalf of Removed 23 November 2018Acceptance(Reviewoftheapplication)Environmental Statement        |
#         | 6.3.9 Environmental Statement - Photomontage Summer - Year 5 Viewpoint 4 (PDF, 8MB) From NULL on behalf of Removed 23 November 2018Acceptance(Reviewoftheapplication)Environmental Statement         |
#         | 6.4 Environmental Statement - Volume 4 Cover and Contents (PDF, 182KB) From NULL on behalf of Removed 23 November 2018Acceptance(Reviewoftheapplication)Environmental Statement                      |
#         | 6.3.9 Environmental Statement - Photomontage Summer - Year 5 Viewpoint 9 (PDF, 9MB) From NULL on behalf of Removed 23 November 2018Acceptance(Reviewoftheapplication)Environmental Statement         |
#         | 6.3.9 Environmental Statement - Photomontage Summer - Year 5 Viewpoint 22 South (PDF, 7MB) From NULL on behalf of Removed 23 November 2018Acceptance(Reviewoftheapplication)Environmental Statement  |
#     And I click on "document type" section

# Scenario: search by text and filter by document type
#     Given I navigate to "Cleve Hill Solar Park" project Overview page
#     When I click on "Documents" link
#     When I enter text "late" into search field
#     And I click on search button
#     And I click on "document type" section
#     And I select "Deadline 2 (115)" checkbox
#     And I click on Apply button to apply filters
#     Then I can verify that below project documents were returned
#         | Document                                                                                                                                                                  |
#         | Deadline2SubmissionÃ¢â‚¬â€œLatesubmissionacceptedatthediscretionoftheExaminingAuthority-SummaryofWrittenRepresentation(PDF,40KB)FromRemoved16July2019ExaminationDeadline2 |
#     And I click on "document type" section

# Scenario: filter by document type and search for text
#     Given I navigate to "Cleve Hill Solar Park" project Overview page
#     When I click on "Documents" link
#     And I click on "document type" section
#     And I select "Deadline 3 (88)" checkbox
#     And I click on Apply button to apply filters
#     When I enter text "cover" into search field
#     And I click on search button
#     Then I can verify that below project documents were returned
#         | Document                                                                                                                                                 |
#         | Deadline 3 Submission - Cover Letter (PDF, 3MB)                                                                                                          |
#         | Deadline 3 Submission - A statement on a recent SoS decision on an energy recovery facility, supported by a copy of the SoSÃ¢â‚¬â„¢s letter (PDF, 456KB) |
#         | Deadline 3 Submission - Cover Email (PDF, 15KB)                                                                                                          |
#     And I click on "document type" section

# Scenario: filter by project stage and document type
#     Given I navigate to "Cleve Hill Solar Park" project Overview page
#     When I click on "Documents" link
#     And I click on "project stage" section
#     And I select "Acceptance (review of the application)" checkbox
#     And I click on "document type" section
#     And I select "Deadline 4 (72)" checkbox
#     And I click on Apply button to apply filters
#     Then I can verify that below project documents were returned
#         | Document                                                                                                                                                                                         |
#         | Deadline 4 Submission Ã¢â‚¬â€œ Late submission accepted at the discretion of the Examining Authority Ã¢â‚¬â€œ Response to the Examining AuthorityÃ¢â‚¬â„¢s Further Written Questions (PDF, 15KB) |
#         | Deadline 4 Submission - Response to Examining Authority's Further Written Questions and comments on the Development Consent Order (PDF, 439KB)                                                   |
#         | Deadline 4 Submission - 12.5.4 - Deadline 4 Submissions - Schedule of Changes to the DDCO at Deadline 4 (PDF, 317KB)                                                                             |
#         | Deadline 4 Submission - 6.4.14.1 - Updates to existing documents outline Construction Traffic Management Plan (Tracked) (PDF, 12MB)                                                              |
#         | Deadline 4 Submission - 6.4.12.10 - Outline Special Protection Area - Construction Noise Management Plan (Tracked) (PDF, 14MB)                                                                   |
#         | Deadline 4 Submission - 6.4.5.2 - Updates to existing documents outline Landscape and Biodiversity Management Plan (PDF, 6MB)                                                                    |
#         | Deadline 4 Submission - 6.4.14.1 - Updates to existing documents outline Construction Traffic Management Plan (PDF, 12MB)                                                                        |
#         | Deadline 4 Submission - 6.4.5.2 - Updates to existing documents outline Landscape and Biodiversity Management Plan (Tracked) (PDF, 6MB)                                                          |
#         | Deadline 4 Submission - 4.3 - Book of Reference (PDF, 34KB)                                                                                                                                      |
#         | Deadline 4 Submission - 7.1 - Updated to existing documents outline Design Principles (PDF, 7MB)                                                                                                 |
#         | Deadline 4 Submission - 7.2 - Updates to Existing Documents - Mitigation Schedule (PDF, 179KB)                                                                                                   |
#         | Deadline 4 Submission - 6.4.5.4 - Updates to existing documents outline Construction Environmental Management Plan (PDF, 8MB)                                                                    |
#         | Deadline 4 Submission - 6.4.11.4 - Updates to existing documents outline Written Scheme of Investigation (Tracked) (PDF, 7MB)                                                                    |
#         | Deadline 4 Submission - 6.4.5.4 - Updates to existing documents outline Construction Environmental Management Plan (Tracked) (PDF, 8MB)                                                          |
#         | Deadline 4 Submission - 6.4.11.4 - Updates to existing documents outline Written Scheme of Investigation (PDF, 7MB)                                                                              |
#         | Deadline 4 Submission - 12.5.3 - Deadline 4 Submissions - Outline Skills , Supply Chain and Employment Plan (PDF, 158KB)                                                                         |
#         | Deadline 4 Submission - 12.5.9 - Deadline 4 Submissions - Written Representation by the Applicant - Push/Pull Test Report (PDF, 9MB)                                                             |
#         | Deadline 4 Submission - 12.5.7 - Deadline 4 Submissions - Written Representation by the Applicant - Air Quality Assessment - Battery Fire (PDF, 7MB)                                             |
#         | Deadline 4 Submission - 12.5.2 - Deadline 4 Submissions - Written Representation by the Applicant on Arbitration (PDF, 137KB)                                                                    |
#         | Deadline 4 Submission - Response to Examining Authority's Further Written Questions (PDF, 3MB)                                                                                                   |
#     And I click on "project stage" section
#     And I click on "document type" section

# Scenario: search by text and filter by project stage and document type
#     Given I navigate to "Cleve Hill Solar Park" project Overview page
#     When I click on "Documents" link
#     When I enter text "consult" into search field
#     And I click on search button
#     And I click on "project stage" section
#     And I select "Acceptance (review of the application)" checkbox
#     And I click on "document type" section
#     And I select "Deadline 4 (72)" checkbox
#     And I click on Apply button to apply filters
#     Then I can verify that below project documents were returned
#         | Document                                                                                                                                                               |
#         | Deadline 4 Submission - 12.1.13 - The Applicant's responses to ExQ2 - Appendices Appendix 12 Ã¢â‚¬â€œ Allianz Risk Consulting - Tech Talk Volume 26: BESS (PDF, 446KB) |
#     And I click on "project stage" section
#     And I click on "document type" section

# Scenario: filter by project stage and document type and then search by text
#     Given I navigate to "Cleve Hill Solar Park" project Overview page
#     When I click on "Documents" link
#     And I click on "project stage" section
#     And I select "Acceptance (review of the application)" checkbox
#     And I click on "document type" section
#     And I select "Deadline 4 (72)" checkbox
#     And I click on Apply button to apply filters
#     When I enter text "specific" into search field
#     And I click on search button
#     Then I can verify that below project documents were returned
#         | Document                                                                                                                                                            |
#         | Deadline 4 Submission - Responses to the Examining Authority's Further Written Questions and Notification of wish to speak at Issue Specific Hearing 6 (PDF, 676KB) |
#         | Deadline 4 Submission - Evidence to support Oral Submission at Issue Specific Hearing 5 on 10 September 2019 (PDF, 232KB)                                           |
#     And I click on "project stage" section
#     And I click on "document type" section
