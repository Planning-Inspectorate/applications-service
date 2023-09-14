const { startCase, toLower, snakeCase } = require('lodash');

const NI_MAPPING = {
	sector: [
		{ ni: 'BC', api: 'business_and_commercial', label: 'Business and Commercial' },
		{ ni: 'EN', api: 'energy', label: 'Energy' },
		{ ni: 'TR', api: 'transport', label: 'Transport' },
		{ ni: 'WA', api: 'water', label: 'Water' },
		{ ni: 'WS', api: 'waste', label: 'Waste' },
		{ ni: 'WW', api: 'waste_water', label: 'Waste Water' }
	],
	stage: [
		{ ni: 0, api: 'draft', label: 'Draft' },
		{ ni: 1, api: 'pre_application', label: 'Pre-application' },
		{ ni: 2, api: 'acceptance', label: 'Acceptance' },
		{ ni: 3, api: 'pre_examination', label: 'Pre-examination' },
		{ ni: 4, api: 'examination', label: 'Examination' },
		{ ni: 5, api: 'recommendation', label: 'Recommendation' },
		{ ni: 6, api: 'decision', label: 'Decision' },
		{ ni: 7, api: 'post_decision', label: 'Post-decision' },
		{ ni: 8, api: 'withdrawn', label: 'Withdrawn' }
	]
};

const mapFilterLabelToApi = (name, value) => {
	switch (name) {
		case 'stage':
			return NI_MAPPING[name].find((field) => field.ni === Number(value))?.label;
		case 'sector':
			return NI_MAPPING[name].find((field) => field.ni === value)?.label;
		case 'region':
			return value;
	}
};

const mapFilterValueToApi = (name, value) => {
	switch (name) {
		case 'stage':
			return NI_MAPPING[name].find((field) => field.ni === Number(value))?.api;
		case 'sector':
			return NI_MAPPING[name].find((field) => field.ni === value)?.api;
		case 'region':
			return snakeCase(value);
	}
};

const mapFilterValueToNI = (name, value) => {
	switch (name) {
		case 'stage':
		case 'sector':
			return NI_MAPPING[name].find((field) => field.api === value)?.ni;
		default:
			// from snake case to title case: south_west -> South West
			return startCase(toLower(value));
	}
};

/**
 * Build Applications API filters from list of Applications from NI database
 * @param {{ Stage: number, Region: string, Proposal: string }[]} applications
 * @returns {{name: string, value: string, label: string, count: number}[]}
 */
const buildApiFiltersFromNIApplications = (applications = []) => {
	const mappedFilters = applications.reduce(
		(memo, application) => {
			const stageValue = application.Stage;
			const regionValue = application.Region;
			const sectorValue = application.Proposal?.substring(0, 2);

			if (stageValue) memo['stage'][stageValue] = memo['stage'][stageValue] + 1 || 1;
			if (regionValue) memo['region'][regionValue] = memo['region'][regionValue] + 1 || 1;
			if (sectorValue) memo['sector'][sectorValue] = memo['sector'][sectorValue] + 1 || 1;

			return memo;
		},
		{
			stage: {},
			region: {},
			sector: {}
		}
	);

	const filters = [];
	console.log({ mappedFilters }})
	if (mappedFilters) {
		for (const [field, filterValues] of Object.entries(mappedFilters)) {
			for (const [value, count] of Object.entries(filterValues)) {
				const filter = {
					name: field,
					value: mapFilterValueToApi(field, value),
					label: mapFilterLabelToApi(field, value),
					count: count
				};
				filters.push(filter);
			}
		}
	}

	return filters;
};

/**
 * Map API filters back to values for querying against NI database
 * @param {{ stage?: string[], region?: string[], sector?: string[] }} query
 * @returns {{ stage?: string[], region?: string[], sector?: string[] }}
 */
const mapApplicationFiltersToNI = (query) => {
	return ['stage', 'region', 'sector'].reduce((memo, field) => {
		const filterValues = query[field];
		if (filterValues && filterValues.length > 0) {
			memo[field] = filterValues.map((value) => mapFilterValueToNI(field, value));
		}
		return memo;
	}, {});
};

module.exports = {
	buildApiFiltersFromNIApplications,
	mapApplicationFiltersToNI
};
