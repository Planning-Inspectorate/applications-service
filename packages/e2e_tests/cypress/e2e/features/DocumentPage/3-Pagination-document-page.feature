Feature: As a user I want to be able to select the number of documents displayed on a page


	Scenario: 1 - Project displays 25|50|100 documents per page
		Given A user has navigated to the document page
		And The project has 25 documents with dates sorted by newest first
		And The project has 50 documents with dates sorted by newest first
		And The project has 100 documents with dates sorted by newest first


	Scenario: 2 - Project has less than 25 documents
		Given A user has navigated to the document page with less than 25 documents
		And The project has less than 25 documents with dates sorted by newest first
