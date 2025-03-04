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
const { isBackOfficeCaseReference } = require('./_utils/is-backoffice-case-reference');

const view = 'projects/index/view.njk';

const getMiscDataByStageName = async (stageName, caseRef) => {
	stageName = stageName.toLowerCase();
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
		const { i18n } = req;
		const {
			locals: { applicationData }
		} = res;
		const { caseRef } = applicationData;

		const [projectUpdates, rule6Document, rule8Document, applicationDecision, mapAccessToken] =
			await Promise.all([
				getProjectUpdatesData(caseRef),
				getRule6DocumentType(caseRef),
				getRule8DocumentType(caseRef),
				getMiscDataByStageName(applicationData.status.text, caseRef),
				applicationData.longLat ? getMapAccessToken() : Promise.resolve(null)
			]);

		const preExamSubStages = getPreExaminationSubStage(applicationData, rule6Document);
		const recommendationCompletedDate = getExaminationOrDecisionCompletedDate(
			applicationData.dateTimeExaminationEnds,
			applicationData.stage5ExtensionToRecommendationDeadline
		);
		const decisionCompletedDate = getExaminationOrDecisionCompletedDate(
			applicationData.dateOfRecommendations,
			applicationData.stage5ExtensionToDecisionDeadline
		);
		const backOfficeCase = isBackOfficeCaseReference(caseRef);

		return res.render(view, {
			...getPageData(i18n, applicationData, projectUpdates),
			preExamSubStages,
			applicationDecision,
			rule6Document,
			rule8Document,
			recommendationCompletedDate,
			decisionCompletedDate,
			mapAccessToken,
			backOfficeCase
		});
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

module.exports = {
	getProjectsIndexController
};
