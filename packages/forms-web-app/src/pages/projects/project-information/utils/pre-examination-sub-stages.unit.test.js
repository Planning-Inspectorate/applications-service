const { getPreExaminationSubStage } = require('./pre-examination-sub-stages');
describe('#getPreExaminationSubStage', () => {
	const today = '2020-01-01';
	const openDateFuture = '2023-01-01';
	const openDatePast = '2019-01-01';
	const closedDateFuture = '2021-01-01';
	const closedDatePast = '2018-01-01';
	const websiteDateFuture = '2021-01-01';
	const websiteDatePast = '2018-01-01';

	beforeAll(() => {
		jest.useFakeTimers().setSystemTime(new Date(today));
	});

	describe('Pre Reps', () => {
		it('when open date is NULL - should return sub stages PRE_REPS: true', () => {
			const response = getPreExaminationSubStage(null);
			expect(response).toEqual({
				PRE_REPS: true,
				OPEN_REPS: false,
				CLOSED_REPS: false,
				PUBLISHED_REPS: false,
				RULE_6_PUBLISHED_REPS: false
			});
		});
		it('when today is before open date  - should return sub stages PRE_REPS: true', () => {
			const response = getPreExaminationSubStage(openDateFuture);
			expect(response).toEqual({
				PRE_REPS: true,
				OPEN_REPS: false,
				CLOSED_REPS: false,
				PUBLISHED_REPS: false,
				RULE_6_PUBLISHED_REPS: false
			});
		});
	});
	describe('Reps Open', () => {
		it('when today is after open date and closed date is before today - should return sub stages PRE_REPS: true', () => {
			const response = getPreExaminationSubStage(openDatePast, closedDateFuture);
			expect(response).toEqual({
				PRE_REPS: false,
				OPEN_REPS: true,
				CLOSED_REPS: false,
				PUBLISHED_REPS: false,
				RULE_6_PUBLISHED_REPS: false
			});
		});
		it('when today is after open date and closed date is null - should return sub stages PRE_REPS: true', () => {
			const response = getPreExaminationSubStage(openDatePast, null);
			expect(response).toEqual({
				PRE_REPS: false,
				OPEN_REPS: true,
				CLOSED_REPS: false,
				PUBLISHED_REPS: false,
				RULE_6_PUBLISHED_REPS: false
			});
		});
	});
	describe('Reps Closed', () => {
		it('when today is after closed date and today is before websiteDate - should return sub stages CLOSED_REPS: true', () => {
			const response = getPreExaminationSubStage(openDatePast, closedDatePast, websiteDateFuture);
			expect(response).toEqual({
				PRE_REPS: false,
				OPEN_REPS: false,
				CLOSED_REPS: true,
				PUBLISHED_REPS: false,
				RULE_6_PUBLISHED_REPS: false
			});
		});
	});
	describe('Reps published', () => {
		it('when today is after website publish date - should return sub stages PUBLISHED_REPS: true', () => {
			const response = getPreExaminationSubStage(openDatePast, closedDatePast, websiteDatePast);
			expect(response).toEqual({
				PRE_REPS: false,
				OPEN_REPS: false,
				CLOSED_REPS: false,
				PUBLISHED_REPS: true,
				RULE_6_PUBLISHED_REPS: false
			});
		});
	});
	describe('Reps Rule 6 published', () => {
		it('when today is after website publish date and rule 6 is present - should return sub stages RULE_6_PUBLISHED_REPS: true', () => {
			const response = getPreExaminationSubStage(
				openDatePast,
				closedDatePast,
				websiteDatePast,
				true
			);
			expect(response).toEqual({
				PRE_REPS: false,
				OPEN_REPS: false,
				CLOSED_REPS: false,
				PUBLISHED_REPS: false,
				RULE_6_PUBLISHED_REPS: true
			});
		});
	});
});
