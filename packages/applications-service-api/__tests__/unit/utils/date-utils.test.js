const { formatDate } = require('../../../src/utils/date-utils');

describe('utils/date-utils', () => {
	test(`format date`, () => {
		expect(formatDate('2021-02-02')).toEqual('Tuesday 2 February 2021');
	});
});
