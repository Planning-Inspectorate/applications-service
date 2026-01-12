const { getPageData } = require('./get-page-data');
const { mockI18n } = require('../../_mocks/i18n');

const projectsMapTranslations_EN = require('../_translations/en.json');

const i18n = mockI18n({
	projectsMap: projectsMapTranslations_EN
});

describe('projects-map/utils/get-page-data', () => {
	describe('#getPageData', () => {
		describe('When preparing page data for projects map view', () => {
			let mockFilters;
			let mockApplications;
			let mockPagination;

			beforeEach(() => {
				mockFilters = [
					{
						name: 'region',
						value: 'london',
						label: 'London',
						label_cy: 'Llundain',
						count: 8
					},
					{
						name: 'sector',
						value: 'energy',
						label: 'Energy',
						label_cy: 'Ynni',
						count: 6
					},
					{
						name: 'stage',
						value: 'examination',
						label: 'Examination',
						label_cy: 'Archwilio',
						count: 4
					}
				];

				mockApplications = [
					{ id: 1, name: 'Project 1' },
					{ id: 2, name: 'Project 2' }
				];

				mockPagination = {
					totalItems: 2,
					currentPage: 1,
					totalPages: 1,
					itemsPerPage: 25
				};
			});

			describe('and no query parameters are provided', () => {
				let pageData;

				beforeEach(() => {
					pageData = getPageData(i18n, {}, mockApplications, mockFilters, mockPagination);
				});

				it('should return complete page data object', () => {
					expect(pageData).toHaveProperty('filters');
					expect(pageData).toHaveProperty('activeFilters');
					expect(pageData).toHaveProperty('pagination');
				});

				it('should include pagination data', () => {
					expect(pageData.pagination).toEqual(mockPagination);
				});

				it('should include formatted filter data', () => {
					expect(pageData.filters).toEqual(expect.any(Array));
					expect(pageData.filters.length).toBeGreaterThan(0);
				});

				it('should have no active filters', () => {
					expect(pageData.activeFilters).toEqual([]);
				});
			});

			describe('and filter query parameters are provided', () => {
				let pageData;

				beforeEach(() => {
					pageData = getPageData(
						i18n,
						{
							region: 'london',
							sector: 'energy'
						},
						mockApplications,
						mockFilters,
						mockPagination
					);
				});

				it('should include active filters in page data', () => {
					expect(pageData.activeFilters).toHaveLength(2);
					expect(pageData.activeFilters[0].label).toBe('Location');
					expect(pageData.activeFilters[1].label).toBe('Sector');
				});

				it('should mark selected filters as checked', () => {
					const regionFilter = pageData.filters.find((f) => f.name === 'region');
					const londonItem = regionFilter.items.find((item) => item.value === 'london');

					expect(londonItem.checked).toBe(true);
				});
			});

			describe('and empty filters are provided', () => {
				let pageData;

				beforeEach(() => {
					pageData = getPageData(i18n, {}, mockApplications, [], mockPagination);
				});

				it('should return empty filters array', () => {
					expect(pageData.filters).toEqual([]);
				});

				it('should preserve pagination data', () => {
					expect(pageData.pagination).toEqual(mockPagination);
				});
			});

			describe('and different pagination states are provided', () => {
				it('should preserve pagination data for page 1', () => {
					const pagination1 = {
						totalItems: 100,
						currentPage: 1,
						totalPages: 4,
						itemsPerPage: 25
					};

					const pageData = getPageData(i18n, {}, mockApplications, mockFilters, pagination1);

					expect(pageData.pagination).toEqual(pagination1);
				});

				it('should preserve pagination data for page 2', () => {
					const pagination2 = {
						totalItems: 100,
						currentPage: 2,
						totalPages: 4,
						itemsPerPage: 25
					};

					const pageData = getPageData(i18n, {}, mockApplications, mockFilters, pagination2);

					expect(pageData.pagination).toEqual(pagination2);
				});
			});

			describe('and all available data is provided', () => {
				let pageData;

				beforeEach(() => {
					pageData = getPageData(
						i18n,
						{
							region: 'london',
							sector: 'energy',
							stage: 'examination'
						},
						mockApplications,
						mockFilters,
						mockPagination
					);
				});

				it('should combine all filter and pagination data', () => {
					expect(pageData).toHaveProperty('filters');
					expect(pageData).toHaveProperty('activeFilters');
					expect(pageData).toHaveProperty('pagination');

					expect(pageData.filters).toHaveLength(3);
					expect(pageData.activeFilters).toHaveLength(3);
					expect(pageData.pagination).toEqual(mockPagination);
				});

				it('should have correct filter order (region, sector, stage)', () => {
					const filterNames = pageData.filters.map((f) => f.name);

					expect(filterNames).toEqual(['region', 'sector', 'stage']);
				});
			});
		});
	});
});
