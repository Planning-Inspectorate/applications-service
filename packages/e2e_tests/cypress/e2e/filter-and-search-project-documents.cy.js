import { PO_ProjectPage } from '../pageObject/Search-and-project-pages/PO_ProjectPage';
import { PO_Documents } from '../pageObject/Documents/PO_Documents';
import { BasePage } from '../pageObject/basePage';

const projectPage = new PO_ProjectPage();
const documents = new PO_Documents();
const basePage = new BasePage();

describe('User navigates to the documents page and can filter or search project documents', () => {
	it('Navigates to a project documents page', () => {
		cy.clearCookies();
		cy.visit('/projects/BC0910150/');
		projectPage.findAndClickSidebarLinkLeft('Documents');
	});

	it('Sees a list of 3 Documents and can chancge view to 50 Documents', () => {
		documents.returnListOfDocuments().should('be.visible');
		documents.returnListOfDocuments().should('have.length', 4);
		documents.chooseNumberOfResults('50');
		documents.returnListOfDocuments().should('have.length', 4);
	});

	it('Can search for a document by typing a description', () => {
		documents.searchDocuments('Rule 8 letter');
		documents.clickSearchButton();
		documents.returnListOfDocuments().should('be.visible');
		documents.checkFirstResultContainsString('Rule 8 letter');
		basePage.clickGovLink('Clear all filters');
	});

	it('Can apply a filter to the list of documents and then remove that filter', () => {
		documents.expandFilterOptions('Acceptance');
		basePage.selectCheckBox('test change two');
		projectPage.findAndClickButton('Apply filters');
		documents.checkPublishedTitles(['test change two']);
	});
});
