const { getFilters } = require('./getFilters');

const { orderFilters } = require('./order-filters');
const { convertFiltersToPageView } = require('./convertFiltersToPageView');
const { viewModel } = require('./view-model');
const { getDatesFilter } = require('./dates/get-dates-filter');
const { mockI18n } = require('../../../../_mocks/i18n');

jest.mock('./order-filters', () => ({
	orderFilters: jest.fn()
}));
jest.mock('./convertFiltersToPageView', () => ({
	convertFiltersToPageView: jest.fn()
}));
jest.mock('./view-model', () => ({
	viewModel: jest.fn()
}));
jest.mock('./dates/get-dates-filter', () => ({
	getDatesFilter: jest.fn()
}));

const commonTranslations_EN = require('../../../../../locales/en/common.json');
const projectsDocumentsTranslations_EN = require('../../_translations/en.json');

const i18n = mockI18n({
	common: commonTranslations_EN,
	projectsDocuments: projectsDocumentsTranslations_EN
});

describe('pages/projects/documents/_utils/filters/getFilters', () => {
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
				result = getFilters(i18n, mockFilters, mockQuery);
			});
			it('should order the filters', () => {
				expect(orderFilters).toHaveBeenCalledWith(mockFilters);
			});
			it('should convert filters to a page view', () => {
				expect(convertFiltersToPageView).toHaveBeenCalledWith(i18n, mockOrderedFilters);
			});
			it('should map filters to the view model', () => {
				expect(viewModel).toHaveBeenCalledWith(mockMappedFilters, mockQuery);
			});
			it('should get the dates filters', () => {
				expect(getDatesFilter).toHaveBeenCalledWith(i18n, mockQuery);
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
});
