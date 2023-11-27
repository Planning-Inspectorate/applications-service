const { datesFilterFormGroupInputsConfig } = require('../../../dates/config');
const { getDatesFilterInputName } = require('../../../dates/getters');

const buildQueryString = (localQuery) => {
	const params = new URLSearchParams();

	for (const [key, value] of Object.entries(localQuery)) {
		if (Array.isArray(value)) {
			value.forEach((item) => {
				params.append(key, item);
			});
		} else params.append(key, value);
	}

	return `?${params.toString()}`;
};

const getParamsWithoutActiveDatesFilter = (query, inputNamePrefix) => {
	const localQuery = JSON.parse(JSON.stringify(query));

	Object.keys(datesFilterFormGroupInputsConfig).forEach((dateFilterFormGroupInputsConfigKey) => {
		delete localQuery[
			getDatesFilterInputName(
				inputNamePrefix,
				datesFilterFormGroupInputsConfig[dateFilterFormGroupInputsConfigKey].name
			)
		];
	});

	delete localQuery.page;

	return buildQueryString(localQuery);
};

module.exports = { getParamsWithoutActiveDatesFilter };
