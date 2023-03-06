///<reference types ="cypress" />
import { And, Given, When } from 'cypress-cucumber-preprocessor/steps';
import PO_DateFilter from '../../../pageObject/Documents/PO_DateFilter';
const dateFilter = new PO_DateFilter();
const dayjs = require('dayjs');

Given('A user has navigated to the document page with less than 25 documents', () => {
	cy.visit('/projects/EN010118/documents?itemsPerPage=25');
});
And('The project has less than 25 documents with dates sorted by newest first', () => {
	cy.documentResults()
		.children()
		.should(($lis) => {
			expect($lis).to.have.length.at.most(25);
		});
	dateFilter
		.publishedDate()
		.eq(0)
		.then(($firstDate) => {
			const firstDate = dayjs($firstDate.text());
			dateFilter
				.publishedDate()
				.eq(1)
				.then(($secondDate) => {
					const secondDate = dayjs($secondDate.text());
					cy.log($firstDate);
					expect(secondDate.isBefore(firstDate)).to.be.true;
				});
		});
});
