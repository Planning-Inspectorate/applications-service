import { Then } from 'cypress-cucumber-preprocessor/steps';
import PageObject from '../PageObject';
import PO_RegisterToSayAboutNationalInfraProject from '../register-to-say-about-national-infra-project/PageObjects/PO_RegisterToSayAboutNationalInfraProject';

const page = new PageObject();
const registerGuidePage = new PO_RegisterToSayAboutNationalInfraProject();

Then('I am on the {string} page', (pageName) => {
	page.assertOnPage(pageName);
});

Then('the page includes a link to the project', () => {
	registerGuidePage.assertProjectLinkPresent();
});
