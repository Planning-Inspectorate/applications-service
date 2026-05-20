import dayjs from 'dayjs';
import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import PO_DateFilter from '../PageObjects/PO_DateFilter';
import { LOCAL_CASES } from '../../shared/localCases';

const dateFilter = new PO_DateFilter();
const { northLincolnshire } = LOCAL_CASES;

const formatEnteredDate = (dd, mm, yyyy) => dayjs(`${yyyy}-${mm}-${dd}`).format('D MMMM YYYY');

function openDateFilter() {
	dateFilter.datePublishedLink();
}

function setInputValue(input, value) {
	input.scrollIntoView().clear({ force: true }).type(value, { force: true });
}

function assertPublishedDatesMatch(predicate) {
	dateFilter.publishedDate().then(($dates) => {
		const publishedDates = [...$dates].map((date) => dayjs(date.innerText.trim()));

		expect(publishedDates.length).to.be.greaterThan(0);
		publishedDates.forEach(predicate);
	});
}

Given('I open the local documents page', () => {
	dateFilter.openLocalDocumentsPage(northLincolnshire.id);
	dateFilter.assertOnLocalDocumentsPage(northLincolnshire.id);
});

When('I enter {string} {string} {string} into the from published date filter', (dd, mm, yyyy) => {
	openDateFilter();
	setInputValue(dateFilter.fromDay(), dd);
	setInputValue(dateFilter.fromMonth(), mm);
	setInputValue(dateFilter.fromYear(), yyyy);
	cy.wrap(formatEnteredDate(dd, mm, yyyy)).as('selectedFromDate');
});

When('I enter {string} {string} {string} into the to published date filter', (dd, mm, yyyy) => {
	openDateFilter();
	setInputValue(dateFilter.toDay(), dd);
	setInputValue(dateFilter.toMonth(), mm);
	setInputValue(dateFilter.toYear(), yyyy);
	cy.wrap(formatEnteredDate(dd, mm, yyyy)).as('selectedToDate');
});

When('I apply the documents filters', () => {
	dateFilter.applyFilterBtn();
});

Then('the active documents filters include the from date', () => {
	cy.get('@selectedFromDate').then((selectedFromDate) => {
		dateFilter.filterResultIcon().should('contain', selectedFromDate);
	});
});

Then('the documents are published on or after the selected from date', () => {
	cy.get('@selectedFromDate').then((selectedFromDate) => {
		const fromDate = dayjs(selectedFromDate);

		assertPublishedDatesMatch((publishedDate) => {
			expect(publishedDate.isSame(fromDate, 'day') || publishedDate.isAfter(fromDate, 'day')).to.be
				.true;
		});
	});
});

Then('the active documents filters include the to date', () => {
	cy.get('@selectedToDate').then((selectedToDate) => {
		dateFilter.filterResultIcon().should('contain', selectedToDate);
	});
});

Then('the documents are published on or before the selected to date', () => {
	cy.get('@selectedToDate').then((selectedToDate) => {
		const toDate = dayjs(selectedToDate);

		assertPublishedDatesMatch((publishedDate) => {
			expect(publishedDate.isSame(toDate, 'day') || publishedDate.isBefore(toDate, 'day')).to.be
				.true;
		});
	});
});

When('I enter only from month {string} and year {string}', (month, year) => {
	openDateFilter();
	setInputValue(dateFilter.fromMonth(), month);
	setInputValue(dateFilter.fromYear(), year);
	dateFilter.applyFilterBtn();
});

When('I enter only to month {string} and year {string}', (month, year) => {
	openDateFilter();
	setInputValue(dateFilter.toMonth(), month);
	setInputValue(dateFilter.toYear(), year);
	dateFilter.applyFilterBtn();
});

When('I enter only from day {string} and year {string}', (day, year) => {
	openDateFilter();
	setInputValue(dateFilter.fromDay(), day);
	setInputValue(dateFilter.fromYear(), year);
	dateFilter.applyFilterBtn();
});

When('I enter only to day {string} and year {string}', (day, year) => {
	openDateFilter();
	setInputValue(dateFilter.toDay(), day);
	setInputValue(dateFilter.toYear(), year);
	dateFilter.applyFilterBtn();
});

When('I enter invalid text into the from published date filter', () => {
	openDateFilter();
	setInputValue(dateFilter.fromDay(), 'a');
	setInputValue(dateFilter.fromMonth(), 'b');
	setInputValue(dateFilter.fromYear(), 'c');
});

When('I enter invalid text into the to published date filter', () => {
	openDateFilter();
	setInputValue(dateFilter.toDay(), 'a');
	setInputValue(dateFilter.toMonth(), 'b');
	setInputValue(dateFilter.toYear(), 'c');
});

When('I enter only from month {string} and day {string}', (month, day) => {
	openDateFilter();
	setInputValue(dateFilter.fromMonth(), month);
	setInputValue(dateFilter.fromDay(), day);
	dateFilter.applyFilterBtn();
});

When('I enter only to month {string} and day {string}', (month, day) => {
	openDateFilter();
	setInputValue(dateFilter.toDay(), day);
	setInputValue(dateFilter.toMonth(), month);
	dateFilter.applyFilterBtn();
});

Then('the from date error is {string}', (errorMessage) => {
	dateFilter.fromDateErrors().should('contain', errorMessage);
});

Then('the to date error is {string}', (errorMessage) => {
	dateFilter.toDateErrors().should('contain', errorMessage);
});

Then('the active documents filters include the selected date range', () => {
	cy.get('@selectedFromDate').then((selectedFromDate) => {
		cy.get('@selectedToDate').then((selectedToDate) => {
			dateFilter
				.filterResultIcon()
				.should('contain', selectedFromDate)
				.and('contain', selectedToDate);
		});
	});
});

Then('the documents are published within the selected date range', () => {
	cy.get('@selectedFromDate').then((selectedFromDate) => {
		cy.get('@selectedToDate').then((selectedToDate) => {
			const fromDate = dayjs(selectedFromDate);
			const toDate = dayjs(selectedToDate);

			assertPublishedDatesMatch((publishedDate) => {
				expect(
					(publishedDate.isSame(fromDate, 'day') || publishedDate.isAfter(fromDate, 'day')) &&
						(publishedDate.isSame(toDate, 'day') || publishedDate.isBefore(toDate, 'day'))
				).to.be.true;
			});
		});
	});
});
