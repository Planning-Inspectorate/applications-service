import { PO_HaveYourSay } from '../pageObject/Register-to-have-your-say/PO_HaveYourSay';
import { BasePage } from '../pageObject/basePage';

const haveYourSay = new PO_HaveYourSay();
const basePage = new BasePage();

let caseData;

const representationOptions = [
	{ representation: 'Person', useOrgName: false, confirmationMessage: 'Registration complete' },
	{
		representation: 'Organisation',
		useOrgName: true,
		confirmationMessage: 'Registration complete'
	},
	{ representation: 'Household', useOrgName: false, confirmationMessage: 'Registration complete' }
];

representationOptions.forEach((representationOptions) => {
	describe(`Agent registers to have your say on behalf of ${representationOptions.representation}`, () => {
		before(() => {
			cy.clearCookies();
			cy.fixture('caseData').then((data) => {
				caseData = data;
				caseData.useOrgName = data.useOrgName;
			});

			cy.navigateAndSearch('Front Office Auto Test');
		});

		it('Should click on register to have your say link and assert page content', () => {
			basePage.clickProjectInformationMenuLink('have-your-say');
			cy.url().should('include', '/register/register-have-your-say');
			basePage.locateH1ByText('Register to have your say about a national infrastructure project');
		});

		it('Should click start now button', () => {
			basePage.clickGovBtn('Start now');
		});

		it('Should check on behalf of another person ', () => {
			cy.url().should('include', '/register/who-registering-for');
			basePage.locateH1ByText(caseData.headingText.registeringForPage);
			basePage.checkGovRadioBtn('behalf');
			cy.saveAndContinue();
		});

		it('Enters your full name and clicks continue', () => {
			const fullName = `${caseData.contactDetails.firstName} ${caseData.contactDetails.lastName}`;

			basePage.locateH1ByText(caseData.headingText.yourFullNamePage);
			basePage.typeInputField('full-name', fullName);
			cy.saveAndContinue();
		});

		it('Enters your organisation name and clicks continue', () => {
			basePage.locateH1ByText(caseData.headingText.yourOrganisationPage);
			basePage.typeInputField('organisation-name', caseData.contactDetails.organisationName);
			cy.saveAndContinue();
		});

		it('Enters your email address and clicks continue', () => {
			basePage.locateH1ByText(caseData.headingText.yourEmailAdressPage);
			basePage.typeInputField('email', caseData.contactDetails.email);
			cy.saveAndContinue();
		});

		it('Enters your address details and clicks continue', () => {
			basePage.locateH1ByText(caseData.headingText.yourAddressPage);
			basePage.typeInputField('line1', caseData.caseAddress.addressLine1);
			basePage.typeInputField('line2', caseData.caseAddress.addressLine2);
			basePage.typeInputField('line3', caseData.caseAddress.testTown);
			basePage.typeInputField('postcode', caseData.caseAddress.addressPostcode);
			basePage.typeInputField('country', caseData.caseAddress.testContury);
			cy.saveAndContinue();
		});

		it('Enters your telephone number and clicks continue', () => {
			basePage.locateH1ByText(caseData.headingText.yourTelephoneNumberPage);
			basePage.typeInputField('telephone', caseData.contactDetails.telephoneNumber);
			cy.saveAndContinue();
		});

		it(`Chooses to represent a ${representationOptions.representation} and clicks continue`, () => {
			basePage.locateH1ByText(caseData.headingText.representingPage);
			haveYourSay.selectRepresentationOption(representationOptions.representation);
			cy.saveAndContinue();
		});

		if (representationOptions.useOrgName) {
			it('should enter a organisation name if appilicable', () => {
				basePage.locateH1ByText(caseData.headingText.theirOrganisationPage);
				basePage.typeInputField('full-name', caseData.behalfContactDetails.organisationName);
				cy.saveAndContinue();
			});
		}

		if (!representationOptions.useOrgName) {
			it('Enters their full name and clicks continue', () => {
				const fullName = `${caseData.behalfContactDetails.firstName} ${caseData.behalfContactDetails.lastName}`;
				if (representationOptions.representation === 'Household') {
					basePage.locateH1ByText(caseData.headingText.theirHouseholdNamePage);
				} else {
					basePage.locateH1ByText(caseData.headingText.theirFullNamePage);
				}
				basePage.typeInputField('full-name', fullName);
				cy.saveAndContinue();
			});

			it('Confirms they are over 18 and clicks continue', () => {
				basePage.locateH1ByText(caseData.headingText.theirAgePage);
				basePage.checkGovRadioBtn('yes');
				cy.saveAndContinue();
			});
		}

		it('Enters their email address and clicks continue', () => {
			basePage.locateH1ByText(caseData.headingText.theirEmailAddressPage);
			basePage.typeInputField('email', caseData.behalfContactDetails.email);
			cy.saveAndContinue();
		});

		it('Enters their address details and clicks continue', () => {
			basePage.locateH1ByText(caseData.headingText.theirAddressPage);
			basePage.typeInputField('line1', caseData.behalfCaseAddress.addressLine1);
			basePage.typeInputField('line2', caseData.behalfCaseAddress.addressLine2);
			basePage.typeInputField('line3', caseData.behalfCaseAddress.testTown);
			basePage.typeInputField('postcode', caseData.behalfCaseAddress.addressPostcode);
			basePage.typeInputField('country', caseData.behalfCaseAddress.testContury);
			cy.saveAndContinue();
		});

		it('Enters their telephone number and clicks continue', () => {
			basePage.locateH1ByText(caseData.headingText.theirTelePhoneNumberPage);
			basePage.typeInputField('telephone', caseData.behalfContactDetails.telephoneNumber);
			cy.saveAndContinue();
		});

		it('Adds a comment against a project and clicks continue', () => {
			basePage.locateH1ByText(caseData.headingText.addCommentPage);
			basePage.typeInputField('comment', caseData.commentOnCase);
			basePage.assertDropDownDetails(
				'Use of language, hyperlinks and sensitive information',
				'Examples of sensitive information'
			);
			cy.saveAndContinue();
		});

		it('Should check your answers before you register', () => {
			const inputData = [
				{
					field: 'full-name',
					expectedValue: `${caseData.contactDetails.firstName} ${caseData.contactDetails.lastName}`
				},
				{ field: 'telephone', expectedValue: caseData.contactDetails.telephoneNumber },
				{ field: 'address', expectedValue: caseData.caseAddress.addressLine1 },
				{ field: 'email', expectedValue: caseData.contactDetails.email },
				{ field: 'comment', expectedValue: caseData.commentOnCase },
				{ field: 'organisation-name', expectedValue: caseData.contactDetails.organisationName }
			];

			inputData.forEach(({ field, expectedValue }) => {
				if (field === 'address') {
					// The address field does not have any unique locators, so we have to use contains.
					cy.contains(expectedValue);
				} else {
					// Assert that the original data is correctly displayed on the check your answers page
					haveYourSay.assertYourEnteredData(field, expectedValue);
				}
			});
			basePage.locateH1ByText(caseData.headingText.checkYourAnswersPage);
			cy.get('a[href*="/agent/declaration"]').click();
		});

		it('Should review the declreation page ', () => {
			basePage.locateH1ByText(caseData.headingText.declarationPage);
			basePage.clickGovBtn('Accept and continue');
		});

		it('User sees the registration complete message', () => {
			basePage.checkConfirmationMessage('Registration complete', 9);
			basePage.locateH2ByText('Getting involved in the preliminary meeting');
			basePage.locateH2ByText('How and when to submit more information');
			basePage.clickGovLink('Go back to the project page');
		});

		it('Should verify the user is on the project page', () => {
			cy.url().should('include', '/projects');
			basePage.locateH1ByText(caseData.headingText.projectInformationPage);
		});
	});
});
