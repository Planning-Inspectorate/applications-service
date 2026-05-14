import PageObject from '../../PageObject';

const guideLinkTargets = {
	'the nationally significant infrastructure planning process step by step':
		'/having-your-say-guide/index',
	'taking part in the pre-application stage': '/having-your-say-guide/taking-part-pre-application',
	'having your say at pre-application stage': '/having-your-say-guide/have-say-pre-application',
	'registering to have your say about a national infrastructure project':
		'/having-your-say-guide/registering-have-your-say',
	'get involved in the preliminary meeting':
		'/having-your-say-guide/get-involved-preliminary-meeting',
	'have your say during the examination of the project':
		'/having-your-say-guide/have-your-say-examination',
	'what happens after a decision has been made':
		'/having-your-say-guide/what-happens-after-decision',
	'find out more about the decision making process for national infrastructure projects':
		'/decision-making-process-guide',
	'find out what you can do at this stage and check our detailed guides':
		'/decision-making-process-guide/pre-application',
	'how the acceptance stage works and what happens next':
		'/decision-making-process-guide/review-of-the-application',
	'what happens during the pre-examination stage': '/decision-making-process-guide/pre-examination',
	'what happens at the examination stage':
		'/decision-making-process-guide/examination-of-the-application',
	'making a recommendation': '/decision-making-process-guide/recommendation',
	'who makes the final decision': '/decision-making-process-guide/decision',
	'what you can do after the decision has been made':
		'/decision-making-process-guide/what-happens-after-the-decision-is-made',
	'find a project': '/project-search'
};

class PO_GuideNavigation extends PageObject {
	identifiers = {
		...this.identifiers,
		showAllButton: () => cy.get('.js-step-controls-button-text'),
		nextStepLink: () => cy.get('.ui-next-step a'),
		howToRegisterLink: () => cy.get('a[href*="/having-your-say-guide/registering-have-your-say"]')
	};

	openDecisionMakingProcessGuide() {
		cy.visit('/decision-making-process-guide');
	}

	openHavingYourSayGuide() {
		cy.visit('/having-your-say-guide');
	}

	openHavingYourSayGuideFromRelatedGuides() {
		this.clickLinkByHref('/having-your-say-guide');
	}

	expandAllSteps() {
		this.identifiers.showAllButton().click();
	}

	clickGuideLink(pageName) {
		const target = guideLinkTargets[pageName.toLowerCase()];

		if (!target) {
			throw new Error(`Cannot find Page Name: ${pageName}`);
		}

		this.clickLinkByHref(target);
	}

	clickHowToRegisterLink() {
		this.identifiers.howToRegisterLink().click();
	}

	clickNextStep() {
		this.identifiers.nextStepLink().click();
	}

	clickGetInvolvedInPreliminaryMeetingLink() {
		this.clickGuideLink('get involved in the preliminary meeting');
	}

	clickRegisteringToHaveYourSayLink() {
		this.clickGuideLink('registering to have your say about a national infrastructure project');
	}

	clickHaveYourSayDuringExaminationLink() {
		this.clickGuideLink('have your say during the examination of the project');
	}

	clickWhatHappensAfterDecisionLink() {
		this.clickGuideLink('what happens after a decision has been made');
	}

	clickTakingPartInPreApplicationLink() {
		this.clickGuideLink('Taking part in the pre-application stage');
	}

	clickFindAProjectLink() {
		this.clickGuideLink('find a project');
	}
}

export default PO_GuideNavigation;
