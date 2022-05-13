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
        Then I verify that no documents found text displayed on the page

    Scenario: search returns matching documents
        Given I navigate to "Cleve Hill Solar Park" project Overview page
        When I click on "Project application documents" link
        When I enter text "england" into search field
        And I click on search button
        Then I can verify that below project documents were returned
            | Document                                                                                                                                                                                                                                                                                   |
            | Additional Submission Ã¢â‚¬â€œ Accepted at the discretion of the Examining Authority - Signed Statement of Common Ground between the Applicant and Natural England. (PDF, 846KB) Published by Removed2019-12-11ExaminationAdditional Submissions                                           |
            | Deadline 4 Submission - 12.2.4 - Statement of Common Ground between the Applicant and Natural England (PDF, 403KB) Published by Removed 2019-09-03ExaminationDeadline 4                                                                                                                    |
            | Deadline 4 Submission - 12.2.3 - Statement of Common Ground between the Applicant and Historic England (PDF, 197KB) Published by Removed 2019-09-03ExaminationDeadline 4                                                                                                                   |
            | Deadline 2 Submission - 10.3.4 Updated Statement of Common Ground between the Applicant and Historic England (PDF, 283KB) Published by Removed 2019-06-28ExaminationDeadline 2                                                                                                             |
            | Additional Submission accepted at the discretion of the Examining Authority Ã¢â‚¬â€œ Agreed Statement of Common Ground between the Applicant and Public Health England (PDF, 268KB) Published by Removed 2019-05-23Pre ExaminationAdditional Submissions                                   |
            | Deadline 3 Submission - 11.4.9 Letters of no Impediment to the Applicant from Natural England (PDF, 470KB) Published by Removed 2019-02-08ExaminationDeadline 3                                                                                                                            |
            | Deadline 3 Submission - A statement on Climate Change and Carbon Sequestration, supported by a partial transcript of evidence given by the Chairman of Natural England to the Environmental Audit Committee on 23rd July (PDF, 580KB) Published by Removed 2019-02-08ExaminationDeadline 3 |
            | 6.4.8.9 Environmental Statement - Letter of No Impediment Request and Response From Natural England (PDF, 9MB) Published by NULL on behalf of Removed 2018-11-23AcceptanceEnvironmental Statement                                                                                          |
            | 6.4.8.8 Environmental Statement - Natural England Initial Advice DAS (PDF, 246KB) Published by NULL on behalf of Removed 2018-11-23AcceptanceEnvironmental Statement                                                                                                                       |
        When I enter text "" into search field
        And I click on search button
        Then I verify text "Showing 1 to 20 of 987 results" is present on the page


    Scenario: search returns no matching documents
        Given I navigate to "Hinkley Point C New Nuclear Power Station Material Change 1" project Overview page
        When I click on "Project application documents" link
        When I enter text "search" into search field
        And I click on search button
        Then I can verify that no documents were found matching your search terms text
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
    And I click on "hide all" sections
    Then all the filter stages should "not be visible" by default

    Scenario: Option to show project stage filter
        Given I navigate to "Cleve Hill Solar Park" project Overview page
        When I click on "Project application documents" link
        Then all the filter stages should "not be visible" by default
        And I click on "project stage" section
        Then I verify that the "project stage" section expanded with 7 filters
        And I click on "project stage" section
        Then all the filter stages should "not be visible" by default

    Scenario: Option to show project type filter
        Given I navigate to "Cleve Hill Solar Park" project Overview page
        When I click on "Project application documents" link
        Then all the filter stages should "not be visible" by default
        And I click on "project type" section
        Then I verify that the "project type" section expanded with 5 filters
        And I click on "project type" section
        Then all the filter stages should "not be visible" by default

    Scenario: Option to show everything else filter
        Given I navigate to "Cleve Hill Solar Park" project Overview page
        When I click on "Project application documents" link
        Then all the filter stages should "not be visible" by default
        And I click on "everything else" section
        Then I verify that the "everything else" section expanded with 38 filters
        And I click on "everything else" section
        Then all the filter stages should "not be visible" by default

    Scenario: filter by project stage
        Given I navigate to "Cleve Hill Solar Park" project Overview page
        When I click on "Project application documents" link
        And I click on "project stage" section
        And I select "Pre Application (7)" checkbox
        And I click on Apply filters button
        Then I can verify that below project documents were returned
            | Document                                                                                                                                                                                   |
            | Late scoping consultation response (PDF, 79KB) Published by NULL on behalf of Removed 2018-01-25Pre ApplicationEnvironmental Impact Assessment Scoping                                     |
            | Adopted by the Secretary of State on 19 January 2018 (PDF, 5MB) Published by NULL on behalf of Scoping Opinion 2018-01-19Pre ApplicationEnvironmental Impact Assessment Scoping            |
            | Late scoping consultation response (PDF, 191KB) Published by NULL on behalf of Removed 2018-01-11Pre ApplicationEnvironmental Impact Assessment Scoping                                    |
            | Late scoping consultation response (PDF, 722KB) Published by NULL on behalf of Removed 2018-01-11Pre ApplicationEnvironmental Impact Assessment Scoping                                    |
            | NULL (PDF, 81KB) Published by NULL on behalf of Acknowledgement of S46 Notification 2018-01-06Pre ApplicationNotice of Proposed application                                                |
            | NULL (PDF, 1MB) Published by NULL on behalf of S46 Notification 2018-01-06Pre ApplicationNotice of Proposed application                                                                    |
            | Scoping Report submitted to the Secretary of State on 11 December 2017 (PDF, 38MB) Published by NULL on behalf of Removed 2017-11-12Pre ApplicationEnvironmental Impact Assessment Scoping |


    Scenario: search by text and filter by project stage
        Given I navigate to "Cleve Hill Solar Park" project Overview page
        When I click on "Project application documents" link
        When I enter text "late" into search field
        And I click on search button
        And I select "Pre Application (7)" checkbox
        And I click on Apply filters button
        Then I can verify that below project documents were returned
            | Document                                                                                                                                                |
            | Late scoping consultation response (PDF, 79KB) Published by NULL on behalf of Removed 2018-01-25Pre ApplicationEnvironmental Impact Assessment Scoping  |
            | Late scoping consultation response (PDF, 191KB) Published by NULL on behalf of Removed 2018-01-11Pre ApplicationEnvironmental Impact Assessment Scoping |
            | Late scoping consultation response (PDF, 722KB) Published by NULL on behalf of Removed 2018-01-11Pre ApplicationEnvironmental Impact Assessment Scoping |

    # Scenario: filter by project stage and search for text

    Scenario: filter by project type
        Given I navigate to "Cleve Hill Solar Park" project Overview page
        When I click on "Project application documents" link
        And I click on "project type" section
        And I select "Deadline 4 (72)" checkbox
        And I click on Apply filters button
        Then I can verify that below project documents were returned
            | Document                                                                                                                                                                                                                                              |
            | Deadline 4 Submission Ã¢â‚¬â€œ Late submission accepted at the discretion of the Examining Authority Ã¢â‚¬â€œ Response to the Examining AuthorityÃ¢â‚¬â„¢s Further Written Questions (PDF, 15KB) Published by Removed 2019-09-04ExaminationDeadline 4 |
            | Deadline 4 Submission - Response to Examining Authority's Further Written Questions and comments on the Development Consent Order (PDF, 439KB) Published by Removed 2019-09-03ExaminationDeadline 4                                                   |
            | Deadline 4 Submission - 12.5.4 - Deadline 4 Submissions - Schedule of Changes to the DDCO at Deadline 4 (PDF, 317KB) Published by Removed 2019-09-03ExaminationDeadline 4                                                                             |
            | Deadline 4 Submission - 6.4.14.1 - Updates to existing documents outline Construction Traffic Management Plan (Tracked) (PDF, 12MB) Published by Removed 2019-09-03ExaminationDeadline 4                                                              |
            | Deadline 4 Submission - 6.4.12.10 - Outline Special Protection Area - Construction Noise Management Plan (Tracked) (PDF, 14MB) Published by Removed 2019-09-03ExaminationDeadline 4                                                                   |
            | Deadline 4 Submission - 6.4.5.2 - Updates to existing documents outline Landscape and Biodiversity Management Plan (PDF, 6MB) Published by Removed 2019-09-03ExaminationDeadline 4                                                                    |
            | Deadline 4 Submission - 6.4.14.1 - Updates to existing documents outline Construction Traffic Management Plan (PDF, 12MB) Published by Removed 2019-09-03ExaminationDeadline 4                                                                        |
            | Deadline 4 Submission - 6.4.5.2 - Updates to existing documents outline Landscape and Biodiversity Management Plan (Tracked) (PDF, 6MB) Published by Removed 2019-09-03ExaminationDeadline 4                                                          |
            | Deadline 4 Submission - 4.3 - Book of Reference (PDF, 34KB) Published by Removed 2019-09-03ExaminationDeadline 4                                                                                                                                      |
            | Deadline 4 Submission - 7.1 - Updated to existing documents outline Design Principles (PDF, 7MB) Published by Removed 2019-09-03ExaminationDeadline 4                                                                                                 |
            | Deadline 4 Submission - 7.2 - Updates to Existing Documents - Mitigation Schedule (PDF, 179KB) Published by Removed 2019-09-03ExaminationDeadline 4                                                                                                   |
            | Deadline 4 Submission - 6.4.5.4 - Updates to existing documents outline Construction Environmental Management Plan (PDF, 8MB) Published by Removed 2019-09-03ExaminationDeadline 4                                                                    |
            | Deadline 4 Submission - 6.4.11.4 - Updates to existing documents outline Written Scheme of Investigation (Tracked) (PDF, 7MB) Published by Removed 2019-09-03ExaminationDeadline 4                                                                    |
            | Deadline 4 Submission - 6.4.5.4 - Updates to existing documents outline Construction Environmental Management Plan (Tracked) (PDF, 8MB) Published by Removed 2019-09-03ExaminationDeadline 4                                                          |
            | Deadline 4 Submission - 6.4.11.4 - Updates to existing documents outline Written Scheme of Investigation (PDF, 7MB) Published by Removed 2019-09-03ExaminationDeadline 4                                                                              |
            | Deadline 4 Submission - 12.5.3 - Deadline 4 Submissions - Outline Skills , Supply Chain and Employment Plan (PDF, 158KB) Published by Removed 2019-09-03ExaminationDeadline 4                                                                         |
            | Deadline 4 Submission - 12.5.9 - Deadline 4 Submissions - Written Representation by the Applicant - Push/Pull Test Report (PDF, 9MB) Published by Removed 2019-09-03ExaminationDeadline 4                                                             |
            | Deadline 4 Submission - 12.5.7 - Deadline 4 Submissions - Written Representation by the Applicant - Air Quality Assessment - Battery Fire (PDF, 7MB) Published by Removed 2019-09-03ExaminationDeadline 4                                             |
            | Deadline 4 Submission - 12.5.2 - Deadline 4 Submissions - Written Representation by the Applicant on Arbitration (PDF, 137KB) Published by Removed 2019-09-03ExaminationDeadline 4                                                                    |
            | Deadline 4 Submission - Response to Examining Authority's Further Written Questions (PDF, 3MB) Published by Removed 2019-09-03ExaminationDeadline 4                                                                                                   |


    Scenario: search by text and filter by project type
        Given I navigate to "Cleve Hill Solar Park" project Overview page
        When I click on "Project application documents" link
        When I enter text "late" into search field
        And I click on search button
        And I select "Deadline 2 (115)" checkbox
        And I click on Apply filters button
        Then I can verify that below project documents were returned
            | Document                                                                                                                                                                                                  |
            | Deadline 2 Submission Ã¢â‚¬â€œ Late submission accepted at the discretion of the Examining Authority - Summary of Written Representation (PDF, 40KB) Published by Removed 2019-07-16ExaminationDeadline 2 |

    # Scenario: filter by project type and search for text

    # failing
    Scenario: filter by everything else
        Given I navigate to "Cleve Hill Solar Park" project Overview page
        When I click on "Project application documents" link
        And I click on "everything else" section
        And I select "Unaccompanied Site Inspection (7)" checkbox
        And I click on Apply filters button
        Then I can verify that below project documents were returned
            | Document                                                                                                                                                                                                                                              |
            | Deadline 4 Submission Ã¢â‚¬â€œ Late submission accepted at the discretion of the Examining Authority Ã¢â‚¬â€œ Response to the Examining AuthorityÃ¢â‚¬â„¢s Further Written Questions (PDF, 15KB) Published by Removed 2019-09-04ExaminationDeadline 4 |
            | Deadline 4 Submission - Response to Examining Authority's Further Written Questions and comments on the Development Consent Order (PDF, 439KB) Published by Removed 2019-09-03ExaminationDeadline 4                                                   |
            | Deadline 4 Submission - 12.5.4 - Deadline 4 Submissions - Schedule of Changes to the DDCO at Deadline 4 (PDF, 317KB) Published by Removed 2019-09-03ExaminationDeadline 4                                                                             |
            | Deadline 4 Submission - 6.4.14.1 - Updates to existing documents outline Construction Traffic Management Plan (Tracked) (PDF, 12MB) Published by Removed 2019-09-03ExaminationDeadline 4                                                              |
            | Deadline 4 Submission - 6.4.12.10 - Outline Special Protection Area - Construction Noise Management Plan (Tracked) (PDF, 14MB) Published by Removed 2019-09-03ExaminationDeadline 4                                                                   |
            | Deadline 4 Submission - 6.4.5.2 - Updates to existing documents outline Landscape and Biodiversity Management Plan (PDF, 6MB) Published by Removed 2019-09-03ExaminationDeadline 4                                                                    |
            | Deadline 4 Submission - 6.4.14.1 - Updates to existing documents outline Construction Traffic Management Plan (PDF, 12MB) Published by Removed 2019-09-03ExaminationDeadline 4                                                                        |
            | Deadline 4 Submission - 6.4.5.2 - Updates to existing documents outline Landscape and Biodiversity Management Plan (Tracked) (PDF, 6MB) Published by Removed 2019-09-03ExaminationDeadline 4                                                          |
            | Deadline 4 Submission - 4.3 - Book of Reference (PDF, 34KB) Published by Removed 2019-09-03ExaminationDeadline 4                                                                                                                                      |
            | Deadline 4 Submission - 7.1 - Updated to existing documents outline Design Principles (PDF, 7MB) Published by Removed 2019-09-03ExaminationDeadline 4                                                                                                 |
            | Deadline 4 Submission - 7.2 - Updates to Existing Documents - Mitigation Schedule (PDF, 179KB) Published by Removed 2019-09-03ExaminationDeadline 4                                                                                                   |
            | Deadline 4 Submission - 6.4.5.4 - Updates to existing documents outline Construction Environmental Management Plan (PDF, 8MB) Published by Removed 2019-09-03ExaminationDeadline 4                                                                    |
            | Deadline 4 Submission - 6.4.11.4 - Updates to existing documents outline Written Scheme of Investigation (Tracked) (PDF, 7MB) Published by Removed 2019-09-03ExaminationDeadline 4                                                                    |
            | Deadline 4 Submission - 6.4.5.4 - Updates to existing documents outline Construction Environmental Management Plan (Tracked) (PDF, 8MB) Published by Removed 2019-09-03ExaminationDeadline 4                                                          |
            | Deadline 4 Submission - 6.4.11.4 - Updates to existing documents outline Written Scheme of Investigation (PDF, 7MB) Published by Removed 2019-09-03ExaminationDeadline 4                                                                              |
            | Deadline 4 Submission - 12.5.3 - Deadline 4 Submissions - Outline Skills , Supply Chain and Employment Plan (PDF, 158KB) Published by Removed 2019-09-03ExaminationDeadline 4                                                                         |
            | Deadline 4 Submission - 12.5.9 - Deadline 4 Submissions - Written Representation by the Applicant - Push/Pull Test Report (PDF, 9MB) Published by Removed 2019-09-03ExaminationDeadline 4                                                             |
            | Deadline 4 Submission - 12.5.7 - Deadline 4 Submissions - Written Representation by the Applicant - Air Quality Assessment - Battery Fire (PDF, 7MB) Published by Removed 2019-09-03ExaminationDeadline 4                                             |
            | Deadline 4 Submission - 12.5.2 - Deadline 4 Submissions - Written Representation by the Applicant on Arbitration (PDF, 137KB) Published by Removed 2019-09-03ExaminationDeadline 4                                                                    |
            | Deadline 4 Submission - Response to Examining Authority's Further Written Questions (PDF, 3MB) Published by Removed 2019-09-03ExaminationDeadline 4                                                                                                   |

    # failing
    Scenario: search by text and filter by everything else
        Given I navigate to "Cleve Hill Solar Park" project Overview page
        When I click on "Project application documents" link
        When I enter text "late" into search field
        And I click on search button
        And I select "Unaccompanied Site Inspection (7)" checkbox
        And I click on Apply filters button
        Then I can verify that below project documents were returned
            | Document                                                                                                                                                                                                  |
            | Deadline 2 Submission Ã¢â‚¬â€œ Late submission accepted at the discretion of the Examining Authority - Summary of Written Representation (PDF, 40KB) Published by Removed 2019-07-16ExaminationDeadline 2 |

    # Scenario: filter by everything else and search for text