const enExaminationTranslations = require('./en.json');

describe('pages/process-guide/examination/_translations/en', () => {
	it('should return the english process guide examination page translations', () => {
		expect(enExaminationTranslations).toEqual({
			heading2: 'About the examination stage',
			paragraph1:
				'The examination stage is where the Examining Authority look at the proposed project and ask questions.',
			paragraph2:
				'The applicant, anyone who is registered to have their say, official bodies and people whose land is directly affected can comment on the proposed development or answer any of the questions at each deadline.',
			paragraph3:
				'This is usually done in writing. The Examining Authority publish their questions at the times outlined in the examination timetable. The examination may also involve hearings if there are issues that need discussing in detail.',
			paragraph4: 'This stage takes up to 6 months.',
			heading3: 'What happens at the examination stage',
			paragraph5:
				'The examination stage is where the Examining Authority will consider the proposed development and ask questions.',
			paragraph6:
				'You can send your comments by filling in the online form in the project section of this website.',
			paragraph7:
				'Anyone who has difficulty using online services can send us information by email or post. The project information in the project section of this website provides contact details for the project case team.',
			heading4: 'When you have registered to have your say you can',
			listItem1: 'comment on the proposed development',
			listItem2: 'speak at hearings',
			listItem3: 'attend an accompanied site inspection',
			paragraph8:
				'You need to register to have your say for your views to be taken into consideration.',
			paragraph9:
				'You will be given a reference number once you register. You must use this when submitting comments.',
			paragraph10: 'To find out more, check our {{-link}}.',
			paragraph10LinkText: 'guide for having your say about a national infrastructure project',
			heading5: 'If you have missed the deadline to register',
			paragraph11: 'You can look at project information but you cannot submit a comment.',
			heading6: 'If you have recently gained an interest in land affected by a development',
			paragraph12:
				'You can contact the project team if the developer did not tell you the application was accepted or you did not register to have your say. The project team will ask the Examining Authority if you can be an Interested Party and have your say.',
			paragraph13:
				'The project team email address can be found in the contact us section of the project page.',
			heading7: 'More information',
			paragraph14:
				'All details about the project including documents, questions, comments and any advice given will be published on the project information page.',
			paragraph15: '{{-link}}.',
			paragraph15LinkText: 'You can also read the full set of technical advice notes'
		});
	});
});
