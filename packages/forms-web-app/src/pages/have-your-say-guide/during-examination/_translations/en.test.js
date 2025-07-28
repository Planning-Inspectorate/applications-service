const enDuringExaminationTranslations = require('./en.json');

describe('pages/have-your-say-guide/during-examination/_translations/en', () => {
	it('should return the english have your say guide during examination translations', () => {
		expect(enDuringExaminationTranslations).toEqual({
			heading2: 'What examination means',
			paragraph1:
				'The examination stage is where the Examining Authority look at the proposed project and ask questions.',
			paragraph2:
				'The applicant, anyone who is registered to have their say, and anyone else involved in the project can comment on the proposed development or answer any of the questions at each deadline.',
			paragraph3:
				'This is usually done in writing. The Examining Authority will create and publish a document of their questions. The examination may also involve hearings if there are issues that need to be discussed in more detail.',
			paragraph4:
				"The Examining Authority will send you a timetable with the dates of each deadline for sending your comments. All comments will be published in the project information page on this website after they've been received.",
			heading3: 'How to comment during examination',
			paragraph5:
				'All project documents, comments from others who have registered or have a statutory right, and examination questions will be published in the project information page on this website.',
			paragraph6:
				'You can view these documents and make comments by filling in the online form in the project information page on this website.',
			paragraph7:
				"If you have difficulty using online services, you can also send us information by email or post. You can check the project information in the project section of this website to find contact details for the Planning Inspectorate's case team.",
			paragraph8:
				'Your name and comments will be published alongside the other documents in the project section of this website. Your address, email address and telephone number will be kept private. {{-link}}.',
			paragraph8LinkText:
				'You can view our privacy notice for more information (opens in a new tab)',
			heading4: 'If you have missed the deadline to register to have your say',
			paragraph9:
				'You can still look at the project information. If you submit information at this stage there is no guarantee your views will be included in the examination of the application. The Examining Authority will decide on whether your views can be considered.',
			heading5: 'More detailed advice',
			paragraph10:
				'If you need more detailed advice, you can check our advice pages for more information.',
			linkText1: 'Read the full set of advice pages (opens in a new tab)'
		});
	});
});
