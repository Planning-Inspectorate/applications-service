const { isProjectRegionWales } = require('../../../src/utils/is-project-region-wales');

describe('isProjectRegionWales', () => {
	it("returns true if regions contains 'wales'", () => {
		const regions = ['south_east', 'north', 'wales'];
		expect(isProjectRegionWales(regions)).toBe(true);
	});

	it("returns false if regions does not contain 'wales", () => {
		const regions = ['not_wales', 'south_east'];
		expect(isProjectRegionWales(regions)).toBe(false);
	});
});
