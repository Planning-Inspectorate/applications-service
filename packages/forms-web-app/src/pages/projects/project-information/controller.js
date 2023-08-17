const logger = require('../../../lib/logger');
const { getPageData } = require('./utils/get-page-data');
const {
	getProjectDecisionDocument,
	getRule6DocumentType,
	getProjectUpdatesData
} = require('../../services');
const { projectInfoProjectStages } = require('../../../utils/project-stages');
const { getApplicationDecision } = require('./utils/get-application-decision');
const { documentTypes, documentTypeDictionary } = require('@pins/common/src/constants');
const { getPreExaminationSubStage } = require('./utils/pre-examination-sub-stages');
const { formatProjectStagesToLowerCase } = require('./utils/formatters');

const view = 'projects/project-information/view.njk';

const getMiscDataByStageName = async (stageName, caseRef) => {
	stageName = stageName.toLocaleLowerCase();
	const formattedProjectStages = formatProjectStagesToLowerCase(projectInfoProjectStages);
	let result = null;

	//post decision
	if (stageName === formattedProjectStages[7]) {
		const projectDecisionDocument = await getProjectDecisionDocument(caseRef);
		result = getApplicationDecision(projectDecisionDocument, documentTypes, documentTypeDictionary);
	}

	return result;
};

const getProjectInformation = async (req, res, next) => {
	try {
		const {
			locals: { applicationData }
		} = res;
		const { caseRef } = applicationData;
		const projectUpdates = await getProjectUpdatesData(caseRef);
		const rule6Document = await getRule6DocumentType(caseRef);
		const preExamSubStages = getPreExaminationSubStage(
			applicationData.DateOfRepresentationPeriodOpen,
			applicationData.DateOfRelevantRepresentationClose,
			applicationData.DateRRepAppearOnWebsite,
			rule6Document
		);
		const applicationDecision = await getMiscDataByStageName(applicationData.status.text, caseRef);

		return res.render(view, {
			...getPageData(applicationData, projectUpdates),
			preExamSubStages,
			rule6Document,
			applicationDecision
		});
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

module.exports = {
	getProjectInformation
};
