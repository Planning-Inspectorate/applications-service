///<reference types ="cypress" />
import { And, When } from 'cypress-cucumber-preprocessor/steps';
import PO_Documents from '../../../pageObject/Documents/PO_Documents';
const documents = new PO_Documents();
const dayjs = require('dayjs');

And('User selects the Pre-application stage Filter', () => {
	documents.preAppFilter();
});

When('User selects 1 document type checkbox within the Pre-application filter', () => {
	documents.preAppFilterCheckBox_1();
});
And('User clicks Apply filters', () => {
	documents.applyFilterButton();
});

And('The dates are displayed in a descending order', () => {
	cy.get('[data-cy="published-date"]')
		.eq(1)
		.then(($firstDate) => {
			const firstDate = dayjs($firstDate.text());
			cy.get('[data-cy="published-date"]')
				.eq(5)
				.then(($secondDate) => {
					const secondDate = dayjs($secondDate.text());
					cy.log($firstDate);
					expect(secondDate.isBefore(firstDate)).to.be.true;
				});
		});
});
