const enTakingPartTranslations = require('./en.json');

describe('pages/have-your-say-guide/taking-part/_translations/en', () => {
	it('should return the english have your say guide taking part translations', () => {
		expect(enTakingPartTranslations).toEqual({
			heading2: 'What happens at the pre-application stage',
			heading3: 'What the applicant must do',
			heading4: 'How you can get involved at this point',
			heading5: 'What you can do if the application has already been submitted',
			listItem1: 'local communities',
			listItem2: 'parish councils',
			listItem3: 'statutory bodies',
			listItem4: 'local authorities and councils',
			listItem5: 'land owners and tenants',
			listItem6: 'a description of the project',
			listItem7: 'where you can find out more about the project',
			paragraph1:
				'Government guidance encourages the applicant to carry out engagement or consultation (or both) before they send their application for a national infrastructure project to the Planning Inspectorate.',
			paragraph2: 'The applicant may engage or consult with:',
			paragraph3:
				'The applicant can gather any comments and information from members of the public and organisations. This feedback can be taken into account and used to help shape the proposed project.',
			paragraph4: 'The applicant must publicise their proposed project.',
			paragraph5:
				'The publicity notice must appear in one or more local newspapers for at least two weeks and include:',
			paragraph6: 'You need to contact the applicant to get involved at this stage.',
			paragraph7:
				"If there is a project page on this website, you can find the applicant's details here. Alternatively, you can find information in local news or ask your local authority.",
			paragraph8:
				'Getting involved at this stage allows you to find out more about the proposed project and how it might impact the area. You can also ask questions of the applicant and put forward any concerns.',
			paragraph9:
				'If the application has been sent to the Planning Inspectorate, you can get involved by registering to have your say.',
			paragraph10: 'You must do this when the project is in the pre-examination stage.'
		});
	});
});
