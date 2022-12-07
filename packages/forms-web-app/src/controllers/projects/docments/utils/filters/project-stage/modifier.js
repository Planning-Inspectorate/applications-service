const { getProjectStageCount } = require('./helpers');
const { checkBoxMapper } = require('../utils/ui-mappers');
const modifyStageFilters = (documentProjectStages, stageFilters, stageList) => {
	const projectStageDocumentFilterList = [...Object.values(documentProjectStages)];

	return projectStageDocumentFilterList.map(({ name = '', value }) => {
		return checkBoxMapper(
			`${name} (${getProjectStageCount(value, stageFilters)})`,
			value ?? 0,
			stageList.includes(value)
		);
	});
};

module.exports = {
	modifyStageFilters
};
