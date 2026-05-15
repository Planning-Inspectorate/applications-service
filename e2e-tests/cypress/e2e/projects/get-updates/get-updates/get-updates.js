import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { PO_GetUpdates } from '../PageObjects/PO_GetUpdates';
import { LOCAL_CASES } from '../../shared/localCases';

const getUpdates = new PO_GetUpdates();
const { northLincolnshire } = LOCAL_CASES;

Given('I open the local project information page for updates', () => {
	getUpdates.openProjectInformationPage(northLincolnshire.id);
});

When('I open the get updates journey from the project information page', () => {
	getUpdates.clickProjectInformationMenuLink('get-updates');
});

When('I start the get updates journey', () => {
	getUpdates.clickStartButton();
});

When('I enter {string} as the get updates email address', (email) => {
	cy.wrap(email).as('subscriptionEmail');
	getUpdates.typeEmailAddress(email);
	getUpdates.clickButton('Continue');
});

When('I choose to receive all project updates', () => {
	getUpdates.startAllUpdatesSubscription(northLincolnshire.id);
});

Then('I am on the get updates confirmation page', () => {
	getUpdates.assertOnConfirmationPage(northLincolnshire.id);
});

When('I complete the get updates confirmation through the local api', () => {
	getUpdates.completeConfirmationThroughLocalApi(northLincolnshire.id);
});

Then('I see the get updates success page', () => {
	getUpdates.assertSuccessPage();
});

Then('I can return to the local project information page from the success page', () => {
	getUpdates.returnToProjectInformation(northLincolnshire.id);
	getUpdates.assertReturnedToProjectInformation(northLincolnshire.id);
});
