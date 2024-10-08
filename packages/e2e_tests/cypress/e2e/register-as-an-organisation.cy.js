import { PO_HaveYourSay } from '../pageObject/Register-to-have-your-say/PO_HaveYourSay';
import { BasePage } from '../pageObject/basePage';

const haveYourSay = new PO_HaveYourSay();
const basePage = new BasePage();

let caseData;

describe('Register as an organisation to have your say', () => {
	before(() => {
		cy.clearCookies();
		cy.fixture('caseData').then((data) => {
			// Assign the loaded fixture data
			caseData = data;
		});
		cy.navigateAndSearch('Front Office');
	});

	it('Should click on register to have your say link and assert page content', () => {
		basePage.clickProjectInformationMenuLink('register-to-have-your-say');
		cy.url().should('include', '/register/register-have-your-say');
		basePage.locateH1ByText('Register to have your say about a national infrastructure project');
	});

	it('Should start the registration journey', () => {
		basePage.clickGovBtn('Start now');
	});

	it('Should check an organisation I work or volunteer for', () => {
		cy.url().should('include', '/register/who-registering-for');
		basePage.locateH1ByText(caseData.headingText.registeringForPage);
		basePage.checkGovRadioBtn('organisation');
		cy.saveAndContinue();
	});

	it('Should enter your full name and continue', () => {
		const fullName = `${caseData.contactDetails.firstName} ${caseData.contactDetails.lastName}`;

		basePage.locateH1ByText(caseData.headingText.yourFullNamePage);
		basePage.typeInputField('full-name', fullName);
		cy.saveAndContinue();
	});

	it('Should confirm you are over 18 and continue', () => {
		basePage.locateH1ByText(caseData.headingText.yourAgePage);
		basePage.checkGovRadioBtn('yes');
		cy.saveAndContinue();
	});

	it('Shpould enter your organisation name and continue', () => {
		basePage.locateH1ByText(caseData.headingText.yourOrgOrCharityPage);
		basePage.typeInputField('organisation-name', caseData.contactDetails.organisationName);
		cy.saveAndContinue();
	});

	it('Should enter your job title or volunteer role and contiune', () => {
		basePage.locateH1ByText(caseData.headingText.yourJobTitlePage);
		basePage.typeInputField('role', caseData.contactDetails.jobTitle);
		cy.saveAndContinue();
	});

	it('Should enter your email address and continue', () => {
		basePage.locateH1ByText(caseData.headingText.yourEmailAdressPage);
		basePage.typeInputField('email', caseData.contactDetails.email);
		cy.saveAndContinue();
	});

	it('Enter your address and continue', () => {
		basePage.locateH1ByText(caseData.headingText.yourAddressPage);
		basePage.typeInputField('line1', caseData.caseAddress.addressLine1);
		basePage.typeInputField('line2', caseData.caseAddress.addressLine2);
		basePage.typeInputField('line3', caseData.caseAddress.testTown);
		basePage.typeInputField('postcode', caseData.caseAddress.addressPostcode);
		basePage.typeInputField('country', caseData.caseAddress.testContury);
		cy.saveAndContinue();
	});

	it('Should enter your telephone number and continue', () => {
		basePage.locateH1ByText(caseData.headingText.yourTelephoneNumberPage);
		basePage.typeInputField('telephone', caseData.contactDetails.telephoneNumber);
		cy.saveAndContinue();
	});

	it('Should add a comment against a project and continue', () => {
		basePage.locateH1ByText(caseData.headingText.addCommentPage);
		basePage.typeInputField('comment', caseData.commentOnCase);
		basePage.assertDropDownDetails(
			'Use of language, hyperlinks and sensitive information',
			'Examples of sensitive information'
		);
		cy.saveAndContinue();
	});

	it('Should assert the information entered and make changes to entered information', () => {
		const inputData = [
			{
				field: 'full-name',
				originalValue: `${caseData.contactDetails.firstName} ${caseData.contactDetails.lastName}`,
				updatedValue: `${caseData.updatedContactDetials.firstName} ${caseData.updatedContactDetials.lastName}`,
				pageHeading: caseData.headingText.yourFullNamePage
			},
			{
				field: 'telephone',
				originalValue: caseData.contactDetails.telephoneNumber,
				updatedValue: caseData.updatedContactDetials.telephoneNumber,
				pageHeading: caseData.headingText.yourTelephoneNumberPage
			},
			{
				field: 'address',
				originalValue: caseData.caseAddress.addressLine1,
				updatedValue: caseData.updatedCaseAddress.addressLine1,
				pageHeading: caseData.headingText.yourAddressPage
			},
			{
				field: 'email',
				originalValue: caseData.contactDetails.email,
				updatedValue: caseData.updatedContactDetials.email,
				pageHeading: caseData.headingText.yourEmailAdressPage
			},
			{
				field: 'comment',
				originalValue: caseData.commentOnCase,
				updatedValue: caseData.updatedCommentOnCase,
				pageHeading: caseData.headingText.addCommentPage
			},
			{
				field: 'organisation-name',
				originalValue: caseData.contactDetails.organisationName,
				updatedValue: caseData.updatedContactDetials.organisationName,
				pageHeading: caseData.headingText.organisationNamePage
			}
		];

		basePage.locateH1ByText(caseData.headingText.checkYourAnswersPage);
		basePage.locateH2ByText('Personal details');

		inputData.forEach(({ field, originalValue, updatedValue, pageHeading }) => {
			if (field === 'address' || field === 'organisation-name') {
				// Handle fields without a unique data-cy tag (address and organisationName)
				cy.contains(originalValue); // Use contains to find the value
				haveYourSay.clickChangeButton(field); // Click Change button

				// Enter updated data for address or organisationName
				if (field === 'address') {
					basePage.typeInputField('line1', caseData.updatedCaseAddress.addressLine1);
					basePage.typeInputField('line2', caseData.updatedCaseAddress.addressLine2);
					basePage.typeInputField('line3', caseData.updatedCaseAddress.testTown);
					basePage.typeInputField('postcode', caseData.updatedCaseAddress.addressPostcode);
					basePage.typeInputField('country', caseData.updatedCaseAddress.testContury);
				} else if (field === 'organisation-name') {
					basePage.typeInputField(
						'organisation-name',
						caseData.updatedContactDetials.organisationName
					);
				}

				// Save and continue
				cy.saveAndContinue();

				// Assert that the updated data is correctly displayed on the summary page
				cy.contains(updatedValue);
			} else {
				// Handle fields that have data-cy tags
				haveYourSay.assertYourEnteredData(field, originalValue);

				// Click the "Change" button to modify the field's data
				haveYourSay.clickChangeButton(field);

				// Assert url to ensure you're on the right page
				cy.url().should('include', '?mode=edit');

				// Assert page heading to ensure you're on the correct page
				basePage.locateH1ByText(pageHeading);

				// Enter the updated data into the field
				basePage.typeInputField(field, updatedValue);

				// Submit the form to return to the summary page
				cy.saveAndContinue();

				// Assert that the updated data is correctly displayed on the summary page
				haveYourSay.assertYourEnteredData(field, updatedValue);
			}
		});

		// Final submission
		basePage.clickGovBtn('Continue to declaration');
	});

	it('Should agree to the declaration continue', () => {
		basePage.locateH1ByText(caseData.headingText.declarationPage);
		basePage.clickGovBtn('Accept and continue');
	});

	it('Should be taken to the registration complete page', () => {
		basePage.checkConfirmationMessage('Registration complete', 9);
		basePage.locateH2ByText('Getting involved in the preliminary meeting');
		basePage.locateH2ByText('How and when to submit more information');
		basePage.clickGovLink('Go back to the project page');
	});

	it('Should verify you are taken back to project page', () => {
		cy.url().should('include', '/projects');
		basePage.locateH1ByText('Project information');
	});
});
