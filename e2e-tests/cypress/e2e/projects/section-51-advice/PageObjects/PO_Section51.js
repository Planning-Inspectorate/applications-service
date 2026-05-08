export class PO_Section51 {
	identifiers = {
		resultsPanel: () => cy.get('.ui-results'),
		backToListBtn: () => cy.contains('Back to list'),
		govLink: () => cy.get('.govuk-link'),
		resultsPerPageLink: (count) => cy.get(`a[href*="itemsPerPage=${count}"]`),
		resultItems: () => cy.get('.ui-results__result'),
		pageHeading: () => cy.get('h1'),
		summaryList: () => cy.get('.govuk-summary-list'),
		summaryListRows: () => cy.get('.govuk-summary-list__row'),
		relatedGuidesNav: (ariaLabel) => cy.get(`nav[aria-label="${ariaLabel}"]`)
	};

	get functions() {
		return new Proxy(
			{},
			{
				get: (_, prop) => this[prop].bind(this)
			}
		);
	}

	assertResultsPanel() {
		this.identifiers.resultsPanel().should('be.visible');
	}

	openLocalSection51AdvicePage(caseId) {
		cy.visit(`/projects/${caseId}/s51advice`);
	}

	assertOnLocalSection51AdvicePage(caseId) {
		cy.url().should('include', `/projects/${caseId}/s51advice`);
	}

	assertUrlIncludes(value) {
		cy.url().should('include', value);
	}

	verifyResultStructure() {
		this.identifiers.resultItems().each((result) => {
			cy.wrap(result).find('h2').should('be.visible');
			cy.wrap(result).find('p').should('exist').and('be.visible');
			cy.wrap(result)
				.find('.ui-results__result-title a')
				.should('exist')
				.and('have.attr', 'href')
				.then((href) => {
					expect(href).to.contain('/s51advice/');
				});
		});
	}

	clickFirstResultAndVerifyH1() {
		this.identifiers
			.resultItems()
			.first()
			.find('.ui-results__result-title strong')
			.invoke('text')
			.then((text) => {
				const trimmedText = text.trim();
				this.identifiers.resultItems().first().find('.ui-results__result-title a').click();

				this.identifiers
					.pageHeading()
					.invoke('text')
					.then((h1Text) => {
						const trimmedH1Text = h1Text.trim();
						expect(trimmedH1Text).contains(trimmedText);
					});
			});
	}

	verifySummaryList(expectedKeys) {
		this.identifiers.summaryList().should('exist').and('be.visible');
		this.identifiers.summaryListRows().each((row, index) => {
			cy.wrap(row).find('.govuk-summary-list__key').should('contain.text', expectedKeys[index]);
		});
	}

	assertSummaryListVisible() {
		this.identifiers.summaryList().should('exist').and('be.visible');
		this.identifiers.summaryListRows().its('length').should('be.gte', 1);
	}

	clickBackToListBtn() {
		this.identifiers.backToListBtn().click();
	}

	selectFilterOptions(option) {
		this.identifiers.resultsPerPageLink(option).click();
	}

	assertRelatedGuidesMenu(ariaLabel) {
		this.identifiers
			.relatedGuidesNav(ariaLabel)
			.should('exist')
			.and('be.visible')
			.find('h2')
			.should('contain', 'Related guides')
			.and('be.visible');
	}

	assertRelatedGuidesMenuItems(ariaLabel) {
		this.identifiers
			.relatedGuidesNav(ariaLabel)
			.find('.ui-vertical-tabs__list-item')
			.each((listItem) => {
				cy.wrap(listItem).find('a').should('have.attr', 'href').and('not.be.empty');
			});
	}
}
