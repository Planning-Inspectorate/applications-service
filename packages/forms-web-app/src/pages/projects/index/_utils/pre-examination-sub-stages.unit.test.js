const { getPreExaminationSubStage } = require('./pre-examination-sub-stages');

describe('pages/projects/index/_utils/pre-examination-sub-stages', () => {
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
				const response = getPreExaminationSubStage({
					DateOfRepresentationPeriodOpen: null
				});
				expect(response).toEqual({
					PRE_REPS: true,
					OPEN_REPS: false,
					CLOSED_REPS: false,
					PUBLISHED_REPS: false,
					RULE_6_PUBLISHED_REPS: false
				});
			});
			it('when today is before open date  - should return sub stages PRE_REPS: true', () => {
				const response = getPreExaminationSubStage({
					DateOfRepresentationPeriodOpen: openDateFuture
				});
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
			describe('when today is after open date and before close date', () => {
				describe('and the case ref is NOT included in openRegistrationCaseReferences', () => {
					it('should return sub stages OPEN_REPS: true', () => {
						const response = getPreExaminationSubStage({
							DateOfRepresentationPeriodOpen: openDatePast,
							DateOfRelevantRepresentationClose: closedDateFuture
						});
						expect(response).toEqual({
							PRE_REPS: false,
							OPEN_REPS: true,
							CLOSED_REPS: false,
							PUBLISHED_REPS: false,
							RULE_6_PUBLISHED_REPS: false
						});
					});
				});
			});
			describe('when today is after open date and closed date is null', () => {
				describe('and the case ref is NOT included in openRegistrationCaseReferences', () => {
					it('should return sub stages OPEN_REPS: true', () => {
						const response = getPreExaminationSubStage({
							DateOfRepresentationPeriodOpen: openDatePast,
							DateOfRelevantRepresentationClose: null
						});
						expect(response).toEqual({
							PRE_REPS: false,
							OPEN_REPS: true,
							CLOSED_REPS: false,
							PUBLISHED_REPS: false,
							RULE_6_PUBLISHED_REPS: false
						});
					});
				});
			});
		});
		describe('Reps Closed', () => {
			it('when today is after closed date and today is before websiteDate - should return sub stages CLOSED_REPS: true', () => {
				const response = getPreExaminationSubStage({
					DateOfRepresentationPeriodOpen: openDatePast,
					DateOfRelevantRepresentationClose: closedDatePast,
					DateRRepAppearOnWebsite: websiteDateFuture
				});
				expect(response).toEqual({
					PRE_REPS: false,
					OPEN_REPS: false,
					CLOSED_REPS: true,
					PUBLISHED_REPS: false,
					RULE_6_PUBLISHED_REPS: false
				});
			});
			it('when today is after closed date and websiteDate is null - should return sub stages CLOSED_REPS: true', () => {
				const response = getPreExaminationSubStage({
					DateOfRepresentationPeriodOpen: openDatePast,
					DateOfRelevantRepresentationClose: closedDatePast,
					DateRRepAppearOnWebsite: null
				});
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
				const response = getPreExaminationSubStage({
					DateOfRepresentationPeriodOpen: openDatePast,
					DateOfRelevantRepresentationClose: closedDatePast,
					DateRRepAppearOnWebsite: websiteDatePast
				});
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
					{
						DateOfRepresentationPeriodOpen: openDatePast,
						DateOfRelevantRepresentationClose: closedDatePast,
						DateRRepAppearOnWebsite: websiteDatePast
					},
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
});
