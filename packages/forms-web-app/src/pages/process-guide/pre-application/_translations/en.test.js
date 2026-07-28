const enPreApplicationTranslations = require('./en.json');

describe('pages/process-guide/pre-application/_translations/en', () => {
	it('should return the english process guide pre-application page translations', () => {
		expect(enPreApplicationTranslations).toEqual({
			heading2: 'The pre-application stage',
			paragraph1:
				'Government guidance encourages the applicant to engage or consult (or both) with people and organisations in the area before sending their application to the Planning Inspectorate. Any feedback can then be taken into account and used to help shape the proposed project.',
			paragraph2:
				'The applicant is encouraged to engage or consult (or both) with anyone who may be affected by the proposed project. This could include:',
			listItem1: 'local communities',
			listItem2: 'parish councils',
			listItem3: 'statutory bodies',
			listItem4: 'local authorities and councils',
			listItem5: 'land owners and tenants',
			paragraph3:
				'Getting involved in any pre-application engagement and consultation carried out by the applicant is very important. This is your opportunity to put forward any questions and concerns, learn more about the development and how it might affect the area.',
			paragraph4: '{{-link}}.',
			paragraph4LinkText: 'Check the guide on how you can have your say',
			heading3: 'About the pre-application service for applicants',
			paragraph5:
				'We offer a pre-application service for applicants who are preparing an application. This is a fee-based service. {{-link}}',
			paragraph5LinkText:
				'View our pre-application prospectus for more information on the fee structure.',
			paragraph6: 'This includes:',
			listItem6: 'providing advice about how to prepare an application',
			listItem7: 'pre-submission checks and reviews of draft documents',
			listItem8: 'checking applicants have followed all the required steps',
			heading4: 'Advice for local authorities at the pre-application stage',
			paragraph7: 'You can view our advice pages with information about {{-link}}.',
			paragraph7LinkText: 'what you need to do if you represent a local authority',
			heading5: 'More detailed advice',
			paragraph8:
				'If you need more detailed advice, you can check our advice pages for more information.',
			paragraph9LinkText: 'Read the full set of detailed advice pages'
		});
	});
});
