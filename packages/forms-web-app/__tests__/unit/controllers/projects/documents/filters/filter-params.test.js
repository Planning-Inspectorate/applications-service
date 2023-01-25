const {
	filterParams
} = require('../../../../../../src/controllers/projects/documents/utils/filters/filter-params');
describe('#filterParams', () => {
	describe('When getting the filter params', () => {
		describe('and the query has duplicate keys', () => {
			const params = {
				foo: ['1', '2', '3'],
				searchTerm: ''
			};
			const itemToRemove = { key: 'foo', value: '2' };
			const response = filterParams(params, itemToRemove);
			it('should return the query string with the single filter removed', () => {
				expect(response).toEqual('foo=1&foo=3&searchTerm=');
			});
		});
		describe('and a filter query has a single value', () => {
			const params = {
				foo: '1',
				searchTerm: ''
			};
			const itemToRemove = { key: 'foo', value: '2' };
			const response = filterParams(params, itemToRemove);
			it('should return the query string with the single filter removed', () => {
				expect(response).toEqual('foo=1&searchTerm=');
			});
		});
		describe('and the params contains multiple filters', () => {
			const params = {
				foo: '1',
				bar: ['9', '8', 'bar param'],
				searchTerm: ''
			};
			const itemToRemove = { key: 'bar', value: '8' };
			const response = filterParams(params, itemToRemove);
			it('should return the query string with the item to remove filter removed', () => {
				expect(response).toEqual('foo=1&bar=9&bar=bar+param&searchTerm=');
			});
		});
		describe('and the params contain filters, page and search', () => {
			const params = {
				foo: '1',
				bar: ['9', '8', 'bar param'],
				searchTerm: '',
				page: '2'
			};
			const itemToRemove = { key: 'foo', value: '2' };
			const response = filterParams(params, itemToRemove);
			it('should return the query string without the page query and the filter removed', () => {
				expect(response).toEqual('foo=1&bar=9&bar=8&bar=bar+param&searchTerm=');
			});
		});
	});
});
