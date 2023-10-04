const { makeIntoArray } = require('../../../../../examination/select-file/utils/helpers');
const mapQueryToFilterBody = (query) =>
	Object.entries(query).map(([key, value]) => {
		const [name, ...splitValue] = key.split('-');
		return {
			name,
			value: splitValue.join('-'),
			type: makeIntoArray(value).map((item) => ({
				value: item
			}))
		};
	});
module.exports = {
	mapQueryToFilterBody
};
