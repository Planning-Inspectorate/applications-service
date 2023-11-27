const { checkBoxMapper } = require('./checkBoxMapper');

const mapFilterTypeToCheckBox = (types) =>
	types.map((type) => checkBoxMapper(`${type.value} (${type.count})`, type.value, false));

module.exports = {
	mapFilterTypeToCheckBox
};
