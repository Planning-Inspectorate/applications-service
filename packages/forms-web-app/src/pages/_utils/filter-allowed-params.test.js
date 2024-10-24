const { filterAllowedParams } = require('./filter-allowed-params');

describe('pages/_utils/filter-allowed-params', () => {
	describe('#filterAllowedParams', () => {
		it('should filter out parameters not in the allowed list or not matching stage regex', () => {
			const paramsArr = ['param1', 'stage-1', 'stage-10', 'param2', 'DROP TABLE Users'];
			const allowedParamsArr = ['param1', 'param2'];

			const result = filterAllowedParams(paramsArr, allowedParamsArr);

			expect(result).toEqual(['param1', 'stage-1', 'param2']);
		});

		it('should be case insensitive', () => {
			const paramsArr = ['param1', 'PARAM2', 'param3', 'Stage-1'];
			const allowedParamsArr = ['param1', 'param2'];

			const result = filterAllowedParams(paramsArr, allowedParamsArr);

			expect(result).toEqual(['param1', 'PARAM2', 'Stage-1']);
		});
	});
});
