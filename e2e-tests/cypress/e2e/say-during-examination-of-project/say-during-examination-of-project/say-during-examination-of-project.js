import { Given, Then, And } from 'cypress-cucumber-preprocessor/steps';
import PO_GuideNavigation from '../../common/PageObjects/PO_GuideNavigation';
import PO_SayDuringExaminationOfProject from '../PageObjects/PO_SayDuringExaminationOfProject';

const guideNavigation = new PO_GuideNavigation();
const sayDuringExaminationOfProject = new PO_SayDuringExaminationOfProject();

Given('I navigate to Have your say during the examination of the project page', () => {
	guideNavigation.openHavingYourSayGuide();
	guideNavigation.expandAllSteps();
	guideNavigation.clickHaveYourSayDuringExaminationLink();
});

Then(
	'I verify below links present on Have your say during the examination of the project',
	function (table) {
		sayDuringExaminationOfProject.assertLinksPresentOnPage(table);
	}
);

Then('I am on the {string} page', (pageName) => {
	sayDuringExaminationOfProject.assertOnPage(pageName);
});

And('I click on {string} link', (pageName) => {
	guideNavigation.clickGuideLink(pageName);
});

And('I click on Next link', () => {
	guideNavigation.clickWhatHappensAfterDecisionLink();
});

And('I click on What you can do after the decision has been made link', () => {
	guideNavigation.clickWhatHappensAfterDecisionLink();
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
