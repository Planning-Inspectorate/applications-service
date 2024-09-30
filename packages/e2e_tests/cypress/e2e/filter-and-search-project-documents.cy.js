import { PO_Documents } from '../pageObject/Documents/PO_Documents';
import { BasePage } from '../pageObject/basePage';

const documents = new PO_Documents();
const basePage = new BasePage();

const filterOptions = [50, 25, 100];

describe('User navigates to the documents page and can filter or search project documents', () => {
	before(() => {
		cy.clearCookies();
		cy.navigateAndSearch('Front Office');
	});

	it('Should navigate to the project documents page from the side menu', () => {
		basePage.clickProjectInformationMenuLink('documents');
		basePage.locateH1ByText('Documents');
		cy.url('include', '/documents');
	});

	filterOptions.forEach((option) => {
		it(`Should correctly apply the filter for ${option} results`, () => {
			basePage.selectFilterOptions(option);
			cy.url().should('contain', `itemsPerPage=${option}`);
		});
	});

	it('Should search for a term which does not return a result', () => {
		basePage.govSearchTermType('ytrewq');
		documents.clickSearchButton();
		basePage.visibleGovBodyCy('No results');
		basePage.clickGovLink('Clear search and filters');
	});

	it('Should search for a term which returns a result', () => {
		basePage.govSearchTermType('test');
		documents.clickSearchButton();
		documents.sectionResultsVisible();
		documents.verifyResultStructure();
	});

	it('Should assert the related guides are visible in documents page', () => {
		documents.assertRelatedGuidesMenu('Related guides navigation');
		documents.assertRelatedGuidesMenuItems('Related guides navigation');
		documents.assertFilterMenu('Filter');
	});

	it('Should assert the filter menu is visible', () => {
		documents.assertFilterMenu('Filter');
	});
});
