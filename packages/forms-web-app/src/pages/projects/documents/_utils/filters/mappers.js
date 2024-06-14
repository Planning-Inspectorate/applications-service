const { checkBoxMapper } = require('./checkBoxMapper');
const { isLangWelsh } = require('../../../../_utils/is-lang-welsh');

const mapFilterTypeToCheckBox = (i18n, types) =>
	types.map((type) => {
		const value = (() => {
			if (isLangWelsh(i18n.language) && type.value_cy) {
				return type.value_cy;
			}

			return type.value;
		})();

		return checkBoxMapper(`${value} (${type.count})`, type.value, false);
	});

module.exports = {
	mapFilterTypeToCheckBox
};
