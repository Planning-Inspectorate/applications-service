const {
	getActiveFilterQueryParamsWithRemovedFilter
} = require('../../../../../../src/controllers/projects/documents/utils/filters/get-active-filter-query-params-with-removed-filter');
describe('#getActiveFilterQueryParamsWithRemovedFilter', () => {
	describe('When getting the filter params', () => {
		describe('and the query has duplicate keys', () => {
			const params = {
				['filter-group-1']: ['1', '2', '3'],
				searchTerm: ''
			};
			const itemToRemove = { key: 'filter-group-1', value: '2' };
			const response = getActiveFilterQueryParamsWithRemovedFilter(params, itemToRemove);
			it('should return the query string with the single filter removed', () => {
				expect(response).toEqual('?filter-group-1=1&filter-group-1=3&searchTerm=');
			});
		});
		describe('and a filter query has a single value', () => {
			const params = {
				['filter-group-1']: '1',
				searchTerm: ''
			};
			const itemToRemove = { key: 'filter-group-1', value: '2' };
			const response = getActiveFilterQueryParamsWithRemovedFilter(params, itemToRemove);
			it('should return the query string with the single filter removed', () => {
				expect(response).toEqual('?filter-group-1=1&searchTerm=');
			});
		});
		describe('and the params contains multiple filters', () => {
			const params = {
				['filter-group-1']: '1',
				['filter-group-2']: ['9', '8', 'filter-group-2 param'],
				searchTerm: ''
			};
			const itemToRemove = { key: 'filter-group-2', value: '8' };
			const response = getActiveFilterQueryParamsWithRemovedFilter(params, itemToRemove);
			it('should return the query string with the item to remove filter removed', () => {
				expect(response).toEqual(
					'?filter-group-1=1&filter-group-2=9&filter-group-2=filter-group-2+param&searchTerm='
				);
			});
		});
		describe('and the params contain filters, page and search', () => {
			const params = {
				['filter-group-1']: '1',
				['filter-group-2']: ['9', '8', 'bar param'],
				searchTerm: '',
				page: '2'
			};
			const itemToRemove = { key: 'filter-group-1', value: '2' };
			const response = getActiveFilterQueryParamsWithRemovedFilter(params, itemToRemove);
			it('should return the query string without the page query and the filter removed', () => {
				expect(response).toEqual(
					'?filter-group-1=1&filter-group-2=9&filter-group-2=8&filter-group-2=bar+param&searchTerm='
				);
			});
		});
	});
});
