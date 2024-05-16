const enAcceptanceTranslations = require('./en.json');

describe('pages/process-guide/acceptance/_translations/en', () => {
	it('should return the english process guide acceptance page translations', () => {
		expect(enAcceptanceTranslations).toEqual({
			heading2: 'The acceptance stage',
			heading3: 'What we consider at the acceptance stage',
			listItem1: 'we accept the application for examination',
			listItem2: 'we do not accept the application',
			listItem3: 'the applicant withdraws their application',
			paragraph1:
				'The applicant sends us their application at this stage. The application must include all the required documents as set out in legislation and details of the consultation the applicant has carried out during the pre-application stage. We look at the documents to check if we can accept the application for examination. We have 28 days to make this decision.',
			paragraph2: 'This stage can have one of 3 outcomes:',
			paragraph3: 'If it is accepted, the application will progress to the pre-examination stage.',
			paragraph4:
				'We will check the application to make sure the applicant has submitted all the documents required by law and that these are of a satisfactory standard to examine the application.',
			paragraph5:
				'If anything is missing or we need more information, we may not be able to accept the application for examination.'
		});
	});
});
