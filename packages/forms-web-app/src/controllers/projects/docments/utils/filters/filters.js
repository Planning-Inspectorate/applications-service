const { documentProjectStages } = require('../../../../../utils/project-stages');
const { developersApplication } = require('../config');
const { modifyDocumentTypeFilters } = require('./document-type/modifier');
const { modifyStageFilters } = require('./project-stage/modifier');
const { modifyCategoryFilters } = require('./category/modifier');
const handleFilters = (response, stageList = [], typeList = [], category = []) => {
	const categoryList = category === developersApplication ? 'Application Document' : category;
	const respData = response.data;
	const {
		filters: { stageFilters, typeFilters, categoryFilters }
	} = respData;

	const modifiedCategoryFilters = modifyCategoryFilters(categoryFilters, categoryList);
	const modifiedStageFilters = modifyStageFilters(documentProjectStages, stageFilters, stageList);
	const modifiedTypeFilters = modifyDocumentTypeFilters(typeFilters, typeList);

	return {
		modifiedStageFilters,
		modifiedTypeFilters,
		modifiedCategoryFilters
	};
};

module.exports = {
	handleFilters
};
