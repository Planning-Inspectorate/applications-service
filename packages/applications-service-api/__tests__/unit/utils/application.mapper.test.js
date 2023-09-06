const { buildApiFiltersFromNIApplications } = require('../../../src/utils/application.mapper');
const {
	APPLICATIONS_NI_FILTER_COLUMNS,
	APPLICATIONS_FO_FILTERS
} = require('../../__data__/application');

describe('application.mapper', () => {
	describe('buildApiFiltersFromNIApplications', () => {
		it('maps applications from NI database to filters in api format', () => {
			const result = buildApiFiltersFromNIApplications(APPLICATIONS_NI_FILTER_COLUMNS);

			expect(result).toEqual(APPLICATIONS_FO_FILTERS);
		});
	});
});
