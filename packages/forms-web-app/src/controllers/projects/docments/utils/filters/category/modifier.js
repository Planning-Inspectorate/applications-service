const { checkBoxMapper } = require('../utils/ui-mappers');
const modifyCategoryFilters = (categoryFilters, categoryList) =>
	categoryFilters.map(({ name: categoryName = '', count = 0 }) =>
		checkBoxMapper(`${categoryName} (${count})`, categoryName, categoryList.includes(categoryName))
	);

module.exports = {
	modifyCategoryFilters
};
