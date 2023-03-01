///<reference types ="cypress" />
import { And, When } from 'cypress-cucumber-preprocessor/steps';
import PO_DateFilter from '../../../pageObject/Documents/PO_DateFilter';
const dateFilter = new PO_DateFilter();
const dayjs = require('dayjs');

And('The project has 25 documents with dates sorted by newest first', () => {
	cy.documentResults().children().should('have.length', '25');
	dateFilter
		.publishedDate()
		.eq(1)
		.then(($firstDate) => {
			const firstDate = dayjs($firstDate.text());
			dateFilter
				.publishedDate()
				.eq(8)
				.then(($secondDate) => {
					const secondDate = dayjs($secondDate.text());
					cy.log($firstDate);
					expect(secondDate.isBefore(firstDate)).to.be.true;
				});
		});
});

And('The project has 50 documents with dates sorted by newest first', () => {
	cy.get("a[aria-label='view 50 results per page']").click();
	cy.documentResults().children().should('have.length', '50');
	dateFilter
		.publishedDate()
		.eq(1)
		.then(($firstDate) => {
			const firstDate = dayjs($firstDate.text());
			dateFilter
				.publishedDate()
				.eq(8)
				.then(($secondDate) => {
					const secondDate = dayjs($secondDate.text());
					cy.log($firstDate);
					expect(secondDate.isBefore(firstDate)).to.be.true;
				});
		});
});

And('The project has 100 documents with dates sorted by newest first', () => {
	cy.get("a[aria-label='view 100 results per page']").click();
	cy.documentResults().children().should('have.length', '100');
	dateFilter
		.publishedDate()
		.eq(1)
		.then(($firstDate) => {
			const firstDate = dayjs($firstDate.text());
			dateFilter
				.publishedDate()
				.eq(8)
				.then(($secondDate) => {
					const secondDate = dayjs($secondDate.text());
					cy.log($firstDate);
					expect(secondDate.isBefore(firstDate)).to.be.true;
				});
		});
});
