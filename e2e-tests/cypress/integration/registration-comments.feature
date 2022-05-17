@testSuite
Feature: Registration comments page
    As a Test user
    I want to navigate to Registration comments page
    So that I can verify the functionality

    Scenario: Registration comments available for project
        Given I navigate to "Hinkley Point C New Nuclear Power Station Material Change 1" project Overview page
        When I click on "Registration comments" link
        Then I can verify that the registration comments displayed in descending order
            | Date             | Stage                                  |
            | 22 February 2021 | Members of the Public/Businesses - 22  |
            | 21 February 2021 | Members of the Public/Businesses - 21  |
            | 20 February 2021 | Members of the Public/Businesses - 20  |
            | 19 February 2021 | Members of the Public/Businesses - 141 |
            | 19 February 2021 | Members of the Public/Businesses - 130 |
            | 19 February 2021 | Members of the Public/Businesses - 131 |
            | 19 February 2021 | Members of the Public/Businesses - 132 |
            | 19 February 2021 | Members of the Public/Businesses - 133 |
            | 19 February 2021 | Members of the Public/Businesses - 134 |
            | 19 February 2021 | Members of the Public/Businesses - 135 |
            | 19 February 2021 | Members of the Public/Businesses - 136 |
            | 19 February 2021 | Members of the Public/Businesses - 137 |
            | 19 February 2021 | Members of the Public/Businesses - 138 |
            | 19 February 2021 | Members of the Public/Businesses - 139 |
            | 19 February 2021 | Members of the Public/Businesses - 140 |
            | 19 February 2021 | Members of the Public/Businesses - 152 |
            | 19 February 2021 | Members of the Public/Businesses - 149 |
            | 19 February 2021 | Members of the Public/Businesses - 150 |
            | 19 February 2021 | Members of the Public/Businesses - 151 |
            | 19 February 2021 | Members of the Public/Businesses - 148 |

    Scenario: No Registration comments available for project
        Given I navigate to "Cleve Hill Solar Park" project Overview page
        When I click on "Registration comments" link
        Then I verify no registration comments text present on the page

    Scenario: Do not show pagination links for 20 registration comments or less
        Given I navigate to "Ho Ho Hooo" project Overview page
        When I click on "Registration comments" link
        Then I verify no pagination is present on the page

    Scenario: Show pagination links for more than 20 registration comments, previous link not displayed on first page, next link not displayed on last page and ellipsis
        Given I navigate to "Hinkley Point C New Nuclear Power Station Material Change 1" project Overview page
        When I click on "Registration comments" link
        Then I verify below pagination is present on the page
            | Data              |
            | 1                 |
            | 2                 |
            | 3                 |
            | ...               |
            | 11                |
            | Next set of pages |
        Then I verify text "Showing 1 to 20 of 204 results" is present on the page
        Then I verify that only "20" results present on each page
        When I navigate to page "11" of the results
        Then I verify below pagination is present on the page
            | Data                  |
            | Previous set of pages |
            | 1                     |
            | ...                   |
            | 9                     |
            | 10                    |
            | 11                    |
        Then I verify text "Showing 201 to 204 of 204 results" is present on the page
        Then I verify that only "4" results present on each page

    Scenario: When current page within first three, show only those page links and When current page within last three, show only those page links
        Given I navigate to "Hinkley Point C New Nuclear Power Station Material Change 1" project Overview page
        When I click on "Registration comments" link
        When I navigate to page "3" of the results
        Then I verify below pagination is present on the page
            | Data                  |
            | Previous set of pages |
            | 1                     |
            | 2                     |
            | 3                     |
            | 4                     |
            | ...                   |
            | 11                    |
            | Next set of pages     |
        Then I verify text "Showing 41 to 60 of 204 results" is present on the page
        Then I verify that only "20" results present on each page
        When I navigate to page "11" of the results
        When I navigate to page "9" of the results
        Then I verify below pagination is present on the page
            | Data                  |
            | Previous set of pages |
            | 1                     |
            | ...                   |
            | 8                     |
            | 9                     |
            | 10                    |
            | 11                    |
            | Next set of pages     |
        Then I verify text "Showing 161 to 180 of 204 results" is present on the page
        Then I verify that only "20" results present on each page

    Scenario: When current page between first and last, show one page link either side, Always show first and last page links
        Given I navigate to "Hinkley Point C New Nuclear Power Station Material Change 1" project Overview page
        When I click on "Registration comments" link
        When I navigate to page "3" of the results
        When I navigate to page "4" of the results
        When I navigate to page "5" of the results
        Then I verify below pagination is present on the page
            | Data                  |
            | Previous set of pages |
            | 1                     |
            | ...                   |
            | 4                     |
            | 5                     |
            | 6                     |
            | ...                   |
            | 11                    |
            | Next set of pages     |
        Then I verify text "Showing 81 to 100 of 204 results" is present on the page
        Then I verify that only "20" results present on each page