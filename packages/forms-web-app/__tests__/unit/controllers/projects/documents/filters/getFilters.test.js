const {
	getFilters
} = require('../../../../../../src/controllers/projects/docments/utils/filters/getFilters');
const {
	convertFiltersToPageView
} = require('../../../../../../src/controllers/projects/docments/utils/filters/convertFiltersToPageView');
const {
	viewModel
} = require('../../../../../../src/controllers/projects/docments/utils/filters/view-model');
jest.mock(
	'../../../../../../src/controllers/projects/docments/utils/filters/convertFiltersToPageView',
	() => ({
		convertFiltersToPageView: jest.fn()
	})
);
jest.mock('../../../../../../src/controllers/projects/docments/utils/filters/view-model', () => ({
	viewModel: jest.fn()
}));
describe('#getFilters', () => {
	describe('When getting the filters', () => {
		const mockFilters = { text: 'mock filters' };
		const mockQuery = { text: 'mock query' };
		let result;
		beforeEach(() => {
			convertFiltersToPageView.mockReturnValue('mock mapped filters');
			viewModel.mockReturnValue('mock filter view model');
			result = getFilters(mockFilters, mockQuery);
		});
		it('should convert filters to a page view', () => {
			expect(convertFiltersToPageView).toHaveBeenCalledWith({ text: 'mock filters' });
		});
		it('should map filters to the view model', () => {
			expect(viewModel).toHaveBeenCalledWith('mock mapped filters', { text: 'mock query' });
		});
		it('should return the view model', () => {
			expect(result).toEqual('mock filter view model');
		});
	});
});
