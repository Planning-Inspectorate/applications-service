export class PO_HaveYourSay {
	elements = {
		radioButton: () => cy.get('[data-cy="answer-behalf"]')
	};

	acceptCookiesButton() {
		return cy.get("a[data-cy='cookie-banner-view-cookies']").click();
	}

	clickOnHerf() {
		return cy.get("a[href='/projects/EN010118']").click(); //Longfield Solar Farm
	}

	registerButton() {
		return cy.get('.govuk-grid-column-three-quarters > :nth-child(4) > .govuk-button').click(); //Register to have your say
	}

	startNowButton() {
		return cy.get("a[href='/register/who-registering-for']").click(); //Start now
	}

	continueButton() {
		return cy.get("button[data-cy='button-save-and-continue']").click(); //Continue
	}

	fullNameField() {
		return cy.get('[data-cy="full-name"]'); //What is your full name?
	}

	emailField() {
		return cy.get('[data-cy="email"]'); // What is your email address?
	}
	phoneField() {
		return cy.get('[data-cy="telephone"]'); // What is your telephone number?
	}
	commentField() {
		return cy.get('[data-cy="comment"]'); // What is your comment? field
	}

	acceptContinueBtn() {
		return cy.get('.govuk-grid-column-two-thirds-from-desktop > .govuk-button').click();
	}

	acceptRegister() {
		return cy.get('[data-cy="button-accept-and-regoster"]').click();
	}

	regComplete() {
		return cy.get('.govuk-panel__title'); // Registration complete message
	}

	//Fields displayed when An organisation I work or volunteer for

	organisationNameField() {
		return cy.get('[data-cy="organisation-name"]'); //What is the name of your organisation or charity
	}

	jobRoleField() {
		return cy.get('[data-cy="role"]'); // What is your job title or volunteer role?
	}
	//On behalf of another person, a family group or an organisation I do not work for

	familyGroupField() {
		return cy.get('[data-cy="full-name"]'); //What is the name of the family group
	}

	shortSurveyLink() {
		return cy.get(':nth-child(13) > a').click(); // Tell us what you thought about this service
	}

	findAndSelectRadioButton(string) {
		cy.get('[type="radio"]').check(string).click();
	}

	findFieldAndEnterText(inputFieldId, text) {
		cy.get(`#${inputFieldId}`).type(text);
	}

	registrationCompleteText(string) {
		cy.get('.govuk-panel__title').contains(string);
	}

	checkRadioOption() {
		this.elements.radioButton().click();
	}

	findAndClickDecleration(string) {
		cy.get('.govuk-button govuk-button').contains(string).click();
	}
}
