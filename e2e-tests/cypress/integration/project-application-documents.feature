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
        Given I navigate to "Hinkley Point C New Nuclear Power Station Material Change 1" project Overview page
        When I click on "Project application documents" link
        When I enter text "consultee" into search field
        And I click on search button
        Then I can verify that below project documents were returned
            | Document                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
            | \n            \n              Consultee List sent to the Secretary of State (, 0Bytes)\n            \n            \n              \n                Published by EDF Energy\n              \n            \n            \n              \n                2019-04-16\n              \n              \n                Pre Application\n              \n              \n                Material Change\n              \n            \n                                   |
            | \n            \n              Response to Consultee Consent Letter (, 0Bytes)\n            \n            \n              \n                Published by Department for Business, Energy & Industrial Strategy\n              \n            \n            \n              \n                2019-04-16\n              \n              \n                Pre Application\n              \n              \n                Material Change\n              \n            \n |
        When I enter text "" into search field
        And I click on search button
        Then I verify text "Showing 1 to 20 of 152 results" is present on the page


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

