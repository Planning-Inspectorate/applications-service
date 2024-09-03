const { getProjectData } = require('../../../../lib/application-api-wrapper');
const logger = require('../../../../lib/logger');
const {
	isRegistrationOpen,
	isRegistrationReOpened,
	isRegistrationClosed
} = require('./_utils/is-registration-open');
const { getPageData } = require('./_utils/get-page-data');

const view = 'projects/register/index/view.njk';

const getRegisterIndexController = async (req, res) => {
	const { params, i18n } = req;
	const { case_ref } = params;
	const {
		locals: { applicationData }
	} = res;
	const {
		DateOfRepresentationPeriodOpen,
		DateOfRelevantRepresentationClose,
		DateOfReOpenRelevantRepresentationStart,
		DateOfReOpenRelevantRepresentationClose
	} = applicationData;

	const registrationDates = {
		DateOfRepresentationPeriodOpen,
		DateOfRelevantRepresentationClose,
		DateOfReOpenRelevantRepresentationStart,
		DateOfReOpenRelevantRepresentationClose
	};

	delete req.session.comment;
	delete req.session.typeOfParty;

	const response = await getProjectData(case_ref);

	if (response.resp_code === 200) {
		const appData = response.data;

		const registrationOpen = isRegistrationOpen(registrationDates);
		const registrationReOpened = isRegistrationReOpened(case_ref, registrationDates);
		const registrationClosed = isRegistrationClosed(registrationDates);

		if (!registrationOpen && !registrationReOpened && !registrationClosed)
			return res.status(404).render('error/not-found');

		req.session.caseRef = case_ref;
		req.session.appData = appData;
		req.session.projectName = appData.ProjectName;
		req.session.registerJourneyStarted = registrationOpen || registrationReOpened;

		return res.render(
			view,
			getPageData(case_ref, appData, registrationOpen, registrationReOpened, i18n)
		);
	} else {
		logger.warn(`No project found with ID ${case_ref} for registration`);
		return res.status(404).render('error/not-found');
	}
};

module.exports = { getRegisterIndexController };
