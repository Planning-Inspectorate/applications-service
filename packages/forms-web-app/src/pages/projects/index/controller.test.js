const { getProjectsIndexController } = require('./controller');

const { mockI18n } = require('../../_mocks/i18n');

const {
	getProjectUpdatesUnsuccessfulFixture,
	applicationDataFixture,
	getProjectUpdatesSuccessfulFixture,
	getApplicationApprovalDocumentFixture,
	getProjectUpdatesSuccessfulNoUpdatesFixture
} = require('../../_fixtures');

const { getProjectUpdates, getDocumentByType } = require('../../../lib/application-api-wrapper');
const { getMapAccessToken } = require('../../_services');

jest.mock('../../../lib/application-api-wrapper', () => ({
	getProjectUpdates: jest.fn(),
	getDocumentByType: jest.fn()
}));
jest.mock('../../_services', () => ({
	getMapAccessToken: jest.fn()
}));

const processGuideStages = {
	acceptance: {
		html: '<p class="govuk-body">This is when the applicant sends us their application documents. We check if we can accept the application for examination. We have 28 days to make this decision.</p><a class="govuk-link" href="/decision-making-process-guide/review-of-the-application">How the acceptance stage works and what happens next.</a>',
		title: 'Acceptance'
	},
	decision: {
		html: '<p class="govuk-body">The decision stage is when the relevant Secretary of State then reviews the report and makes the final decision. They have 3 months to make a decision.</p><a class="govuk-link" href="/decision-making-process-guide/decision">Who makes the final decision.</a>',
		title: 'Decision'
	},
	examination: {
		html: '<p class="govuk-body">The Examining Authority will ask questions about the proposed development. The applicant and anyone who has registered to have their say can get involved and submit comments at each deadline in the timetable. You can also attend hearings that may take place. This stage takes up to 6 months.</p><a class="govuk-link" href="/decision-making-process-guide/examination-of-the-application">What happens at the examination stage?</a>',
		title: 'Examination'
	},
	postDecision: {
		html: '<p class="govuk-body">Once the Secretary of State has made a decision, challenges can be made to the High Court. All procedures must be followed when making a challenge. The High Court will decide if there are grounds for a judicial review.</p><p class="govuk-body">This must happen within 6 weeks.</p><a class="govuk-link" href="/decision-making-process-guide/what-happens-after-the-decision-is-made">What you can do after the decision has been made.</a>',
		title: 'What happens after the decision is made'
	},
	preApplication: {
		html: '<p class="govuk-body">This is where the applicant starts to create their application. The applicant is required to consult with people and organisations in the area. They must also create detailed documents about the impact the project could have on the environment.</p><p class="govuk-body">It is important to get involved at this stage to influence the application before the applicant sends it to the Planning Inspectorate.</p><a class="govuk-link" href="/decision-making-process-guide/pre-application">Find out what you can do at this stage and check our detailed guides.</a>',
		title: 'Pre-application'
	},
	preExamination: {
		html: '<p class="govuk-body">The Examining Authority is appointed and is made up of one or more inspectors. Anyone who wants to have their say needs to register at this stage.</p><p class="govuk-body">The applicant must publish that the application has been accepted by us. They include when and how parties can register to get involved. The time period for registering is set by the applicant but must be no less than 30 days.</p><p class="govuk-body">The pre-examination stage usually takes about 3 months.</p><a class="govuk-link" href="/decision-making-process-guide/pre-examination">What happens during the pre-examination stage.</a>',
		title: 'Pre-examination'
	},
	index: {
		html: '<p class="govuk-body">null</p>',
		title: 'The process for Nationally Significant Infrastructure Projects (NSIPs)'
	},
	recommendation: {
		html: '<p class="govuk-body">The Examining Authority writes its recommendation report. This must be completed and sent to the relevant Secretary of State within 3 months of the end of examination stage.</p><a class="govuk-link" href="/decision-making-process-guide/recommendation">Making a recommendation.</a>',
		title: 'Recommendation'
	}
};

