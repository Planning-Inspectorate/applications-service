const { getAppData } = require('../../../../services/applications.service');
const logger = require('../../../../lib/logger');
const { isRegistrationOpen } = require('./_utils/is-registration-open');
const { getPageData } = require('./_utils/get-page-data');
const {
	featureFlag: { openRegistrationCaseReferences }
} = require('../../../../config');

const view = 'projects/register/index/view.njk';

const getRegisterIndexController = async (req, res) => {
	const { params } = req;
	const { case_ref } = params;

	delete req.session.comment;
	delete req.session.typeOfParty;

	const response = await getAppData(case_ref);

	if (response.resp_code === 200) {
		const appData = response.data;

		const periodOpen = isRegistrationOpen(
			appData.DateOfRepresentationPeriodOpen,
			appData.DateOfRelevantRepresentationClose,
			case_ref
		);

		if (!periodOpen && !openRegistrationCaseReferences.join()) {
			logger.warn(`Case ref list is empty`);
			return res.status(404).render('error/not-found');
		}

		req.session.caseRef = case_ref;
		req.session.appData = appData;
		req.session.projectName = appData.ProjectName;
		req.session.registerJourneyStarted = periodOpen;

		return res.render(view, getPageData(appData, periodOpen, case_ref));
	} else if (response.resp_code === 404) {
		logger.warn(`No project found with ID ${case_ref} for registration`);
		return res.status(404).render('error/not-found');
	}
};

module.exports = { getRegisterIndexController };
