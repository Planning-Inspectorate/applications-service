const moment = require('moment');
const { VIEW } = require('../../lib/views');
const { formatDate } = require('../../utils/date-utils');
const { getAppData } = require('../../services/applications.service');
const logger = require('../../lib/logger');

exports.getStart = async (req, res) => {
	delete req.session.comment;
	delete req.session.typeOfParty;

	const response = await getAppData(req.params.case_ref);
	if (response.resp_code === 200) {
		const appData = response.data;
		req.session.caseRef = req.params.case_ref;
		req.session.projectName = appData.ProjectName;
		req.session.appData = appData;
		const closeDate = req.session.appData.DateOfRelevantRepresentationClose;
		const periodOpen = moment(new Date()).add(-1, 'd').isBefore(closeDate);
		req.session.isPeriodOpen = periodOpen;
		req.session.registerJourneyStarted = true;
		res.render(VIEW.REGISTER.START, {
			projectName: req.session.projectName,
			closeDate: closeDate ? formatDate(closeDate) : '',
			periodOpen,
			baseUrl: `/projects/${req.params.case_ref}`
		});
	} else if (response.resp_code === 404) {
		logger.warn(`No project found with ID ${req.params.case_ref} for registration`);
		res.status(404).render('error/not-found');
	}
};
