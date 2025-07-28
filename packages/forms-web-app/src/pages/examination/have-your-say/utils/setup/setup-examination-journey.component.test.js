const { setupExaminationJourney } = require('./setup-examination-journey');
const { getProjectData } = require('../../../../../lib/application-api-wrapper');

const { getTimetables } = require('../../../../../lib/application-api-wrapper');

jest.mock('../../../../../lib/application-api-wrapper', () => ({
	getProjectData: jest.fn(),
	getTimetables: jest.fn()
}));

const {
	fixtureApplicationResponse
} = require('../../../../../services/__mocks__/application.fixtures');
const {
	fixturesTimetableResponse
} = require('../../../../../services/__mocks__/timetable.fixtures');

describe('have your say decide exam journey route', () => {
	describe('#setupExaminationJourney', () => {
		describe('When the use user has come from the examination timetable', () => {
			const session = { examination: { examinationTimetableId: 'mock id 2' } };
			const caseRef = 'mock case ref';
			beforeEach(async () => {
				getProjectData.mockResolvedValue(fixtureApplicationResponse);
				getTimetables.mockResolvedValue(fixturesTimetableResponse);
				await setupExaminationJourney(session, caseRef);
			});
			it('should setup the journey for the selected deadline', () => {
				expect(session).toEqual({
					caseRef: 'mock case ref',
					examination: {
						deadlineItems: [
							{
								text: 'mock timetable item 1',
								textWelsh: 'mock timetable item 1 Welsh',
								value: '0'
							},
							{
								text: 'mock timetable item 2',
								textWelsh: 'mock timetable item 2 Welsh',
								value: '1'
							},
							{
								text: 'mock timetable item 3',
								textWelsh: 'mock timetable item 3 Welsh',
								value: '2'
							}
						],
						examinationTimetableId: 'mock id 2',
						showChooseDeadline: false,
						title: 'mock title 2'
					},
					projectName: 'mock project name',
					promoterName: 'mock promoter name',
					ProjectEmailAddress: 'mock project email address'
				});
			});
		});

		describe('When the use user has NOT come from the examination timetable', () => {
			const session = {};
			const caseRef = 'mock case ref';

			beforeEach(async () => {
				jest.useFakeTimers().setSystemTime(new Date('2023-01-02'));
				getProjectData.mockResolvedValue(fixtureApplicationResponse);
				getTimetables.mockResolvedValue(fixturesTimetableResponse);

				await setupExaminationJourney(session, caseRef);
			});

			it('should setup the journey for the selected deadline', () => {
				expect(session).toEqual({
					caseRef: 'mock case ref',
					examination: {
						showChooseDeadline: true
					},
					projectName: 'mock project name',
					promoterName: 'mock promoter name',
					ProjectEmailAddress: 'mock project email address'
				});
			});
		});
	});
});
