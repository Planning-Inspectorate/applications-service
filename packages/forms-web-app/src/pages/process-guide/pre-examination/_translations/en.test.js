const enPreExaminationTranslations = require('./en.json');

describe('pages/process-guide/pre-examination/_translations/en', () => {
	it('should return the english process guide pre-examination page translations', () => {
		expect(enPreExaminationTranslations).toEqual({
			heading2: 'Preparing for the examination stage',
			heading3: 'Registering to have your say',
			heading4: 'Preliminary meeting',
			heading5: 'What happens next',
			heading6: 'More detailed advice',
			listItem1: 'plan what happens during the examination',
			listItem2: 'arrange any hearings',
			listItem3: 'set draft deadlines for comments',
			listItem4:
				'anything that may affect your ability to attend hearings or meet deadlines, for example other local events happening at the same time or issues with travel or working patterns',
			listItem5: 'if there are any suitable local places to hold any hearings that may be required',
			listItem6:
				'if there are any groups of people who need a different approach to be able to take part in the process',
			listItem7: 'any other matters relating to the draft examination timetable',
			paragraph1:
				'The pre-examination stage is where we prepare for an examination. The Examining Authority is made up of one or more inspectors who will plan for the examination stage.',
			paragraph10: 'You can talk about:',
			paragraph11:
				'We will publish the meeting notes and a recording on the project section of this website around a week after the preliminary meeting.',
			paragraph12:
				'The rule 8 letter is sent to everyone who registered, as well as official bodies and people whose land is directly affected. This letter gives details of the examination including the finalised timetable with all deadlines for examination comments.',
			paragraph13: 'You can find more {{-link}}.',
			paragraph13LinkText: 'detailed advice in our advice pages',
			paragraph2:
				'This involves the Examining Authority making an initial assessment of the issues which will need to be discussed.',
			paragraph3: 'The Examining Authority will:',
			paragraph4: 'You must register during the pre-examination stage to have your say.',
			paragraph5:
				"The registration for each project will be open for at least 30 days to give you time to register. The deadline for registering will be in the applicant's advert, or you can check the project page of this website. You can do this by clicking the All projects link at the top of this page and searching for the project.",
			paragraph6:
				'There is a separate guide with more information about the steps in the process for {{-link}}.',
			paragraph6LinkText:
				'people or organisations who want to have their say about a national infrastructure project',
			paragraph7:
				'The Examining Authority will hold a preliminary meeting at some point after the register to have your say period closes.',
			paragraph8:
				'Several weeks before this meeting, the rule 6 letter is sent to everyone registered to have their say, official bodies and people whose land is directly affected. The rule 6 letter tells everyone when and where the meeting will be held. It will also include a draft timetable for the examination.',
			paragraph9: 'You cannot give your views about the proposed development at this meeting.'
		});
	});
});
