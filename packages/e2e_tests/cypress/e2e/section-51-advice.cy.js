import { PO_Section51 } from '../pageObject/section-51-advice/PO_Section51';
import { BasePage } from '../pageObject/basePage';

const section51 = new PO_Section51();
const basePage = new BasePage();

let s51Data;

const filterOptions = [50, 25, 100];

describe('User can review and search Section 51 advice', () => {
	before(() => {
		cy.clearCookies();
		cy.fixture('s51Data').then((data) => {
			s51Data = data;
		});
		cy.navigateAndSearch('Front Office Auto Test');
	});

	it('Should navigate to the Section 51 page and verify page content', () => {
		basePage.clickProjectInformationMenuLink('s51');
		cy.url().should('include', '/s51advice');
		basePage.locateH1ByText(s51Data.s51H1);
		basePage.locateH2ByText('Search advice');
		basePage.assertGovLink(s51Data.govLinkString);
	});

	it('Should perform a search which returns no results', () => {
		basePage.govSearchTermType(s51Data.invalidSearchTerm);
		basePage.clickGovSearchBtn();
		cy.url().should('include', s51Data.invalidSearchTerm);
		basePage.visibleGovBody(s51Data.noResultsString);
		basePage.clickGovLink('Clear search');
	});

	it('Should perform a search which returns results', () => {
		basePage.govSearchTermType(s51Data.validsearchTerm);
		basePage.clickGovSearchBtn();
		cy.url().should('include', s51Data.validsearchTerm);
		section51.assertResultsPanel();
		section51.verifyResultStructure();
	});

	filterOptions.forEach((option) => {
		it(`Should correctly apply the filter for ${option} results`, () => {
			section51.selectFilterOptions(option);
			cy.url().should('contain', `itemsPerPage=${option}`);
		});
	});

	it('Should click a result and verify page structure on result page', () => {
		const expectedKeys = ['From', 'Date advice given', 'Enquiry type'];
		section51.clickFirstResultAndVerifyH1();
		section51.verifySummaryList(expectedKeys);
		basePage.locateH2ByText('Advice given');
		basePage.locateH2ByText('Attachments');
	});

	it('Should return to the s51 advice page', () => {
		section51.clickBackToListBtn();
		cy.url().should('include', '/s51advice');
	});

	it('Should assert the realted guides are visible on the s51 advice page', () => {
		const ariaLabel = 'Related guides navigation';

		section51.assertRelatedGuidesMenu(ariaLabel);
		section51.assertRelatedGuidesMenuItems(ariaLabel);
	});
});
