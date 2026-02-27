@testSuite
Feature: Relevant Representations (Registration comments) page
    As a Test user
    I want to navigate to Relevant Representations (Registration comments) page
    So that I can verify the functionality

    Scenario: Registration comments available for project
        Given I navigate to "Hinkley Point C New Nuclear Power Station Material Change 1 [e2e test case]" project Overview page
        When I click on "Relevant representations (registration comments)" link
        Then I can verify that the registration comments displayed in descending order by date submitted and secondary alphabetical order of author
            | Date             | Stage                                  |
            | 22 February 2021 | Members of the public/businesses - 22  |
            | 21 February 2021 | Members of the public/businesses - 21  |
            | 20 February 2021 | Members of the public/businesses - 20  |
            | 19 February 2021 | Members of the public/businesses - 1  |
            | 19 February 2021 | Members of the public/businesses - 100 |
            | 19 February 2021 | Members of the public/businesses - 101  |
            | 19 February 2021 | Members of the public/businesses - 102  |
            | 19 February 2021 | Members of the public/businesses - 103  |

    Scenario: No Registration comments available for project
        Given I navigate to "Cleve Hill Solar Park" project Overview page
        When I click on "Relevant representations (registration comments)" link
        Then I verify no registration comments text present on the page

    Scenario: Do not show pagination links for 20 registration comments or less
        Given I navigate to "Ho Ho Hooo" project Overview page
        When I click on "Relevant representations (registration comments)" link
        Then I verify no pagination is present on the page

    Scenario: Show pagination links for more than 20 registration comments, previous link not displayed on first page, next link not displayed on last page and ellipsis
        Given I navigate to "Hinkley Point C New Nuclear Power Station Material Change 1" project Overview page
        When I click on "Relevant representations (registration comments)" link
        Then I verify below pagination is present on the page
            | Data              |
            | 1                 |
            | 2                 |
            | 3                 |
            | ...               |
            | 9                |
            | Next set of pages |
        Then I verify text "Showing 1 to 25 of 204 results" is present on the page
        Then I verify that only "25" results present on each page
        When I navigate to page "9" of the results
        Then I verify below pagination is present on the page
            | Data                  |
            | Previous set of pages |
            | 1                     |
            | ...                   |
            | 7                     |
            | 8                    |
            | 9                    |
        Then I verify text "Showing 201 to 204 of 204 results" is present on the page
        Then I verify that only "4" results present on each page
