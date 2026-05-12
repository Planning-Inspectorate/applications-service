import { Given, Then, And } from 'cypress-cucumber-preprocessor/steps';
import PO_GuideNavigation from '../common/PageObjects/PO_GuideNavigation';

const guideNavigation = new PO_GuideNavigation();

Given('I navigate to Decision making process guide page', () => {
	guideNavigation.openDecisionMakingProcessGuide();
});

Then('I am on the {string} page', (pageName) => {
	guideNavigation.assertOnPage(pageName);
});

And('I click on show all link', () => {
	guideNavigation.expandAllSteps();
});

And('I click on {string} link', (pageName) => {
	guideNavigation.clickGuideLink(pageName);
});

Then('I verify below links present on Pre-examination page', function (table) {
	guideNavigation.assertLinksPresentOnPage(table);
});
