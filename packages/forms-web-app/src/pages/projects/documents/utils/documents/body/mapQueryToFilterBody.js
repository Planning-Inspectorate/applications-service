const {
	makeIntoArray
} = require('../../../../../../controllers/examination/select-file/utils/helpers');
const mapQueryToFilterBody = (query) =>
	Object.entries(query).map(([key, value]) => {
		const [name, splitValue] = key.split('-');
		return {
			name,
			value: splitValue,
			type: makeIntoArray(value).map((item) => ({
				value: item
			}))
		};
	});
module.exports = {
	mapQueryToFilterBody
};
