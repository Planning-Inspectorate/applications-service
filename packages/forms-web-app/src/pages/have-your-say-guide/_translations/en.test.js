const enHaveYourSayGuideTranslations = require('./en.json');

describe('pages/have-your-say-guide/_translations/en', () => {
	it('should return the english have your say guide translations', () => {
		expect(enHaveYourSayGuideTranslations).toEqual({
			common: { haveYourSayGuide: 'Have your say guide' },
			decisionMade: {
				heading1: 'What you can do after the decision has been made',
				linkText: 'What happens after a decision has been made?',
				paragraph1:
					'Once a decision is made by the relevant Secretary of State, there is a 6 week period where people can challenge the decision in the High Court. This is called a judicial review.'
			},
			duringExamination: {
				heading1: 'Have your say during the examination of the application',
				linkText: 'Submitting comments during the examination stage.',
				paragraph1:
					'At this stage the Examining Authority asks questions about the proposed development. The applicant and anyone who has registered to have their say can make comments by the deadlines in the examination timetable. Anyone can attend hearings that may take place during this stage. The examination can take up to 6 months.'
			},
			getInvolved: {
				heading1: 'Get involved in the preliminary meeting',
				linkText: 'What you can do at the preliminary meeting.',
				paragraph1:
					'In the months after the registration period closes, the Examining Authority will hold a preliminary meeting. This meeting is to discuss the main issues the Examining Authority will be examining, and the timetable for the examination stage.'
			},
			index: { heading1: 'Have your say about a national infrastructure project' },
			registering: {
				heading1: 'Registering to have your say about a national infrastructure project',
				linkText: 'How to register to have your say about a national infrastructure project.',
				paragraph1:
					'To get involved after the application is submitted to the Planning Inspectorate, you must register to have your say at the pre-examination stage. Pre-examination is where we prepare for an examination. We will identify an inspector or a panel of inspectors called the Examining Authority and make a plan for the examination stage. Registration is open for at least 30 days. The pre-examination stage takes about 3 months.'
			},
			takingPart: {
				heading1: 'Taking part at the pre-application stage',
				linkText: 'Taking part before the application is submitted to the Planning Inspectorate.',
				paragraph1:
					'Pre-application is the first stage of the process. This is where the applicant must consult with people and organisations. The applicant must provide information about how you can submit your comments to them. It is important to get involved at this stage as you can influence the application before the applicant sends it to the Planning Inspectorate.'
			}
		});
	});
});
