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

    @ASB-289 @no-match-scenario
    Scenario: Search find no matching registration comments
        Given I have navigated to registration comments for the "St James Barton Giant Wind Turbine" project
        When I search for comments containing "xyz"
        Then I am informed that no results were found
        And I am given the option to clear the search to list all available registration comments

    Scenario: Filter by Registration type
        Given I navigate to "St James Barton Giant Wind Turbine" project Overview page
        When I click on "Registration comments" link
        And I select "Parish Councils (3)" checkbox
        And I click on Apply button to apply filters
        Then I can verify that below comments were returned
            | Comments                                                                                                                 |
            | Stokes Croft Parish Council We wholeheartedly support Joe Stipliani's planning application 20 April 2022 Parish Councils |
            | Frosty Flights (Frosty Flights) Some comments 01 August 2021 Parish Councils                                             |
            | Frosty Fliers (Frosty Fliers ) Some comments 14 March 2021 Parish Councils                                               |

    Scenario: Search by text and then filter by registration type
        Given I navigate to "St James Barton Giant Wind Turbine" project Overview page
        When I click on "Registration comments" link
        When I search for comments containing "joe"
        And I select "Local Authorities (1)" checkbox
        And I click on Apply button to apply filters
        Then I can verify that below comments were returned
            | Comments                                                                                                                                                                                                                                                          |
            | Somerset County Council Joe Stipliani has demonstrated his commitment to his home county of Somerset by proposing this construction project. We are happy that all areas of compliance, including the local authority's... Read more 15 May 2022Local Authorities |

    Scenario: Filter by representative and then search by text
        Given I navigate to "St James Barton Giant Wind Turbine" project Overview page
        When I click on "Registration comments" link
        And I select "Members of the Public/Businesses (43)" checkbox
        And I click on Apply button to apply filters
        When I search for comments containing "Chris"
        Then I can verify that below comments were returned
            | Comments                                                                   |
            | Chris Cundill Some comments 04 July 2022 Members of the Public/Businesses  |
            | Chris Some comments 17 March 2021 Members of the Public/Businesses         |
            | Chris Cundill Some comments 16 March 2021 Members of the Public/Businesses |

    Scenario: No matching registration comments using filter by representative then search by text
        Given I navigate to "St James Barton Giant Wind Turbine" project Overview page
        When I click on "Registration comments" link
        And I select "Members of the Public/Businesses (43)" checkbox
        And I click on Apply button to apply filters
        When I search for comments containing "communication"
        Then I am informed that no results were found
        And I am given the option to clear the search to list all available registration comments

    Scenario: Option to ‘Read more’ on individual comments, Click ‘Read more’ link, View individual registration comments no attachments, navigate back to registration comments page
        Given I navigate to "St James Barton Giant Wind Turbine" project Overview page
        When I click on "Registration comments" link
        And I click on 1 read more link
        Then I verify below comment is displayed
            | Data                                                                                                                                                                                                                                                                                                                                    |
            | Representation by Members of the Public/Businesses I think Joe Stipliani's should find somewhere else to build their new giant wind turbine. The turbines will be an unsightly addition to the view from the road on which I live. I'm concerned that the turbine could fall onto traffic. 16 May 2022 Members of the Public/Businesses |
        And I click on back link
        Then I verify text "Showing 1 to 20 of 48 results" is present on the page

    Scenario: navigate back to registration comments page after applying filters
        Given I navigate to "St James Barton Giant Wind Turbine" project Overview page
        When I click on "Registration comments" link
        And I select "Members of the Public/Businesses (43)" checkbox
        And I click on Apply button to apply filters
        And I click on 1 read more link
        Then I verify below comment is displayed
            | Data                                                                                                                                                                                                                                                                                                                                    |
            | Representation by Members of the Public/Businesses I think Joe Stipliani's should find somewhere else to build their new giant wind turbine. The turbines will be an unsightly addition to the view from the road on which I live. I'm concerned that the turbine could fall onto traffic. 16 May 2022 Members of the Public/Businesses |
        And I click on back link

