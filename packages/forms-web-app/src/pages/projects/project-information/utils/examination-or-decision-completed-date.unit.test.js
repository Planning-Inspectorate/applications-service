const {
	getExaminationOrDecisionCompletedDate
} = require('./examination-or-decision-completed-date');

describe('/project-information/utils/examination-or-decision-completed-date', () => {
	describe('#getExaminationOrDecisionCompletedDate', () => {
		describe('When endDate AND extensionDate are available', () => {
			it('should return extensionDate', () => {
				const endDate = '2021-01-10T00:00:00.000Z';
				const extensionDate = '2021-02-01T00:00:00.000Z';
				const response = getExaminationOrDecisionCompletedDate(endDate, extensionDate);

				expect(response).toBe(extensionDate);
			});
		});
		describe('When endDate and NO extensionDate is available', () => {
			it('should add 3 months to the endDate and return it', () => {
				const endDate = '2022-01-01';
				const extensionDate = null;
				const response = getExaminationOrDecisionCompletedDate(endDate, extensionDate);

				expect(response).toBe('2022-04-01');
			});

			it("and should handle 'troublesome' dates correctly:", () => {
				const endDate31August = '2022-08-31';
				const endDate31January = '2022-01-31';
				const endDate31March = '2022-03-31';
				const endDate29November = '2022-11-29';
				const endDate30November = '2022-11-30';
				const endDate29NovGoingIntoLeapYear = '2023-11-29';
				const endDate30NovGoingIntoLeapYear = '2023-11-30';
				const extensionDate = null;

				const response31August = getExaminationOrDecisionCompletedDate(
					endDate31August,
					extensionDate
				);
				const response31January = getExaminationOrDecisionCompletedDate(
					endDate31January,
					extensionDate
				);
				const response31March = getExaminationOrDecisionCompletedDate(
					endDate31March,
					extensionDate
				);
				const response29November = getExaminationOrDecisionCompletedDate(
					endDate29November,
					extensionDate
				);
				const response30November = getExaminationOrDecisionCompletedDate(
					endDate30November,
					extensionDate
				);
				const response29NovGoingIntoLeapYear = getExaminationOrDecisionCompletedDate(
					endDate29NovGoingIntoLeapYear,
					extensionDate
				);
				const response30NovGoingIntoLeapYear = getExaminationOrDecisionCompletedDate(
					endDate30NovGoingIntoLeapYear,
					extensionDate
				);

				expect(response31August).toBe('2022-11-30');
				expect(response31January).toBe('2022-04-30');
				expect(response31March).toBe('2022-06-30');
				expect(response29November).toBe('2023-02-28');
				expect(response30November).toBe('2023-02-28');
				expect(response29NovGoingIntoLeapYear).toBe('2024-02-29');
				expect(response30NovGoingIntoLeapYear).toBe('2024-02-29');
			});
		});
	});
});
