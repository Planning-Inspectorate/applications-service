import { Given, Then, And } from 'cypress-cucumber-preprocessor/steps';
import PO_GuideNavigation from '../../common/PageObjects/PO_GuideNavigation';
import PO_SayAtPreApplication from '../PageObjects/PO_SayAtPreApplication';

const guideNavigation = new PO_GuideNavigation();
const sayAtPreApplication = new PO_SayAtPreApplication();

Given('I navigate to Having your say at the pre-application stage page', () => {
	guideNavigation.openHavingYourSayGuide();
	guideNavigation.expandAllSteps();
	guideNavigation.clickTakingPartInPreApplicationLink();
});

Then('I am on the {string} page', (pageName) => {
	sayAtPreApplication.assertOnPage(pageName);
});

Then(
	'I verify below links present on Having your say at the pre-application stage',
	function (table) {
		sayAtPreApplication.assertLinksPresentOnPage(table);
	}
);

And('I click on {string} link', (pageName) => {
	guideNavigation.clickGuideLink(pageName);
});

And('I click on registering to have your say about a national infrastructure project link', () => {
	guideNavigation.clickRegisteringToHaveYourSayLink();
});

And('I click on get involved in the preliminary meeting link', () => {
	guideNavigation.clickGetInvolvedInPreliminaryMeetingLink();
});

And('I click on Next link', () => {
	guideNavigation.clickNextStep();
});

And('I click on Having your say during the examination of the project link', () => {
	guideNavigation.clickHaveYourSayDuringExaminationLink();
});
