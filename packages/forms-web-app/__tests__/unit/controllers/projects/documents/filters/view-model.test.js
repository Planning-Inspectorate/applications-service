const {
	viewModel
} = require('../../../../../../src/controllers/projects/documents/utils/filters/view-model');
const { mockQueryFixture, mockFilterFixture, filterOne } = require('./fixtures');
describe('When markings filters as checked for the view model based on the query values', () => {
	describe('and there is one filter', () => {
		describe('and there is a single filter item selected', () => {
			const filters = [filterOne];
			const mockQuery = {
				'stage 1': 'Procedural Decisions',
				searchTerm: ''
			};
			const response = viewModel(filters, mockQuery);

			it('should return the filter list with one item checked', () => {
				expect(response).toEqual([
					{
						name: 'stage 1',
						idPrefix: 'stage 1',
						title: 'stage 1  (4)',
						items: [
							{
								text: 'Procedural Decisions (3)',
								value: 'Procedural Decisions',
								checked: true
							},
							{ text: 'TEN E (1)', value: 'TEN E', checked: false }
						]
					}
				]);
			});
		});

		describe('and there are multiple filter items selected', () => {
			const filters = [filterOne];
			const mockQuery = {
				'stage 1': ['Procedural Decisions', 'TEN E']
			};
			const response = viewModel(filters, mockQuery);

			it('should return the filter list with both item checked', () => {
				expect(response).toEqual([
					{
						name: 'stage 1',
						idPrefix: 'stage 1',
						title: 'stage 1  (4)',
						items: [
							{
								text: 'Procedural Decisions (3)',
								value: 'Procedural Decisions',
								checked: true
							},
							{ text: 'TEN E (1)', value: 'TEN E', checked: true }
						]
					}
				]);
			});
		});
	});
	describe('and there are multiple filters', () => {
		describe('and there is a single filter item selected', () => {
			const response = viewModel(mockFilterFixture, mockQueryFixture);

			it('should return the filter list with stage 1 (one item as checked) and stage 4 (boht marked as checked)', () => {
				expect(response).toEqual([
					{
						idPrefix: 'stage 1',
						items: [
							{
								checked: true,
								text: 'Procedural Decisions (3)',
								value: 'Procedural Decisions'
							},
							{
								checked: false,
								text: 'TEN E (1)',
								value: 'TEN E'
							}
						],
						name: 'stage 1',
						title: 'stage 1  (4)'
					},
					{
						idPrefix: 'stage 4',
						items: [
							{
								checked: true,
								text: 'Deadline 2 (6)',
								value: 'Deadline 2'
							},
							{
								checked: true,
								text: 'Proc Decision (1)',
								value: 'Proc Decision'
							}
						],
						name: 'stage 4',
						title: 'stage 4  (7)'
					}
				]);
			});
		});

		describe('and there are multiple filter items selected', () => {});
	});
});
