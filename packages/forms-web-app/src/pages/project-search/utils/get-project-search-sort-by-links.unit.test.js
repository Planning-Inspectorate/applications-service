const { getProjectSearchSortByLinks } = require('./get-project-search-sort-by-links');

describe('project-search/utils/get-project-search-sort-by-links', () => {
	describe('#getProjectSearchSortByLinks', () => {
		describe('When getting the project search sort by links', () => {
			describe('and there are no query parameters', () => {
				let projectSearchSortByLinks;

				beforeEach(() => {
					projectSearchSortByLinks = getProjectSearchSortByLinks({});
				});

				it('should return the default project search sort by links', () => {
					expect(projectSearchSortByLinks).toEqual([
						{ link: '?sortBy=%2BProjectName&page=1', name: 'Project name', sort: 'none' },
						{ link: '?sortBy=%2BPromoterName&page=1', name: 'Applicant', sort: 'none' },
						{ link: '?sortBy=%2BStage&page=1', name: 'Stage', sort: 'none' }
					]);
				});
			});

			describe('and there are query parameters', () => {
				let projectSearchSortByLinks;

				beforeEach(() => {
					projectSearchSortByLinks = getProjectSearchSortByLinks({ sortBy: '+ProjectName' });
				});

				it('should return the project search sort by links with project name sorted by ascending', () => {
					expect(projectSearchSortByLinks).toEqual([
						{ link: '?sortBy=-ProjectName&page=1', name: 'Project name', sort: 'ascending' },
						{ link: '?sortBy=%2BPromoterName&page=1', name: 'Applicant', sort: 'none' },
						{ link: '?sortBy=%2BStage&page=1', name: 'Stage', sort: 'none' }
					]);
				});
			});
		});
	});
});
