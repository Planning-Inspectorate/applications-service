const {
	viewModel
} = require('../../../../../../src/controllers/projects/documents/utils/filters/view-model');
const { mockQueryFixture, mockFilterFixture, filterGroup1 } = require('./fixtures');
describe('When markings filters as checked for the view model based on the query values', () => {
	describe('and there is one filter', () => {
		describe('and there is a single filter item selected', () => {
			const filters = [filterGroup1];
			const mockQuery = {
				'filter group 1': 'filter-group-1-item-1',
				searchTerm: ''
			};
			let response;
			beforeEach(() => {
				response = viewModel(filters, mockQuery);
			});
			it('should return the filter list with one item checked', () => {
				expect(response.filters).toEqual([
					{
						name: 'filter group 1',
						idPrefix: 'filter group 1',
						title: 'filter group 1  (4)',
						label: 'label 1',
						items: [
							{
								text: 'filter-group-1-item-1 (3)',
								value: 'filter-group-1-item-1',
								checked: true
							},
							{ text: 'filter-group-1-item-2 (1)', value: 'filter-group-1-item-2', checked: false }
						]
					}
				]);
			});
			it('should return the active filters with the label, tag label and params with active filter removed', () => {
				expect(response.activeFilters).toEqual([
					{
						label: 'label 1',
						tags: [
							{
								alt: 'Remove filter-group-1-item-1 filter',
								icon: 'close',
								link: '?searchTerm=',
								text: 'filter-group-1-item-1'
							}
						]
					}
				]);
			});
		});
		describe('and there are multiple filter items selected', () => {
			const filters = [filterGroup1];
			const mockQuery = {
				'filter group 1': ['filter-group-1-item-1', 'filter-group-1-item-2']
			};
			let response;
			beforeEach(() => {
				response = viewModel(filters, mockQuery);
			});

			it('should return the filter list with both item checked', () => {
				expect(response.filters).toEqual([
					{
						name: 'filter group 1',
						idPrefix: 'filter group 1',
						title: 'filter group 1  (4)',
						label: 'label 1',
						items: [
							{
								text: 'filter-group-1-item-1 (3)',
								value: 'filter-group-1-item-1',
								checked: true
							},
							{ text: 'filter-group-1-item-2 (1)', value: 'filter-group-1-item-2', checked: true }
						]
					}
				]);
			});
			it('should return the active filters with the label, tag label and params with active filter removed', () => {
				expect(response.activeFilters).toEqual([
					{
						label: 'label 1',
						tags: [
							{
								alt: 'Remove filter-group-1-item-1 filter',
								icon: 'close',
								link: '?filter+group+1=filter-group-1-item-2',
								text: 'filter-group-1-item-1'
							},
							{
								alt: 'Remove filter-group-1-item-2 filter',
								icon: 'close',
								link: '?filter+group+1=filter-group-1-item-1',
								text: 'filter-group-1-item-2'
							}
						]
					}
				]);
			});
		});
	});
	describe('and there are multiple filters', () => {
		describe('and there is a single filter item selected', () => {
			let response;
			beforeEach(() => {
				response = viewModel(mockFilterFixture, mockQueryFixture);
			});

			it('should return the filter list with filter group 1 (one item as checked) and filter group 2 (both marked as checked)', () => {
				expect(response.filters).toEqual([
					{
						idPrefix: 'filter group 1',
						label: 'label 1',
						items: [
							{
								checked: true,
								text: 'filter-group-1-item-1 (3)',
								value: 'filter-group-1-item-1'
							},
							{
								checked: false,
								text: 'filter-group-1-item-2 (1)',
								value: 'filter-group-1-item-2'
							}
						],
						name: 'filter group 1',
						title: 'filter group 1  (4)'
					},
					{
						idPrefix: 'filter group 2',
						label: 'label 2',
						items: [
							{
								checked: true,
								text: 'filter-group-2-item-1 (6)',
								value: 'filter-group-2-item-1'
							},
							{
								checked: true,
								text: 'filter-group-2-item-2 (1)',
								value: 'filter-group-2-item-2'
							}
						],
						name: 'filter group 2',
						title: 'filter group 2  (7)'
					}
				]);
			});
			it('should return the active filters with the label, tag label and params with active filter removed for filters only in the query params', () => {
				expect(response.activeFilters).toEqual([
					{
						label: 'label 1',
						tags: [
							{
								alt: 'Remove filter-group-1-item-1 filter',
								icon: 'close',
								link: '?filter+group+2=filter-group-2-item-1&filter+group+2=filter-group-2-item-2&searchTerm=',
								text: 'filter-group-1-item-1'
							}
						]
					},
					{
						label: 'label 2',
						tags: [
							{
								alt: 'Remove filter-group-2-item-1 filter',
								icon: 'close',
								link: '?filter+group+1=filter-group-1-item-1&filter+group+2=filter-group-2-item-2&searchTerm=',
								text: 'filter-group-2-item-1'
							},
							{
								alt: 'Remove filter-group-2-item-2 filter',
								icon: 'close',
								link: '?filter+group+1=filter-group-1-item-1&filter+group+2=filter-group-2-item-1&searchTerm=',
								text: 'filter-group-2-item-2'
							}
						]
					}
				]);
			});
		});
	});
});
