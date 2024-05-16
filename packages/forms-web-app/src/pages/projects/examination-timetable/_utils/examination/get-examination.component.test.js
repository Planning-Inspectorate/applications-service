const { getExamination } = require('./get-examination');
const { mockI18n } = require('../../../../_mocks/i18n');
const examinationTimetableTranslation_EN = require('../../_translations/en.json');

const examinationTimetableTranslations = {
	examinationTimetable: examinationTimetableTranslation_EN
};
const i18n = mockI18n(examinationTimetableTranslations);

jest.mock('../../../../../lib/application-api-wrapper', () => ({
	getTimetables: jest.fn()
}));

describe('controllers/projects/examination-timetable/utils/examination/get-examination', () => {
	describe('#getExamination', () => {
		describe('When getting the examination data for the examination timetable', () => {
			let result;
			const ConfirmedStartOfExamination = '2023-01-22';
			const DateTimeExaminationEnds = '2023-01-24';
			const mockData = {
				ConfirmedStartOfExamination,
				DateTimeExaminationEnds
			};
			beforeEach(() => {
				result = getExamination(mockData, i18n);
			});
			it('should return the mock examination data', () => {
				expect(result).toEqual({
					closeDate: 'The examination closed on 24 January 2023',
					startDate: 'The examination opened on 22 January 2023'
				});
			});
		});
	});
});
