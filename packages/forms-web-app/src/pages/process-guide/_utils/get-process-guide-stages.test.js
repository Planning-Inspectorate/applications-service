const { getProcessGuideStages } = require('./get-process-guide-stages');

const { mockI18n } = require('../../_mocks/i18n');

const processGuideTranslations_EN = require('../_translations/en.json');

describe('pages/process-guide/_utils/get-process-guide-stages', () => {
	const i18n = mockI18n({ processGuide: processGuideTranslations_EN });
	const processGuideStages = getProcessGuideStages(i18n);

	it('should return the process guide stages', () => {
		expect(processGuideStages).toEqual({
			acceptance: {
				content:
					'This is when the applicant sends us their application documents. We check if we can accept the application for examination. We have 28 days to make this decision.',
				linkText: 'How the acceptance stage works and what happens next.',
				title: 'Acceptance',
				url: '/decision-making-process-guide/review-of-the-application'
			},
			decision: {
				content:
					'The decision stage is when the relevant Secretary of State then reviews the report and makes the final decision. They have 3 months to make a decision.',
				linkText: 'Who makes the final decision.',
				title: 'Decision',
				url: '/decision-making-process-guide/decision'
			},
			examination: {
				content:
					'The Examining Authority will ask questions about the proposed development. The applicant and anyone who has registered to have their say can get involved and submit comments at each deadline in the timetable. You can also attend hearings that may take place. This stage takes up to 6 months.',
				linkText: 'What happens at the examination stage?',
				title: 'Examination',
				url: '/decision-making-process-guide/examination-of-the-application'
			},
			index: {
				content: null,
				linkText: null,
				title: 'The process for Nationally Significant Infrastructure Projects (NSIPs)',
				url: '/decision-making-process-guide'
			},
			postDecision: {
				content: [
					'Once the Secretary of State has made a decision, challenges can be made to the High Court. All procedures must be followed when making a challenge. The High Court will decide if there are grounds for a judicial review.',
					'This must happen within 6 weeks.'
				],
				linkText: 'What you can do after the decision has been made.',
				title: 'What happens after the decision is made',
				url: '/decision-making-process-guide/what-happens-after-the-decision-is-made'
			},
			preApplication: {
				content: [
					'This is where the applicant starts to create their application. The applicant is required to consult with people and organisations in the area. They must also create detailed documents about the impact the project could have on the environment.',
					'It is important to get involved at this stage to influence the application before the applicant sends it to the Planning Inspectorate.'
				],
				linkText: 'Find out what you can do at this stage and check our detailed guides.',
				title: 'Pre-application',
				url: '/decision-making-process-guide/pre-application'
			},
			preExamination: {
				content: [
					'The Examining Authority is appointed and is made up of one or more inspectors. Anyone who wants to have their say needs to register at this stage.',
					'The applicant must publish that the application has been accepted by us. They include when and how parties can register to get involved. The time period for registering is set by the applicant but must be no less than 30 days.',
					'The pre-examination stage usually takes about 3 months.'
				],
				linkText: 'What happens during the pre-examination stage.',
				title: 'Pre-examination',
				url: '/decision-making-process-guide/pre-examination'
			},
			recommendation: {
				content:
					'The Examining Authority writes its recommendation report. This must be completed and sent to the relevant Secretary of State within 3 months of the end of examination stage.',
				linkText: 'Making a recommendation.',
				title: 'Recommendation',
				url: '/decision-making-process-guide/recommendation'
			}
		});
	});
});
