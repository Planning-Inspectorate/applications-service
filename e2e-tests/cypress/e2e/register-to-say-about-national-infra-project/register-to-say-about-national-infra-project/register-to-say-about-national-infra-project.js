import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import PO_RegisterToSayAboutNationalInfraProject from '../PageObjects/PO_RegisterToSayAboutNationalInfraProject';
const registerToSayAboutNationalInfraProject = new PO_RegisterToSayAboutNationalInfraProject();

Given('I have navigated to the "Have your say" guide', () => {
	registerToSayAboutNationalInfraProject.openGuidePage();
});

Given('I have selected the "Have your say" link from the related guides section', () => {
	registerToSayAboutNationalInfraProject.openGuidePageFromRelatedGuides();
});

Given('I have viewed the overview page for a project', () => {
	registerToSayAboutNationalInfraProject.openOverviewPage('North Lincolnshire Green Energy Park');
});

And('I click on show all link', () => {
	registerToSayAboutNationalInfraProject.expandAllSteps();
});
When('I select the "How to register link"', () => {
	registerToSayAboutNationalInfraProject.clickHowToRegisterLink();
});

Then(
	'I verify below links present on Registering to have your say about a national infrastructure project',
	function (table) {
		registerToSayAboutNationalInfraProject.assertLinksPresentOnPage(table);
	}
);

Then('I am on the {string} page', (pageName) => {
	registerToSayAboutNationalInfraProject.assertOnPage(pageName);
});

And('I click on {string} link', (pageName) => {
	registerToSayAboutNationalInfraProject.clickGuideLink(pageName);
});

And('I click on Next link', () => {
	registerToSayAboutNationalInfraProject.clickGetInvolvedInPreliminaryMeetingLink();
});

And('I click on Get involved in the preliminary meeting link', () => {
	registerToSayAboutNationalInfraProject.clickGetInvolvedInPreliminaryMeetingLink();
});

And('I click on registering to have your say about a national infrastructure project link', () => {
	registerToSayAboutNationalInfraProject.clickRegisteringToHaveYourSayLink();
});

And('I click on get involved in the preliminary meeting link', () => {
	registerToSayAboutNationalInfraProject.clickGetInvolvedInPreliminaryMeetingLink();
});

And('the page does not include a link to a project', () => {
	registerToSayAboutNationalInfraProject.assertProjectLinkAbsent();
});

Then('I click on feedback link', () => {
	registerToSayAboutNationalInfraProject.clickOnProvideFeedbackLink();
});
