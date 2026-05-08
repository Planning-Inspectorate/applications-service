import PageObject from '../../PageObject';

const guideLinks = {
	'Get involved in the preliminary meeting':
		'/having-your-say-guide/get-involved-preliminary-meeting',
	'Registering to have your say about a national infrastructure project':
		'/having-your-say-guide/registering-have-your-say'
};

class PO_RegisterToSayAboutNationalInfraProject extends PageObject {
	identifiers = {
		...this.identifiers,
		showAllButton: () => cy.get('.js-step-controls-button-text'),
		projectLink: () => cy.get('#project-link')
	};

	get functions() {
		return new Proxy(
			{},
			{
				get: (_, prop) => this[prop].bind(this)
			}
		);
	}

	openGuidePage() {
		cy.visit('/having-your-say-guide');
	}

	openGuidePageFromRelatedGuides() {
		this.clickLinkByHref('/having-your-say-guide');
	}

	openOverviewPage(projectName) {
		cy.visit('/project-search');
		this.clickProjectLink(projectName);
	}

	expandAllSteps() {
		this.identifiers.showAllButton().click();
	}

	clickHowToRegisterLink() {
		this.clickLinkByHref('/having-your-say-guide/registering-have-your-say');
	}

	clickGuideLink(pageName) {
		const target = guideLinks[pageName];

		if (!target) {
			throw new Error(`Cannot find Page Name: ${pageName}`);
		}

		this.clickLinkByHref(target);
	}

	clickGetInvolvedInPreliminaryMeetingLink() {
		this.clickGuideLink('Get involved in the preliminary meeting');
	}

	clickRegisteringToHaveYourSayLink() {
		this.clickGuideLink('Registering to have your say about a national infrastructure project');
	}

	assertProjectLinkAbsent() {
		this.identifiers.projectLink().should('not.exist');
	}
}
export default PO_RegisterToSayAboutNationalInfraProject;
