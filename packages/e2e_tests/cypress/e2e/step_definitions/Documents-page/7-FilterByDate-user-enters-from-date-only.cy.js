///<reference types ="cypress" />
import { And, When, Then } from 'cypress-cucumber-preprocessor/steps';
import PO_DateFilter from '../../../pageObject/Documents/PO_DateFilter';
const dateFilter = new PO_DateFilter();
const dayjs = require('dayjs');

When(
	'The user enters a from date {string} {string} {string} into date published box',
	(dd, mm, yyyy) => {
		dateFilter.datePublishedLink();
		dateFilter.fromDay().type(dd);
		dateFilter.fromMonth().type(mm);
		dateFilter.fromYear().type(yyyy);
	}
);

And('Clicks Apply filter', () => {
	dateFilter.applyFilterBtn();
});

Then('A filtered results section is displayed with the date from active filter', () => {
	dateFilter.filterResultIcon().should('contain', '17 October 2019');

	dateFilter.filterResultIcon().then((date_1) => {
		dateFilter
			.publishedDate()
			.eq(7)
			.then((date_2) => {
				expect(date_1.text().trim()).to.equal(date_2.text().trim());
			});
	});
});

And(
	'A list of documents that were published from 17 10 2019 until the current date are displayed',
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
