const enTakingPartTranslations = require('./en.json');

describe('pages/have-your-say-guide/taking-part/_translations/en', () => {
	it('should return the english have your say guide taking part translations', () => {
		expect(enTakingPartTranslations).toEqual({
			heading2: 'What happens at the pre-application stage',
			heading3: 'What the applicant must do',
			heading4: 'How you can get involved at this point',
			heading5: 'What you can do if the application has already been submitted',
			listItem1: 'the general public',
			listItem2: 'parish councils',
			listItem3: 'statutory consultees',
			listItem4: 'local authorities and councils',
			listItem5: 'land owners and tenants',
			listItem6: 'a description of the project',
			listItem7: 'where you can find out more about the project',
			listItem8: 'the deadline for sending them your comments',
			paragraph1:
				'Before the applicant sends their application for a proposed national infrastructure development to the Planning Inspectorate, they must carry out public consultation. This happens at the pre-application stage.',
			paragraph10:
				'If the application has been sent to the Planning Inspectorate, you can get involved by registering to have your say.',
			paragraph11: 'You must do this when the project is in the pre-examination stage.',
			paragraph2: 'The applicant must consult:',
			paragraph3:
				'They must gather all comments and information from members of the public and organisations. This feedback is taken into account and used to help shape the proposed project.',
			paragraph4: 'The applicant must advertise their consultation period.',
			paragraph5: 'The advert must appear for at least two weeks and include:',
			paragraph6:
				'The applicant must also contact consultees and anyone whose land is affected by the proposed development.',
			paragraph7: 'You need to contact the applicant to get involved at this stage.',
			paragraph8:
				"If there is a project page on this website, you can find the applicant's details here. Alternatively, you can find information in local news or ask your local authority.",
			paragraph9:
				"Getting involved in the applicant's consultation during the pre-application stage is very important. This is your opportunity to put forward any questions and concerns, and find out more about the development and how it might impact the area."
		});
	});
});
