const { getHaveYourSayGuideStages } = require('./get-have-your-say-guide-stages');

describe('pages/have-your-say-guide/_utils/get-have-your-say-guide-stages', () => {
	it('should return the process guide stages', () => {
		expect(getHaveYourSayGuideStages).toEqual({
			decisionMade: {
				content:
					'Once a decision is made by the relevant Secretary of State, there is a 6 week period where people can challenge the decision in the High Court. This is called a judicial review.',
				linkText: 'What happens after a decision has been made?',
				title: 'What you can do after the decision has been made',
				url: '/having-your-say-guide/what-happens-after-decision'
			},
			duringExamination: {
				content:
					'At this stage the Examining Authority asks questions about the proposed development. The applicant and anyone who has registered to have their say can make comments by the deadlines in the examination timetable. Anyone can attend hearings that may take place during this stage. The examination can take up to 6 months.',
				linkText: 'Submitting comments during the examination stage.',
				title: 'Have your say during the examination of the application',
				url: '/having-your-say-guide/have-your-say-examination'
			},
			getInvolved: {
				content:
					'In the months after the registration period closes, the Examining Authority will hold a preliminary meeting. This meeting is to discuss the main issues the Examining Authority will be examining, and the timetable for the examination stage.',
				linkText: 'What you can do at the preliminary meeting.',
				title: 'Get involved in the preliminary meeting',
				url: '/having-your-say-guide/get-involved-preliminary-meeting'
			},
			haveYourSayGuide: {
				content: null,
				linkText: null,
				title: 'Have your say about a national infrastructure project',
				url: '/having-your-say-guide/index'
			},
			registering: {
				content:
					'To get involved after the application is submitted to the Planning Inspectorate, you must register to have your say at the pre-examination stage. Pre-examination is where we prepare for an examination. We will identify an inspector or a panel of inspectors called the Examining Authority and make a plan for the examination stage. Registration is open for at least 30 days. The pre-examination stage takes about 3 months.',
				linkText: 'How to register to have your say about a national infrastructure project.',
				title: 'Registering to have your say about a national infrastructure project',
				url: '/having-your-say-guide/registering-have-your-say'
			},
			takingPart: {
				content:
					'Pre-application is the first stage of the process. This is where the applicant must consult with people and organisations. The applicant must provide information about how you can submit your comments to them. It is important to get involved at this stage as you can influence the application before the applicant sends it to the Planning Inspectorate.',
				linkText: 'Taking part before the application is submitted to the Planning Inspectorate.',
				title: 'Taking part at the pre-application stage',
				url: '/having-your-say-guide/taking-part-pre-application'
			}
		});
	});
});
