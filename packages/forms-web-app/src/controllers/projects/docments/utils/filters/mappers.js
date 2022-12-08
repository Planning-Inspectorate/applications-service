const { checkBoxMapper } = require('../v2/filters/utils/ui-mappers');
const mapFilterTypeToCheckBox = (types) =>
	types.map((type) => checkBoxMapper(`${type.value} (${type.count})`, type.value, false));

const names = ['Things', 'Fella'];
const mapTitleToStringValue = (name, value) => {
	let response;
	if (name === 'stage') {
		response = names[value] || `${name} ${value}`;
	}

	return response;
};

module.exports = {
	mapFilterTypeToCheckBox,
	mapTitleToStringValue
};
