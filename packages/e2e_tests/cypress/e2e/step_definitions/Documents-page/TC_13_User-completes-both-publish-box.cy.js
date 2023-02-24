///<reference types ="cypress" />
import { When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import PO_DateFilter from '../../../pageObject/Documents/PO_DateFilter';

const dateFilter = new PO_DateFilter();
const dayjs = require('dayjs');

When(
	'The user enters a date into the from published box {string} {string} {string}',
	(dd, mm, yyyy) => {
		dateFilter.datePublishedLink();
		dateFilter.fromDay().type(dd);
		dateFilter.fromMonth().type(mm);
		dateFilter.fromYear().type(yyyy);
	}
);
And(
	'The user completes a date into the to published box {string} {string} {string}',
	(dd, mm, yyyy) => {
		dateFilter.toDay().type(dd);
		dateFilter.toMonth().type(mm);
		dateFilter.toYear().type(yyyy);
	}
);

Then('A filter results section is displayed with the from and to filtered results', () => {
	dateFilter.filterResultIcon().eq(0).should('contain', '17 October 2019');
	dateFilter.filterResultIcon().eq(1).should('contain', '2 November 2020');
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
