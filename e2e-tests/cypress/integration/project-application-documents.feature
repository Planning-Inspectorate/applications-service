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
            | Date       | Stage           | Title                 |
            | 22 April 2019 | Pre-application | Material Change - 9   |
            | 21 April 2019 | Pre-application | Material Change - 8   |
            | 20 April 2019 | Pre-application | Material Change - 7   |
            | 19 April 2019 | Pre-application | Material Change - 6   |
            | 18 April 2019 | Pre-application | Material Change - 5   |
            | 17 April 2019 | Pre-application | Material Change - 4   |
            | 16 April 2019 | Pre-application | Material Change - 111 |
            | 16 April 2019 | Pre-application | Material Change - 99  |
            | 16 April 2019 | Pre-application | Material Change - 100 |
            | 16 April 2019 | Pre-application | Material Change - 101 |
            | 16 April 2019 | Pre-application | Material Change - 102 |
            | 16 April 2019 | Pre-application | Material Change - 103 |
            | 16 April 2019 | Pre-application | Material Change - 104 |
            | 16 April 2019 | Pre-application | Material Change - 105 |
            | 16 April 2019 | Pre-application | Material Change - 106 |
            | 16 April 2019 | Pre-application | Material Change - 107 |
            | 16 April 2019 | Pre-application | Material Change - 115 |
            | 16 April 2019 | Pre-application | Material Change - 113 |
            | 16 April 2019 | Pre-application | Material Change - 114 |
            | 16 April 2019 | Pre-application | Material Change - 112 |

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
            | Document                                                                                                                                                                                                                   |
            | AdditionalSubmissionacceptedatthediscretionoftheExaminingAuthorityÃ¢â‚¬â€œAgreedStatementofCommonGroundbetweentheApplicantandPublicHealthEngland(PDF,268KB)FromRemoved23May2019Pre-examinationAdditionalSubmissions |
            | 6.4.8.9 Environmental Statement - Letter of No Impediment Request and Response From Natural England (PDF, 9MB) From NULL on behalf of Removed 23 November 2018Acceptance(Reviewoftheapplication)Environmental Statement                         |
            | 6.4.8.8 Environmental Statement - Natural England Initial Advice DAS (PDF, 246KB) From NULL on behalf of Removed 23 November 2018Acceptance(Reviewoftheapplication)Environmental Statement                                                     |
        When I enter text "" into search field
        And I click on search button
        Then I verify text "Showing 1 to 20 of 297 results" is present on the page

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

    Scenario: Option to show project stage filter
        Given I navigate to "Cleve Hill Solar Park" project Overview page
        When I click on "Documents" link
        Then all the filter stages should "not be visible" by default
        And I click on "project stage" section
        Then I verify that the "project stage" section expanded with 6 filters
        And I click on "project stage" section
        Then all the filter stages should "not be visible" by default

    Scenario: Option to show document type filter
        Given I navigate to "Cleve Hill Solar Park" project Overview page
        When I click on "Documents" link
        Then all the filter stages should "not be visible" by default
        And I click on "document type" section
        Then I verify that the "document type" section expanded with 5 filters
        And I click on "document type" section
        Then all the filter stages should "not be visible" by default

    Scenario: Option to show document type filters including everything else checkbox
        Given I navigate to "Cleve Hill Solar Park" project Overview page
        When I click on "Documents" link
        Then all the filter stages should "not be visible" by default
        And I click on "document type" section
        And I select "Everything else (39)" checkbox
        And I click on Apply button to apply filters
        Then I can verify that below project documents were returned
            | Document                                                                                                                                                |
            | Relevant Representation Exam Library (PDF, 410KB) 13 January 2020Pre-examinationOther Documents                                           |
            | Removed (PDF, 284KB) 28 May 2019Pre-examinationOther Documents                                          |
            | 4.3 Book of Reference (PDF, 37KB) From Removed 24 April 2019Acceptance(Reviewoftheapplication)Compulsory Acquisition Information                                           |
            | Rule 6 letter - Notification of the preliminary meeting and matters to be discussed (PDF, 282KB) 18 April 2019Pre-examinationProcedural Decisions          |
            | NULL (PDF, 149KB) From NULL on behalf of Rule 4 Appointment of Panel - 15 March 2019 18 March 2019Pre-examinationProcedural Decisions              |
            | NULL (PDF, 75KB) From NULL on behalf of Regulation 32 - Transboundary Screening 28 January 2019Pre-examinationTransboundary                          |
            | Section 56 Notification (PDF, 126KB) From NULL on behalf of Removed 20 December 2018Pre-examinationCertificates and Notices                           |
            | NULL (PDF, 92KB) From NULL on behalf of Notification of Decision to Accept Application 14 December 2018Acceptance(Reviewoftheapplication)Acceptance letter                    |
            | Adequacy of Consultation Representation (PDF, 107KB) From NULL on behalf of Removed 14 December 2018Acceptance(Reviewoftheapplication)Adequacy of Consultation Representation |
            | Adequacy of Consultation Representation (PDF, 542KB) From NULL on behalf of Removed 14 December 2018Acceptance(Reviewoftheapplication)Adequacy of Consultation Representation |
            | Adequacy of Consultation Representation (PDF, 185KB) From NULL on behalf of Removed 14 December 2018Acceptance(Reviewoftheapplication)Adequacy of Consultation Representation |
            | Adequacy of Consultation Representation (PDF, 105KB) From NULL on behalf of Removed 14 December 2018Acceptance(Reviewoftheapplication)Adequacy of Consultation Representation |
            | Adequacy of Consultation Representation (PDF, 34KB) From NULL on behalf of Removed 14 December 2018Acceptance(Reviewoftheapplication)Adequacy of Consultation Representation  |
            | NULL (PDF, 242KB) From NULL on behalf of Section 55 Checklist 14 December 2018Acceptance(Reviewoftheapplication)Procedural Decisions                                          |
            | NULL (PDF,130KB) From NULL on behalf of Section 51 advice to the Applicant 14 December 2018Acceptance(Reviewoftheapplication) OtherDocuments                        |
            | 7.7 Heritage Statement (PDF,249KB) From NULL on behalf of Removed 23 November 2018Acceptance(Reviewoftheapplication) OtherDocuments                        |
            | 1.1.1 S55 Checklist (PDF, 429KB) From Section 55 Checklist 23 November 2018Acceptance(Reviewoftheapplication)Application Form                                                 |
            | 7.3 Needs Statement (PDF,997KB) From NULL on behalf of Removed 23 November 2018Acceptance(Reviewoftheapplication) OtherDocuments                     |
            | 7.5 Consents and Licenses Required Under Other Legislation (PDF, 241KB) From NULL on behalf of Removed 23 November 2018Acceptance(Review of the application) Other Documents                                    |
            | 7.1 Outline Design Principles (PDF, 3MB) From NULL on behalf of Removed 23 November 2018Acceptance(Review of the application) Other Documents               |
        And I click on "document type" section

    Scenario: filter by project stage
        Given I navigate to "Cleve Hill Solar Park" project Overview page
        When I click on "Documents" link
        And I click on "project stage" section
        And I select "Pre-application (7)" checkbox
        And I click on Apply button to apply filters
        Then I can verify that below project documents were returned
            | Document                                                                                                                                                                                   |
            | Late scoping consultation response (PDF, 79KB) From NULL on behalf of Removed 25 January 2018Pre-applicationEnvironmental Impact Assessment Scoping                                     |
            | Adopted by the Secretary of State on 19 January 2018 (PDF, 5MB) From NULL on behalf of Scoping Opinion 19 January 2018Pre-applicationEnvironmental Impact Assessment Scoping            |
            | Late scoping consultation response (PDF, 191KB) From NULL on behalf of Removed 11 January 2018Pre-applicationEnvironmental Impact Assessment Scoping                                    |
            | Late scoping consultation response (PDF, 722KB) From NULL on behalf of Removed 11 January 2018Pre-applicationEnvironmental Impact Assessment Scoping                                    |
            | NULL (PDF, 81KB) From NULL on behalf of Acknowledgement of S46 Notification 6 January 2018Pre-applicationNotice of Proposed application                                                |
            | NULL (PDF, 1MB) From NULL on behalf of S46 Notification 6 January 2018Pre-applicationNotice of Proposed application                                                                    |
            | Scoping Report submitted to the Secretary of State on 11 December 2017 (PDF, 38MB) From NULL on behalf of Removed 12 November 2017Pre-applicationEnvironmental Impact Assessment Scoping |
        And I click on "project stage" section

    Scenario: search by text and filter by project stage
        Given I navigate to "Cleve Hill Solar Park" project Overview page
        When I click on "Documents" link
        When I enter text "late" into search field
        And I click on search button
        And I click on "project stage" section
        And I select "Pre-application (7)" checkbox
        And I click on Apply button to apply filters
        Then I can verify that below project documents were returned
            | Document                                                                                                                                                |
            | Late scoping consultation response (PDF, 79KB) From NULL on behalf of Removed 25 January 2018Pre-applicationEnvironmental Impact Assessment Scoping  |
            | Late scoping consultation response (PDF, 191KB) From NULL on behalf of Removed 11 January 2018Pre-applicationEnvironmental Impact Assessment Scoping |
            | Late scoping consultation response (PDF, 722KB) From NULL on behalf of Removed 11 January 2018Pre-applicationEnvironmental Impact Assessment Scoping |
        And I click on "project stage" section

    Scenario: filter by project stage and search for text
        Given I navigate to "Cleve Hill Solar Park" project Overview page
        When I click on "Documents" link
        And I click on "project stage" section
        And I select "Pre-application (7)" checkbox
        And I click on Apply button to apply filters
        When I enter text "adopt" into search field
        And I click on search button
        Then I can verify that below project documents were returned
            | Document                                                                                                                                                                        |
            | Adopted by the Secretary of State on 19 January 2018 (PDF, 5MB) From NULL on behalf of Scoping Opinion 19 January 2018Pre-applicationEnvironmental Impact Assessment Scoping |
        And I click on "project stage" section

    Scenario: filter by document type
        Given I navigate to "Cleve Hill Solar Park" project Overview page
        When I click on "Documents" link
        And I click on "document type" section
        And I select "Environmental Statement (221)" checkbox
        And I click on Apply button to apply filters
        Then I can verify that below project documents were returned
            | Document                                                                                                                                                                       |
            | 6.3.8 Environmental Statement - Photomontage Summer - Year 1 Viewpoint 9 (PDF, 18MB) From NULL on behalf of Removed 23 November 2018Acceptance(Reviewoftheapplication)Environmental Statement       |
            | 6.3.8 Environmental Statement - Photomontage Summer - Year 1 Viewpoint 22 North (PDF, 13MB) From NULL on behalf of Removed 23 November 2018Acceptance(Reviewoftheapplication)Environmental Statement|
            | 6.3.8 Environmental Statement - Photomontage Summer - Year 1 Viewpoint 12 (PDF, 15MB) From NULL on behalf of Removed 23 November 2018Acceptance(Reviewoftheapplication)Environmental Statement      |
            | 6.3.7 Environmental Statement - Photomontage Summer - Existing View Viewpoint 6 (PDF, 29MB) From NULL on behalf of Removed 23 November 2018Acceptance(Reviewoftheapplication)Environmental Statement|
            | 6.3.7 Environmental Statement - Photomontage Summer - Existing View Viewpoint 8 (PDF, 28MB) From NULL on behalf of Removed 23 November 2018Acceptance(Reviewoftheapplication)Environmental Statement|
            | 6.3.8 Environmental Statement - Photomontage Summer- Year 1 Viewpoint 2 (PDF, 21MB) From NULL on behalf of Removed 23 November 2018Acceptance(Reviewoftheapplication)Environmental Statement        |
            | 6.3.7 Environmental Statement - Photomontage Summer - Existing View Viewpoint 9 (PDF, 33MB) From NULL on behalf of Removed 23 November 2018Acceptance(Reviewoftheapplication)Environmental Statement|
            | 6.3.8 Environmental Statement - Photomontage Summer - Year 1 Viewpoint 22 South (PDF, 15MB) From NULL on behalf of Removed 23 November 2018Acceptance(Reviewoftheapplication)Environmental Statement|
            | 6.3.7 Environmental Statement - Photomontage Summer - Existing View Viewpoint 7 (PDF, 36MB) From NULL on behalf of Removed 23 November 2018Acceptance(Reviewoftheapplication)Environmental Statement|
            | 6.3.8 Environmental Statement - Photomontage Year 1 Summer Cover and Contents (PDF, 141KB) From NULL on behalf of Removed 23 November 2018Acceptance(Reviewoftheapplication)Environmental Statement |
            | 6.3.8 Environmental Statement - Photomontage Summer - Year 1 Viewpoint 1 (PDF, 16MB) From NULL on behalf of Removed 23 November 2018Acceptance(Reviewoftheapplication)Environmental Statement       |
            | 6.3.8 Environmental Statement - Photomontage Summer - Year 1 Viewpoint 8 (PDF, 24MB) From NULL on behalf of Removed 23 November 2018Acceptance(Reviewoftheapplication)Environmental Statement       |
            | 6.3.8 Environmental Statement - Photomontage Summer - Year 1 Viewpoint 3 (PDF, 9MB) From NULL on behalf of Removed 23 November 2018Acceptance(Reviewoftheapplication)Environmental Statement        |
            | 6.3.9 Environmental Statement - Photomontage Summer- Year 5 Viewpoint 2 (PDF, 11MB) From NULL on behalf of Removed 23 November 2018Acceptance(Reviewoftheapplication)Environmental Statement        |
            | 6.3.9 Environmental Statement - Photomontage Summer - Year 5 Viewpoint 22 North (PDF, 7MB) From NULL on behalf of Removed 23 November 2018Acceptance(Reviewoftheapplication)Environmental Statement |
            | 6.3.9 Environmental Statement - Photomontage Summer - Year 5 Viewpoint 7 (PDF, 11MB) From NULL on behalf of Removed 23 November 2018Acceptance(Reviewoftheapplication)Environmental Statement       |
            | 6.3.9 Environmental Statement - Photomontage Summer - Year 5 Viewpoint 4 (PDF, 8MB) From NULL on behalf of Removed 23 November 2018Acceptance(Reviewoftheapplication)Environmental Statement        |
            | 6.4 Environmental Statement - Volume 4 Cover and Contents (PDF, 182KB) From NULL on behalf of Removed 23 November 2018Acceptance(Reviewoftheapplication)Environmental Statement                     |
            | 6.3.9 Environmental Statement - Photomontage Summer - Year 5 Viewpoint 9 (PDF, 9MB) From NULL on behalf of Removed 23 November 2018Acceptance(Reviewoftheapplication)Environmental Statement        |
            | 6.3.9 Environmental Statement - Photomontage Summer - Year 5 Viewpoint 22 South (PDF, 7MB) From NULL on behalf of Removed 23 November 2018Acceptance(Reviewoftheapplication)Environmental Statement |
        And I click on "document type" section

    Scenario: search by text and filter by document type
        Given I navigate to "Cleve Hill Solar Park" project Overview page
        When I click on "Documents" link
        When I enter text "late" into search field
        And I click on search button
        And I click on "document type" section
        And I select "Additional Submissions (18)" checkbox
        And I click on Apply button to apply filters
        Then I can verify that below project documents were returned
            | Document                                                                                                                                                                                                                                    |
            | Late Relevant Representation - Additional Submission - Accepted at the discretion of the Examining Authority - Objection to proposed Cleve Hill Solar Park (PDF, 45KB) From Removed 26 March 2019Pre-examinationAdditional Submissions |
        And I click on "document type" section

    Scenario: filter by document type and search for text
        Given I navigate to "Cleve Hill Solar Park" project Overview page
        When I click on "Documents" link
        And I click on "document type" section
        And I select "Plans (11)" checkbox
        And I click on Apply button to apply filters
        When I enter text "cover" into search field
        And I click on search button
        Then I can verify that below project documents were returned
            | Document                                                                                           |
            | 2 Cover and Contents (PDF, 168KB) From NULL on behalf of Removed 23 November 2018Acceptance(Reviewoftheapplication)Plans |
        And I click on "document type" section

    Scenario: filter by project stage and document type
        Given I navigate to "Cleve Hill Solar Park" project Overview page
        When I click on "Documents" link
        And I click on "project stage" section
        And I select "Acceptance (review of the application)" checkbox
        And I click on "document type" section
        And I select "Reports (8)" checkbox
        And I click on Apply button to apply filters
        Then I can verify that below project documents were returned
            | Document                                                                                                                               |
            | 5.1.1b Consultation Report Appendices (PDF, 39MB) From NULL on behalf of Removed 23 November 2018Acceptance(Reviewoftheapplication)Reports                   |
            | 5.2 Report to Inform Appropriate Assessment (PDF, 32MB) From NULL on behalf of Removed 23 November 2018Acceptance(Reviewoftheapplication)Reports             |
            | 5.4 Grid Connection Statement (PDF, 173KB) From NULL on behalf of Removed 23 November 2018Acceptance(Reviewoftheapplication)Reports                          |
            | 5.1 Consultation Report (PDF, 8MB) From NULL on behalf of Removed 23 November 2018Acceptance(Reviewoftheapplication)Reports                                  |
            | 5.3 Statutory Nuisances Statement (PDF, 251KB) From NULL on behalf of Removed 23 November 2018Acceptance(Reviewoftheapplication)Reports                      |
            | 5.1.1a Consultation Report Appendices (PDF, 35MB) From NULL on behalf of Removed 23 November 2018Acceptance(Reviewoftheapplication)Reports                   |
            | 5.2.1 Report to Inform Appropriate Assessment Appendices (PDF, 4MB) From NULL on behalf of Removed 23 November 2018Acceptance(Reviewoftheapplication)Reports |
            | 5.1.1c Consultation Report Appendices (PDF, 38MB) From NULL on behalf of Removed 23 November 2018Acceptance(Reviewoftheapplication)Reports                   |
        And I click on "project stage" section
        And I click on "document type" section

    Scenario: search by text and filter by project stage and document type
        Given I navigate to "Cleve Hill Solar Park" project Overview page
        When I click on "Documents" link
        When I enter text "consult" into search field
        And I click on search button
        And I click on "project stage" section
        And I select "Acceptance (review of the application)" checkbox
        And I click on "document type" section
        And I select "Reports (8)" checkbox
        And I click on Apply button to apply filters
        Then I can verify that below project documents were returned
            | Document                                                                                                             |
            | 5.1.1b Consultation Report Appendices (PDF, 39MB) From NULL on behalf of Removed 23 November 2018Acceptance(Reviewoftheapplication)Reports |
            | 5.1 Consultation Report (PDF, 8MB) From NULL on behalf of Removed 23 November 2018Acceptance(Reviewoftheapplication)Reports                |
            | 5.1.1a Consultation Report Appendices (PDF, 35MB) From NULL on behalf of Removed 23 November 2018Acceptance(Reviewoftheapplication)Reports |
            | 5.1.1c Consultation Report Appendices (PDF, 38MB) From NULL on behalf of Removed 23 November 2018Acceptance(Reviewoftheapplication)Reports |
        And I click on "project stage" section
        And I click on "document type" section

    Scenario: filter by project stage and document type and then search by text
        Given I navigate to "Cleve Hill Solar Park" project Overview page
        When I click on "Documents" link
        And I click on "project stage" section
        And I select "Acceptance (review of the application)" checkbox
        And I click on "document type" section
        And I select "Reports (8)" checkbox
        And I click on Apply button to apply filters
        When I enter text "grid" into search field
        And I click on search button
        Then I can verify that below project documents were returned
            | Document                                                                                                      |
            | 5.4 Grid Connection Statement (PDF, 173KB) From NULL on behalf of Removed 23 November 2018Acceptance(Reviewoftheapplication)Reports |
        And I click on "project stage" section
        And I click on "document type" section
