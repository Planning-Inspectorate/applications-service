import { When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import PO_FullName from '../full-name/PageObjects/PO_FullName';
import PO_OrgYouWorkFor from '../what-is-the-name-of-org-you-work-for/PageObjects/PO_OrgYouWorkFor';
import PO_EmailAddress from '../what-is-your-email-address/PageObjects/PO_EmailAddress';
import PO_TelNumber from '../what-is-your-telephone-number/PageObjects/PO_TelNumber';
import PO_AddressDetails from '../uk-address-details/PageObjects/PO_AddressDetails';
import PO_WhoYouRepresenting from '../who-are-you-representing/PageObjects/PO_WhoYouRepresenting';
import PO_RepName from '../representee-name/PageObjects/PO_RepName';
import PO_RepAddressDetails from '../what-is-their-address/PageObjects/PO_RepAddressDetails';
import PO_RepEmailAddress from '../what-is-their-email-address/PageObjects/PO_RepEmailAddress';
import PO_RepTelNumber from '../what-is-their-telephone-number/PageObjects/PO_RepTelNumber';
import PO_TellAboutProject from './PageObjects/PO_TellAboutProject';
const fullNamePage = new PO_FullName();
const orgYouWorkFor = new PO_OrgYouWorkFor();
const emailAddress = new PO_EmailAddress();
const telNumber = new PO_TelNumber();
const addressDetails = new PO_AddressDetails();
const whoYouRepresenting = new PO_WhoYouRepresenting();
const repName = new PO_RepName();
const repAddressDetails = new PO_RepAddressDetails();
const repEmailAddress = new PO_RepEmailAddress();
const repTelNumber = new PO_RepTelNumber();
const tellAboutProject = new PO_TellAboutProject();

const shortComment = 'I am against the proposal since it will reduce resident parking provision';

And('I have been asked to provide comments on a proposed project', () => {
	fullNamePage.enterTextIntoFullNameField('TestFirstName TestMiddleName TestLastName');
	cy.clickSaveAndContinue();
	orgYouWorkFor.enterTextIntoOrgNameField('Test Organisation Name');
	cy.clickSaveAndContinue();
	emailAddress.enterTextIntoEmailField('testpins2@gmail.com');
	cy.clickSaveAndContinue();
	telNumber.enterTextIntoTelephoneNumberField('123456789');
	cy.clickSaveAndContinue();
	addressDetails.enterTextFromObjectIntoAddressFields({
		AddressLine1: 'Address Line 1',
		PostCode: 'NE27 0BB',
		Country: 'United Kingdom'
	});
	cy.clickSaveAndContinue();
	whoYouRepresenting.selectRadioOption('A person');
	cy.clickSaveAndContinue();
	repName.enterTextIntoRepNameField('Representee FirstName Representee LastName');
	cy.clickSaveAndContinue();
	cy.selectRadioYesOrNo('Yes');
	cy.clickSaveAndContinue();
	repAddressDetails.enterTextFromObjectIntoAddressFields({
		AddressLine1: 'Representee Address Line 1',
		PostCode: 'NE27 0BB',
		Country: 'United Kingdom'
	});
	cy.clickSaveAndContinue();
	repEmailAddress.enterTextIntoRepEmailField('representeetestpins2@gmail.com');
	cy.clickSaveAndContinue();
	repTelNumber.enterTextIntoRepTelephoneNumberField('12121212121');
	cy.clickSaveAndContinue();
});

And('I continue with an empty value in the comments field', () => {
	cy.clickSaveAndContinue();
});

And('I save and exit with an empty value in the comments field', () => {
	cy.get('[data-cy="button-save-and-return"]').first().click();
	cy.wait(Cypress.env('demoDelay'));
});

And('I continue with a comment beyond the maximum characters allowed', () => {
	cy.fixture('comment-too-long.txt').then((comment) => {
		tellAboutProject.enterTextIntoCommentsFieldDirectly(comment.trim());
		cy.clickSaveAndContinue();
	});
});

And('I save and exit with a comment beyond the maximum characters allowed', () => {
	cy.fixture('comment-too-long.txt').then((comment) => {
		tellAboutProject.enterTextIntoCommentsFieldDirectly(comment.trim());
		cy.get('[data-cy="button-save-and-return"]').first().click();
		cy.wait(Cypress.env('demoDelay'));
	});
});

And('I continue with a comment at the maximum characters allowed', () => {
	cy.fixture('comment-max-length.txt').then((comment) => {
		tellAboutProject.enterTextIntoCommentsFieldDirectly(comment.trim());
		cy.clickSaveAndContinue();
	});
});

And('I save and exit with a comment at the maximum characters allowed', () => {
	cy.fixture('comment-max-length.txt').then((comment) => {
		tellAboutProject.enterTextIntoCommentsFieldDirectly(comment.trim());
		cy.get('[data-cy="button-save-and-return"]').first().click();
		cy.wait(Cypress.env('demoDelay'));
	});
});

And('I continue with a short comment', () => {
	tellAboutProject.enterTextIntoCommentsField(shortComment);
	cy.clickSaveAndContinue();
});

And('I save and exit with a short comment', () => {
	tellAboutProject.enterTextIntoCommentsField(shortComment);
	cy.get('[data-cy="button-save-and-return"]').first().click();
	cy.wait(Cypress.env('demoDelay'));
});

And('I enter {string} into topic field', (dataInput) => {
	tellAboutProject.enterTextIntoTopicField(dataInput);
});

When(
	'user selects {string} radio option on Do you want to add another comment page',
	(radioChoice) => {
		cy.selectRadioYesOrNo(radioChoice);
	}
);

Then('advice to not include any personal details is present on the page', () => {
	tellAboutProject.assertDoNotIncludePersonalDetailsPresent();
});

Then('I can see email sent confirmation text', () => {
	cy.get('[data-cy="email-confirmation"]').should(
		'contain.text',
		'We have sent a link to get back to your saved registration to: testpins2@gmail.com'
	);
});
