import { PO_ProjectSearch } from '../pageObject/Search-and-project-pages/PO_ProjectSearch';
import { PO_ProjectPage } from '../pageObject/Search-and-project-pages/PO_ProjectPage';
import { PO_Documents } from '../pageObject/Documents/PO_Documents';

const projectSearch = new PO_ProjectSearch();
const projectPage = new PO_ProjectPage();
const documents = new PO_Documents();

describe('User navigates to the documents page and can filter or search project documents', () => {
	it('Navigates to a project documents page', () => {
		cy.clearCookies();
		cy.visit('/project-search/');
		projectSearch.findAndClickLink('A30 Temple to Higher Carblake Improvement');
		projectPage.findAndClickSidebarLinkLeft('Documents');
	});

	it('Sees a list of 25 Documents and can chancge view to 50 Documents', () => {
		documents.returnListOfDocuments().should('be.visible');
		documents.returnListOfDocuments().should('have.length', 25);
		documents.chooseNumberOfResults('50');
		documents.returnListOfDocuments().should('have.length', 50);
	});

	it('Can search for a document by typing a description', () => {
		documents.searchDocuments('Correction notice');
		documents.clickSearchButton();
		documents.returnListOfDocuments().should('be.visible');
		documents.checkFirstResultContainsString('Correction notice');
	});

	it('Can apply a filter to the list of documents and then remove that filter', () => {
		documents.clearAllFilters();
		documents.expandFilterOptions('Acceptance');
		documents.findAndSelectFilter('stage-2-6');
		projectPage.findAndClickButton('Apply filters');
		documents.checkPublishedTitles(['Environmental Statement']);
	});
});
