const getProjectStageCount = (projectStageValue, stageFilters) => {
	const projectStageItem = stageFilters.find((stageFilter) => {
		return `${stageFilter.name}` === `${projectStageValue}`;
	});

	return projectStageItem?.count || 0;
};

module.exports = {
	getProjectStageCount
};
