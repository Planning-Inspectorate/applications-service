const enPreApplicationTranslations = require('./en.json');

describe('pages/process-guide/pre-application/_translations/en', () => {
	it('should return the english process guide pre-application page translations', () => {
		expect(enPreApplicationTranslations).toEqual({
			heading2: 'The pre-application stage',
			paragraph1:
				'Before an applicant sends their application for a proposed development to the Planning Inspectorate, they must carry out public consultation. This feedback will then be taken into account and used to help shape the proposed project. This happens at the pre-application stage.',
			paragraph2: 'The applicant must consult:',
			listItem1: 'the general public',
			listItem2: 'parish councils',
			listItem3: 'statutory consultees',
			listItem4: 'local authorities and councils',
			listItem5: 'land owners and tenants',
			paragraph3:
				'They must consider all comments and information from members of the public and organisations.',
			paragraph4:
				"Getting involved in the applicant's consultation during the pre-application stage is very important. This is your opportunity to put forward any questions and concerns, learn more about the development and how it might effect the area.",
			paragraph5: '{{-link}}.',
			paragraph5LinkText: 'Check the guide on how you can have your say',
			heading3: 'About the pre-application service for applicants',
			paragraph6:
				'We offer a pre-application service for applicants who are preparing an application. This is a fee-based service. {{-link}}',
			paragraph6LinkText:
				'View our pre-application prospectus for more information on the fee structure.',
			paragraph7: 'This includes:',
			listItem6: 'providing advice about how to prepare an application',
			listItem7: 'pre-submission checks and reviews of draft documents',
			listItem8: 'checking applicants have followed all the required steps',
			heading4: 'Advice for local authorities at the pre-application stage',
			paragraph8: 'You can view our advice pages with information about {{-link}}.',
			paragraph8LinkText: 'what you need to do if you represent a local authority',
			heading5: 'More detailed advice',
			paragraph9:
				'If you need more detailed advice, you can check our advice pages for more information.',
			paragraph10LinkText: 'Read the full set of detailed advice pages'
		});
	});
});
