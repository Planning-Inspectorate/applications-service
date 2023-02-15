///<reference types ="cypress" />
import { And, When } from 'cypress-cucumber-preprocessor/steps';
import PO_Documents from '../../../pageObject/Documents/PO_Documents';
const documents = new PO_Documents();

When('The user selects 1 document type checkbox within the Pre-application stage', () => {
	documents.allFilters().eq(0).click();
	documents.preAppFilterCheckBox_1();
});
And('The user selects 1 document type checkbox within the Acceptance stage', () => {
	documents.allFilters().eq(3).click();
	//documents.acceptanceCheckBox_1()
});
And('The user selects 1 document type checkbox within the Pre-examination stage', () => {
	documents.allFilters().eq(4).click();
	documents.preExamCheckBox_1();
});
And('The user selects 1 document type checkbox within the Examination stage', () => {
	documents.allFilters().eq(5).click();
	documents.examCheckBox_1();
});
And('User clicks Apply filters', () => {
	documents.applyFilterButton();
});
And('Filtered results section is displayed with the project stages', () => {
	documents.filterResultsIcon().eq(0).should('contain', 'Pre-application');
	documents.filterResultsIcon().eq(1).should('contain', 'Pre-examination');
	documents.filterResultsIcon().eq(2).should('contain', 'Examination');
});