#
    Scenario: When current page within first three, show only those page links and When current page within last three, show only those page links
        Given I navigate to "Hinkley Point C New Nuclear Power Station Material Change 1 [e2e test case]" project Overview page
        When I click on "Relevant representations (registration comments)" link
        When I navigate to page "3" of the results
        Then I verify below pagination is present on the page
            | Data                  |
            | Previous set of pages |
            | 1                     |
            | 2                     |
            | 3                     |
            | 4                     |
            | ...                   |
            | 9                    |
            | Next set of pages     |
        Then I verify text "Showing 51 to 75 of 204 results" is present on the page
        Then I verify that only "25" results present on each page
        When I navigate to page "9" of the results
        When I navigate to page "7" of the results
        Then I verify below pagination is present on the page
            | Data                  |
            | Previous set of pages |
            | 1                     |
            | ...                   |
            | 6                     |
            | 7                     |
            | 8                    |
            | 9                    |
            | Next set of pages     |
        Then I verify text "Showing 151 to 175 of 204 results" is present on the page
        Then I verify that only "25" results present on each page

    Scenario: When current page between first and last, show one page link either side, Always show first and last page links
        Given I navigate to "Hinkley Point C New Nuclear Power Station Material Change 1 [e2e test case]" project Overview page
        When I click on "Relevant representations (registration comments)" link
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
            | 9                    |
            | Next set of pages     |
        Then I verify text "Showing 101 to 125 of 204 results" is present on the page
        Then I verify that only "25" results present on each page

    #ASB-289
    #Feature: Search registration comments
    #    As a user
    #    I want to be able to search by text
    #    So that I can find relevant registration comments

    @ASB-289
    Scenario: Search finds matching registration comments
        Given I have navigated to registration comments for the "St James Barton Giant Wind Turbine [e2e test case]" project
        When I search for comments containing "joe"
        Then a list of registration comments with metadata containing "joe" is provided
        And the list is sorted by received date, newest first

    @ASB-289 @no-match-scenario
    Scenario: Search find no matching registration comments
        Given I have navigated to registration comments for the "St James Barton Giant Wind Turbine [e2e test case]" project
        When I search for comments containing "xyz"
        Then I am informed that no results were found
        And I am given the option to clear the search to list all available registration comments

    Scenario: Filter by Registration type
        Given I navigate to "St James Barton Giant Wind Turbine [e2e test case]" project Overview page
        When I click on "Relevant representations (registration comments)" link
        And I select "Parish councils (3)" checkbox
        And I click on Apply button to apply filters
        Then I can verify that below comments were returned
            | Comments                                                                                                                                                                          |
                | Stokes Croft Parish Council We wholeheartedly support Joe Stipliani's planning application Submitted by: Parish councils Date submitted: 20 April 2022 Contains attachment(s) |
                | Frosty Flights (Frosty Flights) Some comments Submitted by: Parish councils Date submitted: 1 August 2021 Contains attachment(s)                                              |
                | Frosty Fliers (Frosty Fliers ) Some comments Submitted by: Parish councils Date submitted: 14 March 2021 Contains attachment(s)                                               |

    Scenario: Search by text and then filter by registration type
        Given I navigate to "St James Barton Giant Wind Turbine [e2e test case]" project Overview page
        When I click on "Relevant representations (registration comments)" link
        When I search for comments containing "joe"
        And I select "Local authorities (1)" checkbox
        And I click on Apply button to apply filters
        Then I can verify that below comments were returned
            | Comments                                                                                                                                                                                                                                                                                                                    |
                | Somerset County Council Joe Stipliani has demonstrated his commitment to his home county of Somerset by proposing this construction project. We are happy that all areas of compliance, including the local authority's... Read more Submitted by: Local authorities Date submitted: 15 May 2022 Contains attachment(s) |

    Scenario: Filter by representative and then search by text
        Given I navigate to "St James Barton Giant Wind Turbine [e2e test case]" project Overview page
        When I click on "Relevant representations (registration comments)" link
        And I select "Members of the public/businesses (43)" checkbox
        And I click on Apply button to apply filters
        When I search for comments containing "Chris"
        Then I can verify that below comments were returned
            | Comments                                                                                                     |
                | Chris Cundill Some comments Submitted by: Members of the public/businesses Date submitted: 4 July 2022   |
				| Chris Some comments Submitted by: Members of the public/businesses Date submitted: 17 March 2021         |
				| Chris Cundill Some comments Submitted by: Members of the public/businesses Date submitted: 16 March 2021 |

    Scenario: No matching registration comments using filter by representative then search by text
        Given I navigate to "St James Barton Giant Wind Turbine [e2e test case]" project Overview page
        When I click on "Relevant representations (registration comments)" link
        And I select "Members of the public/businesses (43)" checkbox
        And I click on Apply button to apply filters
        When I search for comments containing "communication"
        Then I am informed that no results were found
        And I am given the option to clear the search to list all available registration comments

    Scenario: Option to ‘Read more’ on individual comments, Click ‘Read more’ link, View individual registration comments no attachments, navigate back to registration comments page
        Given I navigate to "St James Barton Giant Wind Turbine [e2e test case]" project Overview page
        When I click on "Relevant representations (registration comments)" link
        And I click on 0 read more link
        Then I verify below comment is displayed
            | Data                                                                                                                                                                                                                                                                                                                                       |
			    |  |
        And I click on back link
        Then I verify text "Showing 1 to 25 of 48 results" is present on the page

    Scenario: navigate back to registration comments page after applying filters
        Given I navigate to "St James Barton Giant Wind Turbine [e2e test case]" project Overview page
        When I click on "Relevant representations (registration comments)" link
        And I select "Members of the public/businesses (43)" checkbox
        And I click on Apply button to apply filters
        And I click on 0 read more link
        Then I verify below comment is displayed
            | Data                                                                                                                                                                                                                                                                                                                                       |
                | I think it is fantastic that entrepreneur Joe Stipliani should want to expand his eco-portfolio by investing in his local area. The council should ensure that hot air generated by disgruntled residents is not wasted but instead, redirected to drive the turbine. |
        And I click on back link

