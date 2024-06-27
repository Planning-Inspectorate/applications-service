const enGetUpdatesHowOftenTranslations = require('./en.json');

describe('pages/projects/get-updates/how-often/_translations/en.json', () => {
	it('should return the English get updates how often page translations', () => {
		expect(enGetUpdatesHowOftenTranslations).toEqual({
			index: {
				heading1: 'How often do you want to get emails about the project?',
				paragraph1: 'Each time we update the project (you may get more than one email a day)',
				paragraph2: 'or',
				paragraph3: 'When the application is submitted',
				paragraph4: 'When you can register to have your say',
				paragraph5: 'When the final decision has been made',
				validationErrorTitle1: 'There is a problem',
				validationErrorMessage1:
					'Select the top checkbox only OR select as many of the bottom three checkboxes as needed'
			},
			error: {
				title1: 'There has been a problem',
				heading1: 'There has been a problem with our system',
				paragraph1: 'Go back and submit your update preference again.',
				paragraph2: 'You can try again later.',
				phrase1: 'Or phone the Planning Inspectorate support team for help on',
				phrase2: 'or email'
			}
		});
	});
});
