const shortComment = 'I am against the proposal since it will reduce resident parking provision';

const continueWithFixtureComment = (tellAboutProject, fixtureName) => {
	cy.fixture(fixtureName).then((comment) => {
		tellAboutProject.enterTextIntoCommentsFieldDirectly(comment.trim());
		tellAboutProject.clickSaveAndContinue();
	});
};

const saveAndReturnWithFixtureComment = (tellAboutProject, fixtureName) => {
	cy.fixture(fixtureName).then((comment) => {
		tellAboutProject.enterTextIntoCommentsFieldDirectly(comment.trim());
		tellAboutProject.clickSaveAndReturn();
	});
};

export const registerTopicFieldStep = (And, tellAboutProject) => {
	And('I enter {string} into topic field', (dataInput) => {
		tellAboutProject.enterTextIntoTopicField(dataInput);
	});
};

export const registerAddAnotherCommentRadioStep = (When, pageObject) => {
	When(
		'user selects {string} radio option on Do you want to add another comment page',
		(radioChoice) => {
			pageObject.selectRadioYesOrNo(radioChoice);
		}
	);
};

export const registerCommentPageSteps = ({ And, Then, When }, tellAboutProject, emailAddress) => {
	And('I continue with an empty value in the comments field', () => {
		tellAboutProject.clickSaveAndContinue();
	});

	And('I save and exit with an empty value in the comments field', () => {
		tellAboutProject.clickSaveAndReturn();
	});

	And('I continue with a comment beyond the maximum characters allowed', () => {
		continueWithFixtureComment(tellAboutProject, 'comment-too-long.txt');
	});

	And('I save and exit with a comment beyond the maximum characters allowed', () => {
		saveAndReturnWithFixtureComment(tellAboutProject, 'comment-too-long.txt');
	});

	And('I continue with a comment at the maximum characters allowed', () => {
		continueWithFixtureComment(tellAboutProject, 'comment-max-length.txt');
	});

	And('I save and exit with a comment at the maximum characters allowed', () => {
		saveAndReturnWithFixtureComment(tellAboutProject, 'comment-max-length.txt');
	});

	And('I continue with a short comment', () => {
		tellAboutProject.enterTextIntoCommentsField(shortComment);
		tellAboutProject.clickSaveAndContinue();
	});

	And('I save and exit with a short comment', () => {
		tellAboutProject.enterTextIntoCommentsField(shortComment);
		tellAboutProject.clickSaveAndReturn();
	});

	registerTopicFieldStep(And, tellAboutProject);
	registerAddAnotherCommentRadioStep(When, tellAboutProject);

	Then('advice to not include any personal details is present on the page', () => {
		tellAboutProject.assertDoNotIncludePersonalDetailsPresent();
	});

	Then('I can see email sent confirmation text', () => {
		cy.get('[data-cy="email-confirmation"]').should(
			'contain.text',
			`We have sent a link to get back to your saved registration to: ${emailAddress}`
		);
	});
};
