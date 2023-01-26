const {
	getFilters
} = require('../../../../../../src/controllers/projects/documents/utils/filters/getFilters');

const {
	orderFilters
} = require('../../../../../../src/controllers/projects/documents/utils/filters/order-filters');
const {
	convertFiltersToPageView
} = require('../../../../../../src/controllers/projects/documents/utils/filters/convertFiltersToPageView');
const {
	viewModel
} = require('../../../../../../src/controllers/projects/documents/utils/filters/view-model');

jest.mock(
	'../../../../../../src/controllers/projects/documents/utils/filters/order-filters',
	() => ({
		orderFilters: jest.fn()
	})
);
jest.mock(
	'../../../../../../src/controllers/projects/documents/utils/filters/convertFiltersToPageView',
	() => ({
		convertFiltersToPageView: jest.fn()
	})
);
jest.mock('../../../../../../src/controllers/projects/documents/utils/filters/view-model', () => ({
	viewModel: jest.fn()
}));
describe('#getFilters', () => {
	describe('When getting the filters', () => {
		const mockFilters = { text: 'mock filters' };
		const mockOrderedFilters = { text: 'mock ordered filters' };
		const mockMappedFilters = { text: 'mock mapped filters' };
		const mockQuery = { text: 'mock query' };
		let result;
		beforeEach(() => {
			orderFilters.mockReturnValue(mockOrderedFilters);
			convertFiltersToPageView.mockReturnValue(mockMappedFilters);
			viewModel.mockReturnValue({
				filters: 'mock filter view model',
				activeFilters: 'active filters'
			});
			result = getFilters(mockFilters, mockQuery);
		});
		it('should order the filters', () => {
			expect(orderFilters).toHaveBeenCalledWith(mockFilters);
		});
		it('should convert filters to a page view', () => {
			expect(convertFiltersToPageView).toHaveBeenCalledWith(mockOrderedFilters);
		});
		it('should map filters to the view model', () => {
			expect(viewModel).toHaveBeenCalledWith(mockMappedFilters, mockQuery);
		});
		it('should return the view model', () => {
			expect(result).toEqual({
				activeFilters: 'active filters',
				filters: 'mock filter view model'
			});
		});
	});
});
