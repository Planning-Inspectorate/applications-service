const enGetUpdatesConfirmYourEmailTranslations = require('./en.json');

describe('pages/projects/get-updates/confirm-your-email/_translations/en.json', () => {
	it('should return the English get updates confirm your email page translations', () => {
		expect(enGetUpdatesConfirmYourEmailTranslations).toEqual({
			title1: 'Get updates and confirm email',
			heading1: 'Confirm you want to get emails',
			paragraph1: 'We have sent an email to',
			paragraph2: 'Check your email and confirm you want to get updates about:',
			paragraph3: 'The link will stop working after 48 hours.',
			linkText1: 'Not received an email?',
			paragraph4:
				'If you have not received an email to your inbox, check your spam or junk folder.',
			paragraph5: 'If this does not work, {{-link}}',
			paragraph5LinkText1: 'request a new email notification'
		});
	});
});
