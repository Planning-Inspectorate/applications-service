import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { PO_Section51 } from '../PageObjects/PO_Section51';
import { BasePage } from '../../shared/PageObjects/BasePage';
import { LOCAL_CASES } from '../../shared/localCases';

const section51 = new PO_Section51();
const basePage = new BasePage();
const { officeUse } = LOCAL_CASES;

Given('I open the local section 51 advice page', () => {
	cy.fixture('s51Data').as('s51Data');
	section51.openLocalSection51AdvicePage(officeUse.id);
});

Then('I am on the local section 51 advice page', () => {
	section51.assertOnLocalSection51AdvicePage(officeUse.id);
});

Then('the section 51 advice page content is displayed', () => {
	cy.get('@s51Data').then((s51Data) => {
		basePage.locateH1ByText(s51Data.s51H1);
		basePage.locateH2ByText('Search advice');
		basePage.assertGovLink(s51Data.govLinkString);
	});
});

When('I search section 51 advice for an invalid term', () => {
	cy.get('@s51Data').then((s51Data) => {
		basePage.identifiers.govSearchTerm().clear().type(s51Data.invalidSearchTerm);
		basePage.clickGovSearchBtn();
	});
});

Then('the no section 51 advice results message is displayed', () => {
	cy.get('@s51Data').then((s51Data) => {
		section51.assertUrlIncludes(s51Data.invalidSearchTerm);
		basePage.visibleGovBody(s51Data.noResultsString);
	});
});

When('I clear the current section 51 advice search', () => {
	basePage.clickGovLink('Clear search');
});

Then('section 51 advice results are displayed', () => {
	section51.assertResultsPanel();
	section51.identifiers.resultItems().its('length').should('be.gte', 1);
	section51.verifyResultStructure();
});

When('I change section 51 results per page to {string}', (count) => {
	section51.selectFilterOptions(count);
});

Then('the section 51 advice url includes {string}', (value) => {
	section51.assertUrlIncludes(value);
});

When('I open the first section 51 advice result', () => {
	section51.clickFirstResultAndVerifyH1();
});

Then('the section 51 advice detail page is displayed', () => {
	section51.assertSummaryListVisible();
	basePage.locateH2ByText('Advice given');
});

When('I return to the section 51 advice list', () => {
	section51.clickBackToListBtn();
});

Then('the section 51 related guides are displayed', () => {
	const ariaLabel = 'Related guides navigation';
	section51.assertRelatedGuidesMenu(ariaLabel);
	section51.assertRelatedGuidesMenuItems(ariaLabel);
});
