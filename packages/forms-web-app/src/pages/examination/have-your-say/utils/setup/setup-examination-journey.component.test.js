const { setupExaminationJourney } = require('./setup-examination-journey');
const { getAppData } = require('../../../../../services/application.service');
const {
	fixtureApplicationResponse
} = require('../../../../../services/__mocks__/application.fixtures');
const { getTimetables } = require('../../../../../services/timetable.service');
const {
	fixturesTimetableResponse
} = require('../../../../../services/__mocks__/timetable.fixtures');

jest.mock('../../../../../services/application.service', () => ({
	getAppData: jest.fn()
}));
jest.mock('../../../../../services/timetable.service', () => ({
	getTimetables: jest.fn()
}));
describe('have your say decide exam journey route', () => {
	describe('#setupExaminationJourney', () => {
		describe('When the use user has come from the examination timetable', () => {
			const session = { examination: { examinationTimetableId: 'mock id 2' } };
			const caseRef = 'mock case ref';
			beforeEach(async () => {
				getAppData.mockResolvedValue(fixtureApplicationResponse);
				getTimetables.mockResolvedValue(fixturesTimetableResponse);
				await setupExaminationJourney(session, caseRef);
			});
			it('should setup the journey for the selected deadline', () => {
				expect(session).toEqual({
					caseRef: 'mock case ref',
					examination: {
						caseRef: 'mock case ref',
						deadlineItems: [
							{
								text: 'Comments on submissions received for Deadline 2',
								value: '0'
							},
							{
								text: 'Written summaries of oral submissions made at Hearings held during the w/c 26 September',
								value: '1'
							},
							{
								text: 'Updated SoCG requested by the ExA',
								value: '2'
							}
						],
						examinationTimetableId: 'mock id 2',
						showDeadlineSelection: true,
						title: 'mock title 2'
					},
					projectName: 'mock project name',
					promoterName: 'mock promoter name'
				});
			});
		});
		describe('When the use user has NOT come from the examination timetable', () => {
			const session = {};
			const caseRef = 'mock case ref';
			beforeEach(async () => {
				getAppData.mockResolvedValue(fixtureApplicationResponse);
				getTimetables.mockResolvedValue(fixturesTimetableResponse);
				await setupExaminationJourney(session, caseRef);
			});
			it('should setup the journey for the selected deadline', () => {
				expect(session).toEqual({
					caseRef: 'mock case ref',
					examination: {
						showDeadlineSelection: false
					},
					projectName: 'mock project name',
					promoterName: 'mock promoter name'
				});
			});
		});
	});
});
