import { Given, Then, And } from 'cypress-cucumber-preprocessor/steps';
import PO_GuideNavigation from '../common/PageObjects/PO_GuideNavigation';

const guideNavigation = new PO_GuideNavigation();

Given('I navigate to Having your say about a national infrastructure project page', () => {
	guideNavigation.openHavingYourSayGuide();
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
