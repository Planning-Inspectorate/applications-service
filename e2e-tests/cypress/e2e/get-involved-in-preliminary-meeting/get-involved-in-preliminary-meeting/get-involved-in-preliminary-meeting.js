import { Given, Then, And } from 'cypress-cucumber-preprocessor/steps';
import PO_GuideNavigation from '../../common/PageObjects/PO_GuideNavigation';
import PO_GetInvolvedInPreliminaryMeeting from '../PageObjects/PO_GetInvolvedInPreliminaryMeeting';

const guideNavigation = new PO_GuideNavigation();
const getInvolvedInPreliminaryMeeting = new PO_GetInvolvedInPreliminaryMeeting();

Given('I navigate to Get involved in the preliminary meeting page', () => {
	guideNavigation.openHavingYourSayGuide();
	guideNavigation.expandAllSteps();
	guideNavigation.clickGetInvolvedInPreliminaryMeetingLink();
});

Then('I verify below links present on Get involved in the preliminary meeting', function (table) {
	getInvolvedInPreliminaryMeeting.assertLinksPresentOnPage(table);
});

Then('I am on the {string} page', (pageName) => {
	getInvolvedInPreliminaryMeeting.assertOnPage(pageName);
});

And('I click on {string} link', (pageName) => {
	guideNavigation.clickGuideLink(pageName);
});

And('I click on Next link', () => {
	guideNavigation.clickNextStep();
});

And('I click on Having your say during the examination of the project link', () => {
	guideNavigation.clickHaveYourSayDuringExaminationLink();
});

And('I click on registering to have your say about a national infrastructure project link', () => {
	guideNavigation.clickRegisteringToHaveYourSayLink();
});

And('I click on get involved in the preliminary meeting link', () => {
	guideNavigation.clickGetInvolvedInPreliminaryMeetingLink();
});

And('I click on Have your say during the examination of the project link', () => {
	guideNavigation.clickHaveYourSayDuringExaminationLink();
});
