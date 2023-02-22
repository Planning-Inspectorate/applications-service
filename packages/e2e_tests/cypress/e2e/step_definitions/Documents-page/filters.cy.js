import { And, When } from 'cypress-cucumber-preprocessor/steps';

function filterResultsCaption() {
	return cy.get('.ui-tag-link-list__caption');
}

function sectionCheckBoxes() {
	return cy.get("div[class='govuk-checkboxes__item']");
}

const filterMap = {
	'Pre-application': 0,
	'Developers application': 1,
	Acceptance: 2,
	'Pre-examination': 3,
	Examination: 4
};

// -------- Pre application filter --------
When('User selects 2 document type checkbox within the Pre-application filter', () => {
	cy.get('#stage-1').click();
	cy.get('#stage-1-2').click();
});

And('The user selects 1 document type checkbox within the Acceptance stage', () => {
	sectionCheckBoxes().eq(1).click();
});
// -------- Pre-examination filter --------
And('The user selects 1 document type checkbox within the Pre-examination stage', () => {
	sectionCheckBoxes().eq(12).click();
});
// -------- Examination filter --------
And('The user selects 1 document type checkbox within the Examination stage', () => {
	sectionCheckBoxes().eq(23).click();
});

//  -------- Common --------
When('User selects 1 document type checkbox within the {string} filter', (filterName) => {
	sectionCheckBoxes().eq(filterMap[filterName]).click();
});
And('the filtered results section is displayed with the project stage {string}', (filterName) => {
	filterResultsCaption().should('contain', filterName);
});

And('User selects the {string} stage Filter', (filterName) => {
	cy.get('.ui-checkbox-accordion__section-control > .ui-checkbox-accordion__section-control-title')
		.eq(filterMap[filterName])
		.click();
});

And('the user clicks the selects all filters link within the {string} stage', (filterName) => {
	cy.get('.ui-checkbox-accordion__checkboxes-section-switch').eq(filterMap[filterName]).click();
});
