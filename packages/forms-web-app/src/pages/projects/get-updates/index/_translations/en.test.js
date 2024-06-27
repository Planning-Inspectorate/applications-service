const enGetUpdatesIndexTranslations = require('./en.json');

describe('pages/projects/get-updates/index/_translations/en.json', () => {
	it('should return the English get updates index page translations', () => {
		expect(enGetUpdatesIndexTranslations).toEqual({
			title1: 'Get updates',
			heading1: 'Get updates about this project',
			canSignupToUpdates: {
				paragraph1: 'You are signing up for email updates about',
				paragraph2:
					'We will send email updates when information about the proposed development is added to the website.'
			},
			cannotSignupToUpdates: {
				paragraph1: 'You can no longer get email updates about',
				paragraph2: 'The decision on this project has been made.'
			}
		});
	});
});
