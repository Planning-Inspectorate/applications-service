const { documentProjectStages } = require('../../../../utils/project-stages');
const { removeFilterTypes } = require('../../../../utils/remove-filter-types');
const { developersApplication } = require('./config');
const handleFilters = (response, stageList = [], typeList = [], category = []) => {
	const categoryList = category === developersApplication ? 'Application Document' : category;
	const respData = response.data;
	const { filters } = respData;
	const { stageFilters, typeFilters, categoryFilters } = filters;

	const modifiedTypeFilters = [];

	const numberOfFiltersToDisplay = 5;

	const modifiedCategoryFilters = categoryFilters.map(({ name: categoryName = '', count = 0 }) => ({
		text: `${categoryName} (${count})`,
		value: categoryName,
		checked: categoryList.includes(categoryName)
	}));

	const getProjectStageCount = (projectStageValue) => {
		const projectStageItem = stageFilters.find((stageFilter) => {
			return `${stageFilter.name}` === `${projectStageValue}`;
		});

		return projectStageItem?.count || 0;
	};

	const modifiedStageFilters = Object.values(documentProjectStages).map(({ name = '', value }) => {
		const projectStageCount = getProjectStageCount(value);

		return {
			checked: stageList.includes(value),
			text: `${name} (${projectStageCount ?? 0})`,
			value: value ?? 0
		};
	});

	let otherTypeFiltersCount = 0;

	const { result: newTypeFilters, otherTypeFiltersCount: removedTypesCount } = removeFilterTypes(
		typeFilters,
		'other'
	);

	otherTypeFiltersCount += removedTypesCount;

	newTypeFilters
		.slice(-(newTypeFilters.length - numberOfFiltersToDisplay))
		.forEach(function (type) {
			otherTypeFiltersCount += type.count;
		}, Object.create(null));

	newTypeFilters
		.slice(0, numberOfFiltersToDisplay)
		.sort(function (a, b) {
			if (a.name < b.name) {
				return -1;
			}
			return 0;
		})
		.forEach(function (type) {
			modifiedTypeFilters.push({
				text: `${type.name} (${type.count})`,
				value: type.name,
				checked: typeList.includes(type.name)
			});
		}, Object.create(null));

	if (newTypeFilters.length > 4) {
		modifiedTypeFilters.push({
			text: `Everything else (${otherTypeFiltersCount})`,
			value: 'everything_else',
			checked: typeList.includes('everything_else')
		});
	}

	return {
		modifiedStageFilters,
		modifiedTypeFilters,
		modifiedCategoryFilters
	};
};

module.exports = {
	handleFilters
};
