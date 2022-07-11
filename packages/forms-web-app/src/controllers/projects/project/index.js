const moment = require('moment');
const { formatDate } = require('../../../utils/date-utils');
const { getAppData } = require('../../../services/application.service');
const { status } = require('../../../utils/status');
const { VIEW } = require('../../../lib/views');

const getProject = async (req, res) => {
	try {
		const caseRef = req.params.case_ref;

		const response = await getAppData(caseRef);

		if (response.resp_code === 200) {
			const appData = response.data;
			const closureDate = appData.DateOfRelevantRepresentationClose;
			const dateOfClosure = closureDate ? formatDate(closureDate) : null;
			const periodOpen = moment(new Date()).add(-1, 'd').isBefore(closureDate);
			const projectName = appData.ProjectName;
			const stage = status[appData.Stage];

			req.session.appData = appData;
			req.session.caseRef = caseRef;
			req.session.isPeriodOpen = periodOpen;
			req.session.projectName = projectName;

			res.render(VIEW.PROJECTS.PROJECT.INDEX, {
				appData,
				caseRef,
				dateOfClosure,
				periodOpen,
				projectName,
				stage
			});
		} else {
			res.status(404).render(VIEW.ERROR[404]);
		}
	} catch (error) {
		res.status(500).render(VIEW.ERROR[500]);
	}
};

module.exports = {
	getProject
};
