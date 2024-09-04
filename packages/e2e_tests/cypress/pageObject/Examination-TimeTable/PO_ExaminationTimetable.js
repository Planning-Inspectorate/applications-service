export class PO_ExaminationTimetable {
	elements = {
		govukLinkHaveYourSay: () => cy.get('a.govuk-button'),
		startNow: () => cy.get('a[href*="interested-party-number"]'),
		radioButton: () => cy.get('[type="radio"]'),
		continueButton2: () => cy.get('.govuk-button'),
		firstDeadline: () => cy.get('#choose-deadline'),
		firstDeadlineItem: () => cy.get('#examination-select-deadline'),
		commentTextArea: () => cy.get('#examination-enter-comment'),
		continueButtonFileUpload: () => cy.get('#continue-form-button'),
		button: () => cy.get('.govuk-button'),
		titleText: () => cy.get('.govuk-panel__title'),
		changeLink: () => cy.get('.govuk-summary-list__actions'),
		finalAnswers: () => cy.get('.govuk-summary-list__value'),
		addAnotherDeadline: () => cy.get('#examination-add-another-deadline-item')
	};

	clickLink() {
		this.elements.govukLinkHaveYourSay().click();
	}

	clickStartNowButton() {
		this.elements.startNow().click();
	}

	clickContinueButton2() {
		this.elements.continueButton2().contains('Continue').click();
	}

	clickContinueUploadFile() {
		this.elements.continueButtonFileUpload().click();
	}

	// enterTextInField(textFieldId, text) {
	// 	cy.get(`#${textFieldId}`).type(text);
	// }

	clearTextInField(textFieldId) {
		cy.get(`#${textFieldId}`).clear();
	}

	checkFirstRadioButton() {
		this.elements.radioButton().first().check();
	}

	typeComment(string) {
		this.elements.commentTextArea().type(string);
	}

	changeHowYouSubmit() {
		this.elements.changeDeadline().click();
	}

	clickChangeLink(arrayIndex) {
		this.elements.changeLink().eq(`${arrayIndex}`).children().click();
	}

	checkRadioWithValue(value) {
		this.elements.radioButton().check([`${value}`]);
	}

	getAllAnswers() {
		return cy.get('.govuk-summary-list__value');
	}

	checkAnswersFirstPage(expectedAnswers) {
		this.getAllAnswers().then((answers) => {
			const myAnswers = [];
			cy.wrap(answers)
				.each((ans) => myAnswers.push(ans.text().trim()))
				.then(() => {
					myAnswers.shift();
					expect(expectedAnswers).to.deep.eq(myAnswers);
				});
		});
	}

	checkAnswersSecondPage(expectedAnswers) {
		this.getAllAnswers().then((answers) => {
			const myAnswers = [];
			cy.wrap(answers)
				.each((ans) => myAnswers.push(ans.text().trim()))
				.then(() => {
					myAnswers.pop();
					expect(expectedAnswers).to.deep.eq(myAnswers);
				});
		});
	}

	clickButton(string) {
		this.elements.button().contains(string).click();
	}

	confirmTitleTextDisplays(string) {
		this.elements.titleText().contains(string).should('be.visible');
	}

	acceptCookiesButton() {
		return cy.get('[data-cy="cookie-banner-accept-analytics-cookies"]').click();
	}
	clickOnHerf() {
		return cy.get("a[href='/projects/EN010118']").click(); //Longfield Solar Farm project
	}

	showAllsections() {
		return cy.get('.govuk-accordion__show-all-text').click();
	}

	timeTableLink() {
		return cy.get("a[href='/projects/EN010118/examination-timetable']").click(); //timetable link
	}

	makeSubmissionButton() {
		return cy.get('form > .govuk-button').click(); //make submission button
	}

	startNowButton() {
		return cy.get('.govuk-grid-column-two-thirds > .govuk-button').click(); //start now button
	}

	partyNumberYesCheckBox() {
		return cy.get('#examination-has-interested-party-number').click(); //Do you have an interested party number? Yes
	}

	partyNumberNoCheckBox() {
		return cy.get('#examination-has-interested-party-number-2').click(); //Do you have an interested party number No
	}

	continueButton() {
		return cy.get('[data-cy="button-submit-and-continue"]').click(); //continue button
	}

	partyNumberField() {
		return cy.get('[data-cy="examination-your-interested-party-number"]'); // What's your interested party number?
	}
	myselfCheckBox() {
		return cy.get('#examination-submitting-for').click(); // Myself
	}

	organizationCheckBox() {
		return cy.get('#examination-submitting-for-2').click(); // An organisation I work for
	}

	organizationField() {
		return cy.get('[data-cy="examination-name"]'); //What’s your organisation's name?
	}

	agentCheckbox() {
		return cy.get('#examination-submitting-for-3').click(); // On behalf of another person, a family group
	}

	agentField() {
		return cy.get('[data-cy="examination-name"]'); // What's the full name of the person, family group or organisation?
	}

	fullNameField() {
		return cy.get('[data-cy="examination-name"]'); // What is your full name?
	}

	emailField() {
		return cy.get('[data-cy="examination-email"]'); // What's your email address?
	}

	deadLineCheckBox_1() {
		return cy.get('#examination-select-deadline-6').click(); //item would you like to submit against for this deadline?
	}

	deadLineCheckBox_2() {
		return cy.get('#examination-select-deadline-7').click(); //item would you like to submit against for this deadline?
	}

	writeCommentCheckBox() {
		return cy.get('#examination-evidence-or-comment').click(); //Write a comment
	}

	uploadFileCheckBox() {
		return cy.get('#examination-evidence-or-comment-2').click(); // Upload files
	}

	bothCheckBox() {
		return cy.get('#examination-evidence-or-comment-3').click(); // Both checkboxes
	}

	yourCommentField() {
		return cy.get('#examination-enter-comment'); // Your comment field
	}

	fileUploadButton() {
		return cy.get('.moj-multi-file-upload__dropzone > .govuk-button').click(); // Upload files button
	}
	fileUploadButton_2() {
		return cy.get('.moj-multi-file-upload__dropzone > .govuk-button').click();
	}
	persoanlInfoCheckBoxYes() {
		return cy.get('#examination-personal-information-comment-files').click(); // Do your comment and files contain personal information? Yes
	}
	persoanlInfoCheckBoxNo() {
		return cy.get('#examination-personal-information-comment-files-2').click(); // Do your comment and files contain personal information? No
	}

	persoanlInfoCheckBox_1() {
		return cy.get('#examination-personal-information-which-comment-files').click(); // Which files and comments contain personal information?
	}
	persoanlInfoCheckBox_2() {
		return cy.get('#examination-personal-information-which-comment-files-2').click(); // Which files and comments contain personal information?
	}

	fileContentCheckBoxYes() {
		return cy.get('#examination-personal-information-files').click(); // Do your files contain personal information? Yes
	}

	fileContentCheckBoxNo() {
		return cy.get('#examination-personal-information-files-2').click(); // Do your files contain personal information? No
	}

	deadLineCheckBoxYes() {
		return cy.get('#examination-add-another-deadline-item').click(); // You added one deadline item - Yes
	}
	deadLineCheckBoxNo() {
		return cy.get('#examination-add-another-deadline-item-2').click(); // You added one deadline item - No
	}

	deadLineContinueBtn() {
		return cy.get('[action=""] > .govuk-button').click();
	}

	continueButton_2() {
		return cy.get('.govuk-grid-column-two-thirds > .govuk-button').click();
	}

	processSubmissionButton() {
		return cy.get('form > .govuk-button').click(); // Process submission page
	}

	submissionCompleteTitle() {
		return cy.get('.govuk-panel__title');
	}
}
