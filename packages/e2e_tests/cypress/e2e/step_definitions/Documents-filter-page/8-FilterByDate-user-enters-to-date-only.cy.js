///<reference types ="cypress" />
import { And, When, Then } from 'cypress-cucumber-preprocessor/steps';
import PO_DateFilter from '../../../pageObject/Documents/PO_DateFilter';

const dateFilter = new PO_DateFilter();
const dayjs = require('dayjs');

When(
	'The user enters a to date {string} {string} {string} into date published box',
	(dd, mm, yyyy) => {
		dateFilter.datePublishedLink();
		dateFilter.toDay().type(dd);
		dateFilter.toMonth().type(mm);
		dateFilter.toYear().type(yyyy);
	}
);
And('Clicks Apply filter', () => {
	dateFilter.applyFilterBtn();
});

Then('A Filtered results section is displayed with the date to active filters', () => {
	dateFilter.filterResultIcon().should('contain', '6 February 2020');
	dateFilter.filterResultIcon().then((date_1) => {
		dateFilter
			.publishedDate()
			.eq(0)
			.then((date_2) => {
				expect(date_1.text().trim()).to.equal(date_2.text().trim());
			});
	});
});

Then(
	'A list of all documents that were published up to and including 06 2 2020 with new first',
	() => {
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
	}
);
