const enContactTranslations = require('./en.json');

describe('pages/contact/_translations/en', () => {
	it('should return the english contact page translations', () => {
		expect(enContactTranslations).toEqual({
			heading1: 'Contact us',
			heading2: 'General Enquiries',
			heading3: 'Feedback and complaints',
			heading4: 'Press and media',
			paragraph1:
				'If you are contacting us about a particular project, please email the project team. The project team email address can be found on the project page.',
			paragraph10:
				'Further information about contacting the Planning Inpectorate customer services can be viewed on {{-link}}.',
			paragraph11:
				"The Planning Inspectorate tries to provide the best possible service for its customers. We try to ensure everyone is satisfied with the service they receive. Complaints about the examination process or Examining Authority's final report will be considered and responded to.",
			paragraph12: 'Telephone:',
			paragraph13: 'Email:',
			paragraph14: 'The GOV.UK Press office is open from {{-openingHours}}.',
			paragraph2: 'If you have another enquiry, you can contact us by the following options:',
			paragraph3: 'Contact form: {{-link}}',
			paragraph3LinkText: 'Fill out our form',
			paragraph4: 'Email: {{-link}}',
			paragraph5:
				'If you are contacting us about a specific project, put the project name in the subject line. At busy times we may not be able to respond immediately.',
			paragraph6: 'Telephone customer services:',
			paragraph7: 'Monday to Friday, 9am to 12pm (except public holidays)',
			paragraph8: 'Address:',
			paragraph9: 'Follow us on X:'
		});
	});
});
