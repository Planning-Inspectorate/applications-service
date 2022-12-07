const { makeIntoArray } = require('../../../../examination/select-file/utils/helpers');
const mapQueryToFilterBody = (query) => {
	const localQuery = JSON.parse(JSON.stringify(query));
	let temp = [];
	delete localQuery.searchTerm;

	for (const [key, value] of Object.entries(localQuery)) {
		const [name, splitValue] = key.split('-');
		temp.push({
			name,
			value: splitValue,
			type: makeIntoArray(value).map((item) => ({
				value: item
			}))
		});
	}
	return temp;
};

module.exports = {
	mapQueryToFilterBody
};