const projectsIndexTranslations_EN = require('./_translations/en.json');
const processGuideTranslations_EN = require('../../process-guide/_translations/en.json');

const i18n = mockI18n({
	processGuide: processGuideTranslations_EN,
	projectsIndex: projectsIndexTranslations_EN
});

describe('pages/projects/index/controller', () => {
	describe('#getProjectsIndexController', () => {
		const today = '2020-01-01';

		beforeAll(() => {
			jest.useFakeTimers().setSystemTime(new Date(today));
		});

		describe('When project updates are NOT found', () => {
			const req = {
				i18n
			};
			const res = {
				render: jest.fn(),
				locals: {
					applicationData: applicationDataFixture
				}
			};
			const next = jest.fn();

			beforeEach(async () => {
				getProjectUpdates.mockReturnValue(getProjectUpdatesUnsuccessfulFixture);
				await getProjectsIndexController(req, res, next);
			});

			it('should throw an error', () => {
				expect(next).toHaveBeenCalledWith(new Error('Project updates response status not 200'));
			});
		});

		describe('When there are project updates', () => {
			const req = {
				i18n
			};
			const res = {
				render: jest.fn(),
				locals: {
					applicationData: applicationDataFixture
				}
			};
			const next = jest.fn();

			beforeEach(async () => {
				getProjectUpdates.mockReturnValue(getProjectUpdatesSuccessfulFixture);
				getDocumentByType
					.mockReturnValueOnce({})
					.mockReturnValueOnce({})
					.mockReturnValueOnce(getApplicationApprovalDocumentFixture);
				getMapAccessToken.mockReturnValue('mock map access token');

				await getProjectsIndexController(req, res, next);
			});

			it('should render the page with the latest update', () => {
				expect(res.render).toHaveBeenCalledWith('projects/index/view.njk', {
					applicationDecision: 'granted',
					contactEmailAddress: 'NIEnquiries@planninginspectorate.gov.uk',
					latestUpdate: { content: 'mock english content update 1', date: '1 January 2021' },
					mapAccessToken: 'mock map access token',
					preExamSubStages: {
						CLOSED_REPS: false,
						OPEN_REPS: false,
						PRE_REPS: true,
						PUBLISHED_REPS: false,
						RULE_6_PUBLISHED_REPS: false
					},
					processGuideStages,
					projectsAllUpdatesURL: '/projects/EN010085/project-updates',
					proposal: 'Generating Stations',
					rule6Document: undefined,
					rule8Document: undefined,
					recommendationCompletedDate: null,
					decisionCompletedDate: null,
					backOfficeCase: false
				});
			});
		});

		describe('When there are NO project updates', () => {
			const req = {
				i18n
			};
			const res = {
				render: jest.fn(),
				locals: {
					applicationData: {
						...applicationDataFixture,
						contactEmailAddress: 'mock@email.com'
					}
				}
			};
			const next = jest.fn();

			beforeEach(async () => {
				getProjectUpdates.mockReturnValue(getProjectUpdatesSuccessfulNoUpdatesFixture);
				getDocumentByType
					.mockReturnValueOnce({})
					.mockReturnValueOnce({})
					.mockReturnValueOnce(getApplicationApprovalDocumentFixture);

				await getProjectsIndexController(req, res, next);
			});

			it('should render the page with NO latest update', () => {
				expect(res.render).toHaveBeenCalledWith('projects/index/view.njk', {
					applicationDecision: 'granted',
					contactEmailAddress: 'mock@email.com',
					latestUpdate: null,
					mapAccessToken: 'mock map access token',
					preExamSubStages: {
						CLOSED_REPS: false,
						OPEN_REPS: false,
						PRE_REPS: true,
						PUBLISHED_REPS: false,
						RULE_6_PUBLISHED_REPS: false
					},
					processGuideStages,
					projectsAllUpdatesURL: '/projects/EN010085/project-updates',
					proposal: 'Generating Stations',
					rule6Document: undefined,
					rule8Document: undefined,
					decisionCompletedDate: null,
					recommendationCompletedDate: null,
					backOfficeCase: false
				});
			});
		});
	});
});
