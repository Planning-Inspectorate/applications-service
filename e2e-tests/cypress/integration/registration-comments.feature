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
            | 10                     |
            | 11                     |
        Then I verify text "Showing 201 to 204 of 204 results" is present on the page
        Then I verify that only "4" results present on each page



        When I navigate to page "11" of the results
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

#ASB-289
#Feature: Search registration comments
#    As a user
#    I want to be able to search by text
#    So that I can find relevant registration comments

    @ASB-289
    Scenario: Search finds matching registration comments
      Given I have navigated to registration comments for the "St James Barton Giant Wind Turbine" project
      When I search for comments containing "joe"
      Then a list of registration comments with metadata containing "joe" is provided
      And the list is sorted by received date, newest first

#    @ASB-289
#    Scenario: Search find no matching registration comments
#      Given I have navigated to registration comments for the "St James Barton Giant Wind Turbine" project
#      When I search for comments containing "xyz"
#      Then I am informed that no results were found
#      And I am given the option to clear the search to list all available registration comments
