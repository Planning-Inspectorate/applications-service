const { getDatesFilterFormGroupId } = require('../../../dates/getters');
const {
	datesFilterFormGroupsConfig,
	datesFilterFormGroupInputsConfig
} = require('../../../dates/config');

const buildDatesFilterObj = (i18n) => {
	const buildDatesFilterFormGroupInputs = () => {
		return Object.keys(datesFilterFormGroupInputsConfig).map((datesFilterFormGroupInputKey) => {
			const formGroupInputs = datesFilterFormGroupInputsConfig[datesFilterFormGroupInputKey];
			return {
				...formGroupInputs,
				label: i18n.t(`common.${formGroupInputs.name}`)
			};
		});
	};

	const buildDatesFilterFormGroups = () => {
		return Object.keys(datesFilterFormGroupsConfig).map((datesFilterFormGroupKey) => {
			const datesFilterFormGroup = datesFilterFormGroupsConfig[datesFilterFormGroupKey];
			return {
				...datesFilterFormGroup,
				id: getDatesFilterFormGroupId(datesFilterFormGroup.name),
				inputs: buildDatesFilterFormGroupInputs(),
				inputNamePrefix: datesFilterFormGroup.name,
				title: i18n.t(`common.${datesFilterFormGroup.title}`),
				errorMessageTitle: i18n.t(`projectsDocuments.errors.title.${datesFilterFormGroup.title}`)
			};
		});
	};

	const datesFilterObj = {
		errorSummaryList: [],
		title: i18n.t('common.datePublished'),
		formGroups: buildDatesFilterFormGroups()
	};

	return datesFilterObj;
};

module.exports = { buildDatesFilterObj };
