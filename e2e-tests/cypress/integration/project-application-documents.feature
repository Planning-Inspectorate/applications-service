@testSuite
Feature: Project Application documents page
    As a Test user
    I want to navigate to Project Application documents page
    So that I can verify the functionality

    Scenario: verify pagination functionality on Project application documents page
        Given I navigate to "North Lincolnshire Green Energy Park" project Overview page
        When I click on "Project application documents" link
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
        When I click on "Project application documents" link
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
        When I click on "Project application documents" link
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
        When I click on "Project application documents" link
        Then I can verify that the project documents displayed in descending order
            | Date       | Stage           | Title                 |
            | 2019-04-22 | Pre Application | Material Change - 9   |
            | 2019-04-21 | Pre Application | Material Change - 8   |
            | 2019-04-20 | Pre Application | Material Change - 7   |
            | 2019-04-19 | Pre Application | Material Change - 6   |
            | 2019-04-18 | Pre Application | Material Change - 5   |
            | 2019-04-17 | Pre Application | Material Change - 4   |
            | 2019-04-16 | Pre Application | Material Change - 111 |
            | 2019-04-16 | Pre Application | Material Change - 99  |
            | 2019-04-16 | Pre Application | Material Change - 100 |
            | 2019-04-16 | Pre Application | Material Change - 101 |
            | 2019-04-16 | Pre Application | Material Change - 102 |
            | 2019-04-16 | Pre Application | Material Change - 103 |
            | 2019-04-16 | Pre Application | Material Change - 104 |
            | 2019-04-16 | Pre Application | Material Change - 105 |
            | 2019-04-16 | Pre Application | Material Change - 106 |
            | 2019-04-16 | Pre Application | Material Change - 107 |
            | 2019-04-16 | Pre Application | Material Change - 115 |
            | 2019-04-16 | Pre Application | Material Change - 113 |
            | 2019-04-16 | Pre Application | Material Change - 114 |
            | 2019-04-16 | Pre Application | Material Change - 112 |

    Scenario: verify no documents displayed for a project
        Given I navigate to "Ho Ho Hooo" project Overview page
        When I click on "Project application documents" link
        Then I verify that no project application documents found text displayed on the page

    Scenario: search returns matching documents
        Given I navigate to "Cleve Hill Solar Park" project Overview page
        When I click on "Project application documents" link
        When I enter text "england" into search field
        And I click on search button
        Then I can verify that below project documents were returned
            | Document                                                                                                                                                                                                                   |
            | AdditionalSubmissionacceptedatthediscretionoftheExaminingAuthorityÃ¢â‚¬â€œAgreedStatementofCommonGroundbetweentheApplicantandPublicHealthEngland(PDF,268KB)PublishedbyRemoved2019-05-23PreExaminationAdditionalSubmissions |
            | 6.4.8.9 Environmental Statement - Letter of No Impediment Request and Response From Natural England (PDF, 9MB) Published by NULL on behalf of Removed 2018-11-23AcceptanceEnvironmental Statement                          |
            | 6.4.8.8 Environmental Statement - Natural England Initial Advice DAS (PDF, 246KB) Published by NULL on behalf of Removed 2018-11-23AcceptanceEnvironmental Statement                                                       |
        When I enter text "" into search field
        And I click on search button
        Then I verify text "Showing 1 to 20 of 297 results" is present on the page

    Scenario: search returns no matching documents
        Given I navigate to "Hinkley Point C New Nuclear Power Station Material Change 1" project Overview page
        When I click on "Project application documents" link
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
        When I click on "Project application documents" link
        Then all the filter stages should "not be visible" by default
        And I click on "show all" section
        Then all the filter stages should "be visible" by default
        And I click on "hide all" section
        Then all the filter stages should "not be visible" by default

    Scenario: Option to show project stage filter
        Given I navigate to "Cleve Hill Solar Park" project Overview page
        When I click on "Project application documents" link
        Then all the filter stages should "not be visible" by default
        And I click on "project stage" section
        Then I verify that the "project stage" section expanded with 3 filters
        And I click on "project stage" section
        Then all the filter stages should "not be visible" by default

    Scenario: Option to show document type filter
        Given I navigate to "Cleve Hill Solar Park" project Overview page
        When I click on "Project application documents" link
        Then all the filter stages should "not be visible" by default
        And I click on "document type" section
        Then I verify that the "document type" section expanded with 6 filters
        And I click on "document type" section
        Then all the filter stages should "not be visible" by default

    Scenario: Option to show document type filters including everything else checkbox
        Given I navigate to "Cleve Hill Solar Park" project Overview page
        When I click on "Project application documents" link
        Then all the filter stages should "not be visible" by default
        And I click on "document type" section
        And I select "Everything else (29)" checkbox
        And I click on Apply button to apply filters
        Then I can verify that below project documents were returned
            | Document                                                                                                                                                |
            | 4.3 Book of Reference (PDF, 37KB) Published by Removed 2019-04-24AcceptanceCompulsory Acquisition Information                                           |
            | Rule 6 letter - Notification of the preliminary meeting and matters to be discussed (PDF, 282KB) 2019-04-18Pre ExaminationProcedural Decisions          |
            | NULL (PDF, 149KB) Published by NULL on behalf of Rule 4 Appointment of Panel - 15 March 2019 2019-03-18Pre ExaminationProcedural Decisions              |
            | NULL (PDF, 75KB) Published by NULL on behalf of Regulation 32 - Transboundary Screening 2019-01-28Pre ExaminationTransboundary                          |
            | Section 56 Notification (PDF, 126KB) Published by NULL on behalf of Removed 2018-12-20Pre ExaminationCertificates and Notices                           |
            | NULL (PDF, 92KB) Published by NULL on behalf of Notification of Decision to Accept Application 2018-12-14AcceptanceAcceptance letter                    |
            | Adequacy of Consultation Representation (PDF, 107KB) Published by NULL on behalf of Removed 2018-12-14AcceptanceAdequacy of Consultation Representation |
            | Adequacy of Consultation Representation (PDF, 542KB) Published by NULL on behalf of Removed 2018-12-14AcceptanceAdequacy of Consultation Representation |
            | Adequacy of Consultation Representation (PDF, 185KB) Published by NULL on behalf of Removed 2018-12-14AcceptanceAdequacy of Consultation Representation |
            | Adequacy of Consultation Representation (PDF, 105KB) Published by NULL on behalf of Removed 2018-12-14AcceptanceAdequacy of Consultation Representation |
            | Adequacy of Consultation Representation (PDF, 34KB) Published by NULL on behalf of Removed 2018-12-14AcceptanceAdequacy of Consultation Representation  |
            | NULL (PDF, 242KB) Published by NULL on behalf of Section 55 Checklist 2018-12-14AcceptanceProcedural Decisions                                          |
            | 4.2 Funding Statement (PDF, 864KB) Published by NULL on behalf of Removed 2018-11-23AcceptanceCompulsory Acquisition Information                        |
            | 1.1.1 S55 Checklist (PDF, 429KB) Published by Section 55 Checklist 2018-11-23AcceptanceApplication Form                                                 |
            | 3.2 Explanatory Memorandum (PDF, 422KB) Published by NULL on behalf of Removed 2018-11-23AcceptanceDraft Development Consent Orders                     |
            | 1.3 Guide to the Application (PDF, 285KB) Published by NULL on behalf of Removed 2018-11-23AcceptanceApplication Form                                   |
            | 1.1 Application letter for Cleve Hill Solar Park (PDF, 580KB) Published by NULL on behalf of Removed 2018-11-23AcceptanceApplication Form               |
            | 3.1.1 The Stationary Office Validation (PDF, 97KB) Published by NULL on behalf of Removed 2018-11-23AcceptanceDraft Development Consent Orders          |
            | 1.2 Application Form (PDF, 148KB) Published by NULL on behalf of Removed 2018-11-23AcceptanceApplication Form                                           |
            | 4.1 Statement of Reasons (PDF, 372KB) Published by NULL on behalf of Removed 2018-11-23AcceptanceCompulsory Acquisition Information                     |
        And I click on "document type" section

    Scenario: filter by project stage
        Given I navigate to "Cleve Hill Solar Park" project Overview page
        When I click on "Project application documents" link
        And I click on "project stage" section
        And I select "Pre Application (7)" checkbox
        And I click on Apply button to apply filters
        Then I can verify that below project documents were returned
            | Document                                                                                                                                                                                   |
            | Late scoping consultation response (PDF, 79KB) Published by NULL on behalf of Removed 2018-01-25Pre ApplicationEnvironmental Impact Assessment Scoping                                     |
            | Adopted by the Secretary of State on 19 January 2018 (PDF, 5MB) Published by NULL on behalf of Scoping Opinion 2018-01-19Pre ApplicationEnvironmental Impact Assessment Scoping            |
            | Late scoping consultation response (PDF, 191KB) Published by NULL on behalf of Removed 2018-01-11Pre ApplicationEnvironmental Impact Assessment Scoping                                    |
            | Late scoping consultation response (PDF, 722KB) Published by NULL on behalf of Removed 2018-01-11Pre ApplicationEnvironmental Impact Assessment Scoping                                    |
            | NULL (PDF, 81KB) Published by NULL on behalf of Acknowledgement of S46 Notification 2018-01-06Pre ApplicationNotice of Proposed application                                                |
            | NULL (PDF, 1MB) Published by NULL on behalf of S46 Notification 2018-01-06Pre ApplicationNotice of Proposed application                                                                    |
            | Scoping Report submitted to the Secretary of State on 11 December 2017 (PDF, 38MB) Published by NULL on behalf of Removed 2017-11-12Pre ApplicationEnvironmental Impact Assessment Scoping |
        And I click on "project stage" section

    Scenario: search by text and filter by project stage
        Given I navigate to "Cleve Hill Solar Park" project Overview page
        When I click on "Project application documents" link
        When I enter text "late" into search field
        And I click on search button
        And I click on "project stage" section
        And I select "Pre Application (7)" checkbox
        And I click on Apply button to apply filters
        Then I can verify that below project documents were returned
            | Document                                                                                                                                                |
            | Late scoping consultation response (PDF, 79KB) Published by NULL on behalf of Removed 2018-01-25Pre ApplicationEnvironmental Impact Assessment Scoping  |
            | Late scoping consultation response (PDF, 191KB) Published by NULL on behalf of Removed 2018-01-11Pre ApplicationEnvironmental Impact Assessment Scoping |
            | Late scoping consultation response (PDF, 722KB) Published by NULL on behalf of Removed 2018-01-11Pre ApplicationEnvironmental Impact Assessment Scoping |
        And I click on "project stage" section

    Scenario: filter by project stage and search for text
        Given I navigate to "Cleve Hill Solar Park" project Overview page
        When I click on "Project application documents" link
        And I click on "project stage" section
        And I select "Pre Application (7)" checkbox
        And I click on Apply button to apply filters
        When I enter text "adopt" into search field
        And I click on search button
        Then I can verify that below project documents were returned
            | Document                                                                                                                                                                        |
            | Adopted by the Secretary of State on 19 January 2018 (PDF, 5MB) Published by NULL on behalf of Scoping Opinion 2018-01-19Pre ApplicationEnvironmental Impact Assessment Scoping |
        And I click on "project stage" section

    Scenario: filter by document type
        Given I navigate to "Cleve Hill Solar Park" project Overview page
        When I click on "Project application documents" link
        And I click on "document type" section
        And I select "Environmental Statement (221)" checkbox
        And I click on Apply button to apply filters
        Then I can verify that below project documents were returned
            | Document                                                                                                                                                                       |
            | 6.3.8 Environmental Statement - Photomontage Summer - Year 1 Viewpoint 9 (PDF, 18MB) Published by NULL on behalf of Removed 2018-11-23AcceptanceEnvironmental Statement        |
            | 6.3.8 Environmental Statement - Photomontage Summer - Year 1 Viewpoint 22 North (PDF, 13MB) Published by NULL on behalf of Removed 2018-11-23AcceptanceEnvironmental Statement |
            | 6.3.8 Environmental Statement - Photomontage Summer - Year 1 Viewpoint 12 (PDF, 15MB) Published by NULL on behalf of Removed 2018-11-23AcceptanceEnvironmental Statement       |
            | 6.3.7 Environmental Statement - Photomontage Summer - Existing View Viewpoint 6 (PDF, 29MB) Published by NULL on behalf of Removed 2018-11-23AcceptanceEnvironmental Statement |
            | 6.3.7 Environmental Statement - Photomontage Summer - Existing View Viewpoint 8 (PDF, 28MB) Published by NULL on behalf of Removed 2018-11-23AcceptanceEnvironmental Statement |
            | 6.3.8 Environmental Statement - Photomontage Summer- Year 1 Viewpoint 2 (PDF, 21MB) Published by NULL on behalf of Removed 2018-11-23AcceptanceEnvironmental Statement         |
            | 6.3.7 Environmental Statement - Photomontage Summer - Existing View Viewpoint 9 (PDF, 33MB) Published by NULL on behalf of Removed 2018-11-23AcceptanceEnvironmental Statement |
            | 6.3.8 Environmental Statement - Photomontage Summer - Year 1 Viewpoint 22 South (PDF, 15MB) Published by NULL on behalf of Removed 2018-11-23AcceptanceEnvironmental Statement |
            | 6.3.7 Environmental Statement - Photomontage Summer - Existing View Viewpoint 7 (PDF, 36MB) Published by NULL on behalf of Removed 2018-11-23AcceptanceEnvironmental Statement |
            | 6.3.8 Environmental Statement - Photomontage Year 1 Summer Cover and Contents (PDF, 141KB) Published by NULL on behalf of Removed 2018-11-23AcceptanceEnvironmental Statement  |
            | 6.3.8 Environmental Statement - Photomontage Summer - Year 1 Viewpoint 1 (PDF, 16MB) Published by NULL on behalf of Removed 2018-11-23AcceptanceEnvironmental Statement        |
            | 6.3.8 Environmental Statement - Photomontage Summer - Year 1 Viewpoint 8 (PDF, 24MB) Published by NULL on behalf of Removed 2018-11-23AcceptanceEnvironmental Statement        |
            | 6.3.8 Environmental Statement - Photomontage Summer - Year 1 Viewpoint 3 (PDF, 9MB) Published by NULL on behalf of Removed 2018-11-23AcceptanceEnvironmental Statement         |
            | 6.3.9 Environmental Statement - Photomontage Summer- Year 5 Viewpoint 2 (PDF, 11MB) Published by NULL on behalf of Removed 2018-11-23AcceptanceEnvironmental Statement         |
            | 6.3.9 Environmental Statement - Photomontage Summer - Year 5 Viewpoint 22 North (PDF, 7MB) Published by NULL on behalf of Removed 2018-11-23AcceptanceEnvironmental Statement  |
            | 6.3.9 Environmental Statement - Photomontage Summer - Year 5 Viewpoint 7 (PDF, 11MB) Published by NULL on behalf of Removed 2018-11-23AcceptanceEnvironmental Statement        |
            | 6.3.9 Environmental Statement - Photomontage Summer - Year 5 Viewpoint 4 (PDF, 8MB) Published by NULL on behalf of Removed 2018-11-23AcceptanceEnvironmental Statement         |
            | 6.4 Environmental Statement - Volume 4 Cover and Contents (PDF, 182KB) Published by NULL on behalf of Removed 2018-11-23AcceptanceEnvironmental Statement                      |
            | 6.3.9 Environmental Statement - Photomontage Summer - Year 5 Viewpoint 9 (PDF, 9MB) Published by NULL on behalf of Removed 2018-11-23AcceptanceEnvironmental Statement         |
            | 6.3.9 Environmental Statement - Photomontage Summer - Year 5 Viewpoint 22 South (PDF, 7MB) Published by NULL on behalf of Removed 2018-11-23AcceptanceEnvironmental Statement  |
        And I click on "document type" section

    Scenario: search by text and filter by document type
        Given I navigate to "Cleve Hill Solar Park" project Overview page
        When I click on "Project application documents" link
        When I enter text "late" into search field
        And I click on search button
        And I click on "document type" section
        And I select "Additional Submissions (18)" checkbox
        And I click on Apply button to apply filters
        Then I can verify that below project documents were returned
            | Document                                                                                                                                                                                                                                    |
            | Late Relevant Representation - Additional Submission - Accepted at the discretion of the Examining Authority - Objection to proposed Cleve Hill Solar Park (PDF, 45KB) Published by Removed 2019-03-26Pre ExaminationAdditional Submissions |
        And I click on "document type" section

    Scenario: filter by document type and search for text
        Given I navigate to "Cleve Hill Solar Park" project Overview page
        When I click on "Project application documents" link
        And I click on "document type" section
        And I select "Plans (11)" checkbox
        And I click on Apply button to apply filters
        When I enter text "cover" into search field
        And I click on search button
        Then I can verify that below project documents were returned
            | Document                                                                                           |
            | 2 Cover and Contents (PDF, 168KB) Published by NULL on behalf of Removed 2018-11-23AcceptancePlans |
        And I click on "document type" section

    Scenario: filter by project stage and document type
        Given I navigate to "Cleve Hill Solar Park" project Overview page
        When I click on "Project application documents" link
        And I click on "project stage" section
        And I select "Acceptance (266)" checkbox
        And I click on "document type" section
        And I select "Reports (8)" checkbox
        And I click on Apply button to apply filters
        Then I can verify that below project documents were returned
            | Document                                                                                                                               |
            | 5.1.1b Consultation Report Appendices (PDF, 39MB) Published by NULL on behalf of Removed 2018-11-23AcceptanceReports                   |
            | 5.2 Report to Inform Appropriate Assessment (PDF, 32MB) Published by NULL on behalf of Removed 2018-11-23AcceptanceReports             |
            | 5.4 Grid Connection Statement (PDF, 173KB) Published by NULL on behalf of Removed 2018-11-23AcceptanceReports                          |
            | 5.1 Consultation Report (PDF, 8MB) Published by NULL on behalf of Removed 2018-11-23AcceptanceReports                                  |
            | 5.3 Statutory Nuisances Statement (PDF, 251KB) Published by NULL on behalf of Removed 2018-11-23AcceptanceReports                      |
            | 5.1.1a Consultation Report Appendices (PDF, 35MB) Published by NULL on behalf of Removed 2018-11-23AcceptanceReports                   |
            | 5.2.1 Report to Inform Appropriate Assessment Appendices (PDF, 4MB) Published by NULL on behalf of Removed 2018-11-23AcceptanceReports |
            | 5.1.1c Consultation Report Appendices (PDF, 38MB) Published by NULL on behalf of Removed 2018-11-23AcceptanceReports                   |
        And I click on "project stage" section
        And I click on "document type" section

    Scenario: search by text and filter by project stage and document type
        Given I navigate to "Cleve Hill Solar Park" project Overview page
        When I click on "Project application documents" link
        When I enter text "consult" into search field
        And I click on search button
        And I click on "project stage" section
        And I select "Acceptance (266)" checkbox
        And I click on "document type" section
        And I select "Reports (8)" checkbox
        And I click on Apply button to apply filters
        Then I can verify that below project documents were returned
            | Document                                                                                                             |
            | 5.1.1b Consultation Report Appendices (PDF, 39MB) Published by NULL on behalf of Removed 2018-11-23AcceptanceReports |
            | 5.1 Consultation Report (PDF, 8MB) Published by NULL on behalf of Removed 2018-11-23AcceptanceReports                |
            | 5.1.1a Consultation Report Appendices (PDF, 35MB) Published by NULL on behalf of Removed 2018-11-23AcceptanceReports |
            | 5.1.1c Consultation Report Appendices (PDF, 38MB) Published by NULL on behalf of Removed 2018-11-23AcceptanceReports |
        And I click on "project stage" section
        And I click on "document type" section

    Scenario: filter by project stage and document type and then search by text
        Given I navigate to "Cleve Hill Solar Park" project Overview page
        When I click on "Project application documents" link
        And I click on "project stage" section
        And I select "Acceptance (266)" checkbox
        And I click on "document type" section
        And I select "Reports (8)" checkbox
        And I click on Apply button to apply filters
        When I enter text "grid" into search field
        And I click on search button
        Then I can verify that below project documents were returned
            | Document                                                                                                      |
            | 5.4 Grid Connection Statement (PDF, 173KB) Published by NULL on behalf of Removed 2018-11-23AcceptanceReports |
        And I click on "project stage" section
        And I click on "document type" section
