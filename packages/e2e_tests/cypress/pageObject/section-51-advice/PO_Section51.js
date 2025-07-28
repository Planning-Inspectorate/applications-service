export class PO_Section51 {
	elements = {
		resultsPanel: () => cy.get('.ui-results'),
		backToListBtn: () => cy.contains('Back to list'),
		govLink: () => cy.get('.govuk-link')
	};

	assertResultsPanel() {
		this.elements.resultsPanel().should('be.visible');
	}

	verifyResultStructure() {
		cy.get('.ui-results__result').each((result) => {
			// Check that each result has an h2 element
			cy.wrap(result).find('h2').should('be.visible');

			// Check that each result has a paragraph element
			cy.wrap(result).find('p').should('exist').and('be.visible');

			// Verify the link exists and contains the correct class
			cy.wrap(result)
				.find('.ui-results__result-title a')
				.should('exist')
				.and('have.attr', 'href')
				.then((href) => {
					// Ensure the link is valid
					expect(href).to.contain('/s51advice/');
				});
		});
	}

	clickFirstResultAndVerifyH1() {
		// Capture the text from the <strong> tag inside the first result's link
		cy.get('.ui-results__result')
			.first()
			.find('.ui-results__result-title strong')
			.invoke('text') // Get the text from <strong>
			.then((text) => {
				const trimmedText = text.trim();
				// Click the link after capturing the <strong> text
				cy.get('.ui-results__result').first().find('.ui-results__result-title a').click();

				// After navigating, check that the <h1> on the new page matches the <strong> text
				cy.get('h1')
					.invoke('text')
					.then((h1Text) => {
						const trimmedH1Text = h1Text.trim(); // Trim whitespace from the h1 text
						expect(trimmedH1Text).contains(trimmedText); // Assert that they are equal
					});
			});
	}

	verifySummaryList(expectedKeys) {
		// Ensure the summary list exists
		cy.get('.govuk-summary-list').should('exist').and('be.visible');

		// Loop through each row and verify that the summary-list__key contains the expected strings
		cy.get('.govuk-summary-list__row').each((row, index) => {
			cy.wrap(row).find('.govuk-summary-list__key').should('contain.text', expectedKeys[index]);
		});
	}

	clickBackToListBtn() {
		this.elements.backToListBtn().click();
	}

	selectFilterOptions(option) {
		this.elements.govLink().contains(option).click();
	}

	assertRelatedGuidesMenu(ariaLabel) {
		cy.get(`nav[aria-label="${ariaLabel}"]`)
			.should('exist')
			.and('be.visible')
			.find('h2')
			.should('contain', 'Related guides')
			.and('be.visible');
	}

	assertRelatedGuidesMenuItems(ariaLabel) {
		// Directly check for vertical tab list items within the navigation
		cy.get(`nav[aria-label="${ariaLabel}"]`)
			.find('.ui-vertical-tabs__list-item')
			.each((listItem) => {
				//   cy.wrap(listItem).should('be.visible'); // Ensure the list item is visible
				cy.wrap(listItem).find('a').should('have.attr', 'href').and('not.be.empty');
			});
	}
}
