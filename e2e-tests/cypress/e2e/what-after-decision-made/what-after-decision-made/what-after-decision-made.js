import { Given, Then, And } from 'cypress-cucumber-preprocessor/steps';
import PO_GuideNavigation from '../../common/PageObjects/PO_GuideNavigation';
import PO_WhatAfterDecisionMade from '../PageObjects/PO_WhatAfterDecisionMade';

const guideNavigation = new PO_GuideNavigation();
const afterDecisionMade = new PO_WhatAfterDecisionMade();

Given('I navigate to what you can do after the decision has been made page', () => {
	guideNavigation.openHavingYourSayGuide();
	guideNavigation.expandAllSteps();
	guideNavigation.clickWhatHappensAfterDecisionLink();
});

Then(
	'I verify below links present on What you can do after the decision has been made',
	function (table) {
		afterDecisionMade.assertLinksPresentOnPage(table);
	}
);

Then('I am on the {string} page', (pageName) => {
	afterDecisionMade.assertOnPage(pageName);
});

And('I click on {string} link', (pageName) => {
	guideNavigation.clickGuideLink(pageName);
});

And('I click on Next link', () => {
	guideNavigation.clickFindAProjectLink();
});

And('I click on Find a project link', () => {
	guideNavigation.clickFindAProjectLink();
});

And('I click on registering to have your say about a national infrastructure project link', () => {
	guideNavigation.clickRegisteringToHaveYourSayLink();
});

And('I click on get involved in the preliminary meeting link', () => {
	guideNavigation.clickGetInvolvedInPreliminaryMeetingLink();
});

And('I click on what you can do after the decision has been made link', () => {
	guideNavigation.clickWhatHappensAfterDecisionLink();
});
