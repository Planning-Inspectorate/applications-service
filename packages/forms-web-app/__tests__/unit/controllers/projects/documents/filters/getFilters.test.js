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
const {
	getDatesFilter
} = require('../../../../../../src/controllers/projects/documents/utils/filters/dates/get-dates-filter');

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
jest.mock(
	'../../../../../../src/controllers/projects/documents/utils/filters/dates/get-dates-filter',
	() => ({
		getDatesFilter: jest.fn()
	})
);

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
				activeFilters: ['mock active filters'],
				filters: ['mock filter view model']
			});
			getDatesFilter.mockReturnValue({
				activeDateFilters: ['mock active dates filter'],
				datesFilter: ['mock dates filter'],
				datesFilterErrorSummary: 'mock dates filter error summary'
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
		it('should get the dates filters', () => {
			expect(getDatesFilter).toHaveBeenCalledWith(mockQuery);
		});
		it('should return the view model', () => {
			expect(result).toEqual({
				activeFilters: ['mock active filters', 'mock active dates filter'],
				filters: ['mock filter view model', 'mock dates filter'],
				datesFilterErrorSummary: 'mock dates filter error summary'
			});
		});
	});
});
