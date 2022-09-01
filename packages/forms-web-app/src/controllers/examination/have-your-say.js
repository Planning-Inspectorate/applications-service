const {
	VIEW: {
		EXAMINATION: { HAVE_YOUR_SAY_DURING_EXAMINATION, ROUTE_PREFIX }
	}
} = require('../../lib/views');
const { getAppData } = require('../../services/application.service');
const logger = require('../../lib/logger');

const responsePayload = {
	backLinkUrl: `/projects/timetable`,
	title: 'Have your say during the Examination of the application',
	startNowUrl: '#'
};

const getHaveYourSay = async (req, res) => {
	const response = await getAppData(req.params.case_ref);

	if (response && response.resp_code === 200) {
		const appData = response?.data;
		req.session.caseRef = req?.params?.case_ref;
		req.session.projectName = appData?.ProjectName;
		req.session.appData = appData;

		responsePayload.projectName = req.session.projectName;

		res.render(`${ROUTE_PREFIX + HAVE_YOUR_SAY_DURING_EXAMINATION}`, responsePayload);
	} else {
		logger.warn(`No project found with ID ${req.params.case_ref} for registration`);
		res.status(404).render('error/not-found');
	}
};

module.exports = {
	getHaveYourSay
};
