const logger = require('../../../lib/logger');
const { getPageData } = require('./_utils/get-page-data');
const {
	getProjectDecisionDocument,
	getRule6DocumentType,
	getRule8DocumentType,
	getProjectUpdatesData
} = require('../../services');
const { projectInfoProjectStages } = require('../../../utils/project-stages');
const { getApplicationDecision } = require('./_utils/get-application-decision');
const { documentTypes, documentTypeDictionary } = require('@pins/common/src/constants');
const { getPreExaminationSubStage } = require('./_utils/pre-examination-sub-stages');
const { formatProjectStagesToLowerCase } = require('./_utils/formatters');
const {
	getExaminationOrDecisionCompletedDate
} = require('./_utils/examination-or-decision-completed-date');
const { getMapAccessToken } = require('../../_services');

const view = 'projects/index/view.njk';

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

const getProjectsIndexController = async (req, res, next) => {
	try {
		const {
			locals: { applicationData }
		} = res;
		const { caseRef } = applicationData;

		const projectUpdates = await getProjectUpdatesData(caseRef);
		const rule6Document = await getRule6DocumentType(caseRef);
		const rule8Document = await getRule8DocumentType(caseRef);

		const preExamSubStages = getPreExaminationSubStage(
			applicationData.DateOfRepresentationPeriodOpen,
			applicationData.DateOfRelevantRepresentationClose,
			applicationData.DateRRepAppearOnWebsite,
			rule6Document
		);
		const recommendationCompletedDate = getExaminationOrDecisionCompletedDate(
			applicationData.dateTimeExaminationEnds,
			applicationData.stage5ExtensionToRecommendationDeadline
		);
		const decisionCompletedDate = getExaminationOrDecisionCompletedDate(
			applicationData.dateOfRecommendations,
			applicationData.stage5ExtensionToDecisionDeadline
		);
		const applicationDecision = await getMiscDataByStageName(applicationData.status.text, caseRef);

		const mapAccessToken = applicationData.longLat ? await getMapAccessToken() : null;

		return res.render(view, {
			...getPageData(applicationData, projectUpdates),
			preExamSubStages,
			applicationDecision,
			rule6Document,
			rule8Document,
			recommendationCompletedDate,
			decisionCompletedDate,
			mapAccessToken
		});
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

module.exports = {
	getProjectsIndexController
};
