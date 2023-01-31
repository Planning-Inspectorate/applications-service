const moment = require('moment');
const { Status } = require('../../utils/status');
const { VIEW } = require('../../lib/views');
const { getAppData } = require('../../services/application.service');
const { formatDate } = require('../../utils/date-utils');
const config = require('../../config');
const logger = require('../../lib/logger');

exports.getExamination = async (req, res) => {
	const caseRef = req.params.case_ref;

	const { data, resp_code } = await getAppData(caseRef);
	if (resp_code !== 200) {
		logger.error(
			`Project page get - getAppData returned unexpected response code: ${resp_code} for case ref param: ${caseRef}`
		);
		return res.render('error/not-found');
	}

	const appData = data;
	const closureDate = appData.DateOfRelevantRepresentationClose;
	const dateOfClosure = closureDate ? formatDate(closureDate) : null;
	const periodOpen = moment(new Date()).add(-1, 'd').isBefore(closureDate);
	const projectName = appData.ProjectName;
	const stage = Status[appData.Stage];
	const stagePosition = appData.Stage;
	const stageTotal = Object.keys(Status).length;
	const projectAcceptsComments = !periodOpen && appData.Stage < 5;

	req.session.appData = appData;
	req.session.caseRef = caseRef;
	req.session.isPeriodOpen = periodOpen;
	req.session.projectName = projectName;

	res.render(VIEW.PROJECTS.PROJECT, {
		appData,
		caseRef,
		dateOfClosure,
		projectAcceptsComments,
		projectName,
		periodOpen,
		stage,
		stagePosition,
		stageTotal,
		config
	});
};
