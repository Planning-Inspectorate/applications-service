@testSuite
Feature: Relevant Representations (Registration comments) page
    As a Test user
    I want to navigate to Relevant Representations (Registration comments) page
    So that I can verify the functionality

    Scenario: Registration comments available for project
        Given I navigate to "Hinkley Point C New Nuclear Power Station Material Change 1" project Overview page
        When I click on "Registration comments" link
        Then I can verify that the registration comments displayed in descending order
            | Date             | Stage                                  |
            | 1 February 2021 | Members of the public/businesses - 19  |
            | 2 February 2021 | Members of the public/businesses - 18  |
            | 3 February 2021 | Members of the public/businesses - 17  |
            | 4 February 2021 | Members of the public/businesses - 16 |
            | 5 February 2021 | Members of the public/businesses - 15 |
            | 6 February 2021 | Members of the public/businesses - 14 |
            | 7 February 2021 | Members of the public/businesses - 13 |
            | 8 February 2021 | Members of the public/businesses - 12 |
            | 9 February 2021 | Members of the public/businesses - 11 |
            | 10 February 2021 | Members of the public/businesses - 10 |
            | 11 February 2021 | Members of the public/businesses - 9 |
            | 12 February 2021 | Members of the public/businesses - 8 |
            | 13 February 2021 | Members of the public/businesses - 7 |
            | 14 February 2021 | Members of the public/businesses - 6 |
            | 15 February 2021 | Members of the public/businesses - 5 |
            | 16 February 2021 | Members of the public/businesses - 4 |
            | 17 February 2021 | Members of the public/businesses - 3 |
            | 18 February 2021 | Members of the public/businesses - 2 |
            | 19 February 2021 | Members of the public/businesses - 1 |
            | 19 February 2021 | Members of the public/businesses - 100 |

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
        And I select "Parish councils (3)" checkbox
        And I click on Apply button to apply filters
        Then I can verify that below comments were returned
            | Comments                                                                                                                 |
						| Frosty Fliers (Frosty Fliers ) Some comments 14 March 2021 Parish councils                                               |
						| Frosty Flights (Frosty Flights) Some comments 1 August 2021 Parish councils                                             |
						| Stokes Croft Parish Council We wholeheartedly support Joe Stipliani's planning application 20 April 2022 Parish councils |

    Scenario: Search by text and then filter by registration type
        Given I navigate to "St James Barton Giant Wind Turbine" project Overview page
        When I click on "Registration comments" link
        When I search for comments containing "joe"
        And I select "Local authorities (1)" checkbox
        And I click on Apply button to apply filters
        Then I can verify that below comments were returned
            | Comments                                                                                                                                                                                                                                                          |
            | Somerset County Council Joe Stipliani has demonstrated his commitment to his home county of Somerset by proposing this construction project. We are happy that all areas of compliance, including the local authority's... Read more 15 May 2022Local authorities |

    Scenario: Filter by representative and then search by text
        Given I navigate to "St James Barton Giant Wind Turbine" project Overview page
        When I click on "Registration comments" link
        And I select "Members of the public/businesses (43)" checkbox
        And I click on Apply button to apply filters
        When I search for comments containing "Chris"
        Then I can verify that below comments were returned
            | Comments                                                                   |
						| Chris Cundill Some comments 16 March 2021 Members of the public/businesses |
						| Chris Some comments 17 March 2021 Members of the public/businesses         |
            | Chris Cundill Some comments 4 July 2022 Members of the public/businesses  |

    Scenario: No matching registration comments using filter by representative then search by text
        Given I navigate to "St James Barton Giant Wind Turbine" project Overview page
        When I click on "Registration comments" link
        And I select "Members of the public/businesses (43)" checkbox
        And I click on Apply button to apply filters
        When I search for comments containing "communication"
        Then I am informed that no results were found
        And I am given the option to clear the search to list all available registration comments

    Scenario: Option to ‘Read more’ on individual comments, Click ‘Read more’ link, View individual registration comments no attachments, navigate back to registration comments page
        Given I navigate to "St James Barton Giant Wind Turbine" project Overview page
        When I click on "Registration comments" link
        And I click on 0 read more link
        Then I verify below comment is displayed
            | Data                                                                                                                                                                                                                                                                                                                                    |
						| Representation by Test (Test) Some comment which exceeds the character limit. Clearly there is much to be said which must not be left unsaid. Even if it turns out I'm the only one to have said, no-one will be able to exclaim "You should have said!" 19 February 2020Members of the public/businesses                               |
        And I click on back link
        Then I verify text "Showing 1 to 20 of 48 results" is present on the page

    Scenario: navigate back to registration comments page after applying filters
        Given I navigate to "St James Barton Giant Wind Turbine" project Overview page
        When I click on "Registration comments" link
        And I select "Members of the public/businesses (43)" checkbox
        And I click on Apply button to apply filters
        And I click on 0 read more link
        Then I verify below comment is displayed
            | Data                                                                                                                                                                                                                                                                                                                                    |
						| Representation by Test (Test) Some comment which exceeds the character limit. Clearly there is much to be said which must not be left unsaid. Even if it turns out I'm the only one to have said, no-one will be able to exclaim "You should have said!" 19 February 2020Members of the public/businesses                               |
        And I click on back link

