import { Given, Then, And } from 'cypress-cucumber-preprocessor/steps';
import PO_OverviewPage from './PageObjects/PO_OverviewPage';
const overviewPage = new PO_OverviewPage();

Given('I navigate to {string} project Overview page', (projectName) => {
	overviewPage.openProjectOverview(projectName);
});

Then('I am on the {string} page', (pageName) => {
	overviewPage.assertOnPage(pageName);
});

And('I click on register to have your say about national infrastructure project link', () => {
	overviewPage.clickRegisterToHaveYourSayLink();
});

And('I click on {string} link', (pageName) => {
	overviewPage.clickContentsNavigationLink(pageName);
});

And('I click on Apply filters', () => {
	overviewPage.clickOnApplyFilters();
});

And('I click on Having your say about a national infrastructure project link', () => {
	overviewPage.clickHavingYourSayGuideLink();
});
