const { mapQueryToFilterBody } = require('./mapQueryToFilterBody');
describe('When mapping the query params to a filter body for v3 api request', () => {
	describe('and there are values', () => {
		const mockQuery = { 'stage-1': 'Fella', 'stage-2': ['fella 1', 'fella 2'] };
		const result = mapQueryToFilterBody(mockQuery);
		it('should return the filters mapped to the body object', () => {
			expect(result).toEqual([
				{
					name: 'stage',
					type: [
						{
							value: 'Fella'
						}
					],
					value: '1'
				},
				{
					name: 'stage',
					type: [
						{
							value: 'fella 1'
						},
						{
							value: 'fella 2'
						}
					],
					value: '2'
				}
			]);
		});
	});
	describe('and there are no values', () => {
		const mockQuery = {};
		const result = mapQueryToFilterBody(mockQuery);
		it('should return an empty array', () => {
			expect(result).toEqual([]);
		});
	});
});
