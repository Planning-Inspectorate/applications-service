const logger = require('../../../lib/logger');
const { getPageData } = require('./utils/get-page-data');
const { getProjectUpdatesData, getRule6DocumentType } = require('../../services');
const { getPreExaminationSubStage } = require('./utils/pre-examination-sub-stages');

const view = 'projects/project-information/view.njk';

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

		return res.render(view, {
			...getPageData(applicationData, projectUpdates),
			preExamSubStages,
			rule6Document
		});
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

module.exports = {
	getProjectInformation
};
