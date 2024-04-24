const enGlobalTranslations = require('./global.json');

describe('locales/en/global', () => {
	it('should return the english global translations', () => {
		expect(enGlobalTranslations).toEqual({
			betaBanner: {
				content: 'This is a beta service - your {{-link}} will help us to improve it',
				feedback: 'feedback'
			},
			footer: {
				content: 'All content is available under the {{-link}}, except where otherwise stated',
				contentLinkText: 'Open Government Licence v3.0',
				copyright: 'Crown copyright',
				links: {
					accessibility: 'Accessibility statement',
					contact: 'Contact',
					cookies: 'Cookies',
					privacy: 'Privacy',
					't&c': 'Terms and conditions'
				}
			},
			headerTitle: {
				default: 'Find a National Infrastructure Project',
				examination: 'Have your say on an application',
				getUpdates: 'Get updates about this project',
				register: 'Register to have your say'
			},
			primaryNavigation: {
				detailedInformation: 'Detailed information',
				home: 'Home',
				projectSearch: 'All projects'
			}
		});
	});
});
