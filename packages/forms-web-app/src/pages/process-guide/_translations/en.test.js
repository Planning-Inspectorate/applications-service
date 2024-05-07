const enProcessGuideTranslations = require('./en.json');

describe('pages/process-guide/_translations/en', () => {
	it('should return the English process guide page translations', () => {
		expect(enProcessGuideTranslations).toEqual({
			preApplication: {
				subHeading: 'Pre-application',
				paragraph1:
					'This is where the applicant starts to create their application. The applicant is required to consult with people and organisations in the area. They must also create detailed documents about the impact the project could have on the environment.',
				paragraph2:
					'It is important to get involved at this stage to influence the application before the applicant sends it to the Planning Inspectorate.',
				linkText: 'Find out what you can do at this stage and check our detailed guides.'
			},
			acceptance: {
				subHeading: 'Acceptance',
				paragraph:
					'This is when the applicant sends us their application documents. We check if we can accept the application for examination. We have 28 days to make this decision.',
				linkText: 'How the acceptance stage works and what happens next.'
			},
			preExamination: {
				subHeading: 'Pre-examination',
				paragraph1:
					'The Examining Authority is appointed and is made up of one or more inspectors. Anyone who wants to have their say must be able to register at this stage.',
				paragraph2:
					'The applicant must publish that the application has been accepted by us. They include when and how parties can register to get involved. The time period for registering is set by the applicant but must be no less than 28 days.',
				paragraph3: 'The pre-examination stage usually takes about 3 months.',
				linkText: 'What happens during the pre-examination stage.'
			},
			examination: {
				subHeading: 'Examination',
				paragraph:
					'The Examining Authority will ask questions about the proposed development. The applicant and anyone who has registered to have their say can get involved and submit comments at each deadline in the timetable. You can also attend hearings that may take place. This stage takes up to 6 months.',
				linkText: 'What happens at the examination stage?'
			},
			recommendation: {
				subHeading: 'Recommendation',
				paragraph:
					'The Examining Authority writes its recommendation report. This must be completed and sent to the relevant Secretary of State within 3 months of the end of examination stage.',
				linkText: 'Making a recommendation.'
			},
			decision: {
				subHeading: 'Decision',
				paragraph:
					'The decision stage is when the relevant Secretary of State then reviews the report and makes the final decision. They have 3 months to make a decision.',
				linkText: 'Who makes the final decision.'
			},
			postDecision: {
				subHeading: 'What happens after the decision is made',
				paragraph:
					'Once the Secretary of State has made a decision, there is a 6 week period where people can challenge the decision in the high court. This is called a judicial review.',
				linkText: 'What you can do after the decision has been made.'
			}
		});
	});
});
