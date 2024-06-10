const enCookiesTranslations = require('./en.json');

describe('pages/cookies/_translations/en', () => {
	it('should return the English cookies page translations', () => {
		expect(enCookiesTranslations).toEqual({
			heading1: 'Cookies on application service',
			paragraph1:
				'Cookies are files saved on your phone, tablet or computer when you visit a website. We use cookies to store information about how you use the application service, such as the pages you visit.',
			heading2: 'Cookie settings',
			paragraph2: 'We use different types of cookies.',
			paragraph3:
				"You can choose which cookies you're happy for us to use and how the data is shared.",
			heading3: 'Strictly necessary cookies',
			paragraph4:
				'We use essential cookies to help you use the application service. These do things such as:',
			listItem1: 'remember your progress through our service',
			listItem2: 'remember you have seen the cookies message',
			paragraph5:
				'These cookies need to be turned on below to give you the best experience using the service.',
			heading4: 'Cookies used to improve application service',
			paragraph6:
				'We use Google Analytics to measure how you use the application service so we can improve it based on user needs. We do not allow Google to use or share the data about how you use this site.',
			paragraph7:
				'You agree to the Planning Inspectorate using your data to help improve the application service.',
			legend1: 'Do you want to accept analytics cookies?',
			successBanner: {
				heading1: 'Your cookie settings were saved',
				paragraph1:
					'Government services may set additional cookies and, if so, will have their own cookie policy and banner.',
				linkText1: 'Go back to the page you were looking at'
			},
			errorMessage: {
				paragraph1:
					'We use JavaScript to set most of our cookies. Unfortunately Javascript is not running on your browser, so you cannot change your settings. You can try:',
				listItem1: 'reloading the page',
				listItem2: 'turning on JavaScript in your browser'
			}
		});
	});
});
