import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { BasePage } from '../../shared/PageObjects/BasePage';
import PO_ProjectInformation from '../PageObjects/PO_ProjectInformation';
import { LOCAL_CASES } from '../../shared/localCases';

const basePage = new BasePage();
const projectInformation = new PO_ProjectInformation();
const { northLincolnshire } = LOCAL_CASES;

Given('I open the local project information page', () => {
	projectInformation.openProjectInformationPage(northLincolnshire.id);
});

Then('I am on the local project information page', () => {
	projectInformation.assertOnProjectInformationPage(northLincolnshire.id);
});

Then('the project information page shows these sections', (dataTable) => {
	dataTable.hashes().forEach(({ Section }) => {
		basePage.locateH2ByText(Section);
	});
});

Then('the project information page shows these details', (dataTable) => {
	dataTable.hashes().forEach(({ Detail }) => {
		basePage.visibleGovBody(Detail);
	});
});

Then('the project location map is displayed', () => {
	basePage.visibleGovMap();
});

When('I open the register to have your say journey from the project information page', () => {
	projectInformation.clickProjectInformationMenuLink('register-to-have-your-say');
});

Then('I am on the register to have your say page', () => {
	projectInformation.assertOnRegisterToHaveYourSayPage();
});

When('I return to the local project information page from project navigation', () => {
	projectInformation.clickProjectInformationMenuLink('projects');
});

When('I open the get updates journey from the project information page', () => {
	projectInformation.clickProjectInformationMenuLink('get-updates');
});

Then('I am on the get updates start page', () => {
	projectInformation.assertOnGetUpdatesStartPage(northLincolnshire.id);
});

Then('the get updates privacy notice link is displayed', () => {
	basePage.clickGovInset(
		'Read the privacy notice to see how we handle your information',
		'/customer-privacy-notice'
	);
});
