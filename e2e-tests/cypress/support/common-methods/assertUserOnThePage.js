const pageExpectations = require('./page-expectations');

module.exports = (pageName) => {
	const expectation = pageExpectations[pageName.toLowerCase()];

	if (!expectation) {
		throw new Error('unable to find specified page name: ' + pageName);
	}

	if (expectation.title) {
		cy.title().should(expectation.title.match, expectation.title.value);
	}

	if (expectation.heading) {
		cy.get('h1')
			.invoke('text')
			.then((text) => {
				expect(text).to.contain(expectation.heading.value);
			});
	}

	if (expectation.url) {
		cy.url().should('include', expectation.url);
	}

	cy.wait(Cypress.env('demoDelay'));

	// cy.checkPageA11y({
	// });
};
