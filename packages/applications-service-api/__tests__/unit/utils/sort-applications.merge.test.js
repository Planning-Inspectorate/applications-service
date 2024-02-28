const sortApplications = require('../../../src/utils/sort-applications.merge');
describe('sortApplications', () => {
	describe('when no sort key is provided', () => {
		it('should sort by ascending ProjectName', () => {
			expect(
				sortApplications([{ ProjectName: 'b' }, { ProjectName: 'a' }, { ProjectName: 'c' }])
			).toEqual([{ ProjectName: 'a' }, { ProjectName: 'b' }, { ProjectName: 'c' }]);
		});
	});

	describe('when sorting by ProjectName', () => {
		const unsortedProjects = [{ ProjectName: 'b' }, { ProjectName: 'a' }, { ProjectName: 'c' }];
		const sortedAscendingProjects = [
			{ ProjectName: 'a' },
			{ ProjectName: 'b' },
			{ ProjectName: 'c' }
		];
		const sortedDescendingProjects = [
			{ ProjectName: 'c' },
			{ ProjectName: 'b' },
			{ ProjectName: 'a' }
		];
		it.each([
			['+ProjectName', unsortedProjects, sortedAscendingProjects],
			['-ProjectName', unsortedProjects, sortedDescendingProjects],
			['ProjectName', unsortedProjects, sortedAscendingProjects]
		])('should sort by %s', (sort, unsorted, expected) => {
			expect(sortApplications(unsorted, sort)).toEqual(expected);
		});
	});

	describe('when sorting by PromoterName', () => {
		const unsortedProjects = [{ PromoterName: 'b' }, { PromoterName: 'a' }, { PromoterName: 'c' }];
		const sortedAscendingProjects = [
			{ PromoterName: 'a' },
			{ PromoterName: 'b' },
			{ PromoterName: 'c' }
		];
		const sortedDescendingProjects = [
			{ PromoterName: 'c' },
			{ PromoterName: 'b' },
			{ PromoterName: 'a' }
		];
		it.each([
			['+PromoterName', unsortedProjects, sortedAscendingProjects],
			['-PromoterName', unsortedProjects, sortedDescendingProjects],
			['PromoterName', unsortedProjects, sortedAscendingProjects]
		])('should sort by %s', (sort, unsorted, expected) => {
			expect(sortApplications(unsorted, sort)).toEqual(expected);
		});
	});

	describe('when sorting by DateOfDCOSubmission', () => {
		const unsortedProjects = [
			{ DateOfDCOSubmission: '2021-01-01' },
			{ DateOfDCOSubmission: '2021-01-03' },
			{ DateOfDCOSubmission: '2021-01-02' }
		];
		const sortedAscendingProjects = [
			{ DateOfDCOSubmission: '2021-01-01' },
			{ DateOfDCOSubmission: '2021-01-02' },
			{ DateOfDCOSubmission: '2021-01-03' }
		];
		const sortedDescendingProjects = [
			{ DateOfDCOSubmission: '2021-01-03' },
			{ DateOfDCOSubmission: '2021-01-02' },
			{ DateOfDCOSubmission: '2021-01-01' }
		];
		it.each([
			['+DateOfDCOSubmission', unsortedProjects, sortedAscendingProjects],
			['-DateOfDCOSubmission', unsortedProjects, sortedDescendingProjects],
			['DateOfDCOSubmission', unsortedProjects, sortedAscendingProjects]
		])('should sort by %s', (sort, unsorted, expected) => {
			expect(sortApplications(unsorted, sort)).toEqual(expected);
		});
	});

	describe('when sorting by ConfirmedDateOfDecision', () => {
		const unsortedProjects = [
			{ ConfirmedDateOfDecision: '2021-01-01' },
			{ ConfirmedDateOfDecision: '2021-01-03' },
			{ ConfirmedDateOfDecision: '2021-01-02' }
		];
		const sortedAscendingProjects = [
			{ ConfirmedDateOfDecision: '2021-01-01' },
			{ ConfirmedDateOfDecision: '2021-01-02' },
			{ ConfirmedDateOfDecision: '2021-01-03' }
		];
		const sortedDescendingProjects = [
			{ ConfirmedDateOfDecision: '2021-01-03' },
			{ ConfirmedDateOfDecision: '2021-01-02' },
			{ ConfirmedDateOfDecision: '2021-01-01' }
		];
		it.each([
			['+ConfirmedDateOfDecision', unsortedProjects, sortedAscendingProjects],
			['-ConfirmedDateOfDecision', unsortedProjects, sortedDescendingProjects],
			['ConfirmedDateOfDecision', unsortedProjects, sortedAscendingProjects]
		])('should sort by %s', (sort, unsorted, expected) => {
			expect(sortApplications(unsorted, sort)).toEqual(expected);
		});
	});

	describe('when sorting by Stage', () => {
		const unsortedProjects = [{ Stage: 2 }, { Stage: 1 }, { Stage: 3 }];
		const sortedAscendingProjects = [{ Stage: 1 }, { Stage: 2 }, { Stage: 3 }];
		const sortedDescendingProjects = [{ Stage: 3 }, { Stage: 2 }, { Stage: 1 }];
		it.each([
			['+Stage', unsortedProjects, sortedAscendingProjects],
			['-Stage', unsortedProjects, sortedDescendingProjects],
			['Stage', unsortedProjects, sortedAscendingProjects]
		])('should sort by %s', (sort, unsorted, expected) => {
			expect(sortApplications(unsorted, sort)).toEqual(expected);
		});
	});
});
