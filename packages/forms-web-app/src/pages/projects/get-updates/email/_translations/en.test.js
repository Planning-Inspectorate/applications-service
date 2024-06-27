const enGetUpdatesEmailTranslations = require('./en.json');

describe('pages/projects/get-updates/email/_translations/en.json', () => {
	it('should return the English get updates email page translations', () => {
		expect(enGetUpdatesEmailTranslations).toEqual({
			heading1: 'What is your email address?',
			linkText1: 'How we use your information',
			paragraph1:
				'Planning Inspectorate email updates will only store information you have provided.',
			paragraph2:
				'You can access, update or permanently delete your email updates and the information associated with them at any time.',
			paragraph3: 'We will never:',
			listItem1: 'sell or rent your information to third parties',
			listItem2: 'share your information with third parties for marketing purposes',
			paragraph4:
				'You can read the {{-link}} for more detail on how your information is stored, shared and used.',
			paragraph4LinkText1: 'full privacy notice',
			errorMessage: 'There is a problem'
		});
	});
});
