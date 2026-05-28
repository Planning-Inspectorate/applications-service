import { BasePage } from '../../shared/PageObjects/BasePage';

class PO_ProjectInformation extends BasePage {
	identifiers = {
		...this.identifiers,
		mainHeading: () => cy.get('h1')
	};

	openProjectInformationPage(caseId) {
		cy.visit(`/projects/${caseId}`);
	}

	assertOnProjectInformationPage(caseId) {
		cy.url().should('include', `/projects/${caseId}`);
		this.identifiers.mainHeading().contains('Project information').should('be.visible');
	}

	assertOnRegisterToHaveYourSayPage() {
		cy.url().should('include', '/register-have-your-say');
		this.identifiers.mainHeading().contains('Register to have your say').should('be.visible');
	}

	assertOnGetUpdatesStartPage(caseId) {
		cy.url().should('include', `/projects/${caseId}/get-updates/start`);
		this.identifiers.mainHeading().contains('Get updates').should('be.visible');
	}
}

export default PO_ProjectInformation;
