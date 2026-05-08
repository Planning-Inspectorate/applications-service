import PageObject from '../../PageObject';

const guideLinks = {
	'the nationally significant infrastructure planning process step by step':
		'/having-your-say-guide/index',
	'taking part in the pre-application stage': '/having-your-say-guide/taking-part-pre-application',
	'registering to have your say about a national infrastructure project':
		'/having-your-say-guide/registering-have-your-say',
	'get involved in the preliminary meeting':
		'/having-your-say-guide/get-involved-preliminary-meeting',
	'have your say during the examination of the project':
		'/having-your-say-guide/have-your-say-examination',
	'what happens after a decision has been made':
		'/having-your-say-guide/what-happens-after-decision'
};

class PO_RegisterToSayAboutNationalInfraProject extends PageObject {
	identifiers = {
		...this.identifiers,
		showAllButton: () => cy.get('.js-step-controls-button-text'),
		projectLinkCard: () => cy.get('#project-link')
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
		const target = guideLinks[pageName.toLowerCase()];

		if (!target) {
			throw new Error(`Cannot find Page Name: ${pageName}`);
		}

		this.clickLinkByHref(target);
	}

	clickGetInvolvedInPreliminaryMeetingLink() {
		this.clickGuideLink('get involved in the preliminary meeting');
	}

	clickRegisteringToHaveYourSayLink() {
		this.clickGuideLink('registering to have your say about a national infrastructure project');
	}

	assertProjectLinkAbsent() {
		this.identifiers.projectLinkCard().should('not.exist');
	}
}
export default PO_RegisterToSayAboutNationalInfraProject;
