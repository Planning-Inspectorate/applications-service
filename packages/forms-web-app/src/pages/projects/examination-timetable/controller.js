const logger = require('../../../lib/logger');
const { getAppData } = require('../../../services/application.service');
const { getPageData } = require('./utils/get-page-data');
const {
	routesConfig: {
		project: {
			pages: { examinationTimetable }
		},
		examination: {
			baseDirectory,
			pages: {
				haveYourSay: { route: examinationHaveYourSayRoute }
			}
		}
	}
} = require('../../../routes/config');
const { getEvents } = require('./utils/events/get-events');

const view = 'projects/examination-timetable/index.njk';
const getExaminationTimetable = async (req, res) => {
	try {
		const { params } = req;
		const { case_ref } = params;
		const response = await getAppData(case_ref);
		const examinationTimetableData = response.data;
		const projectName = examinationTimetableData.ProjectName;
		const pageData = getPageData(case_ref, projectName);

		res.render(view, {
			pageData,
			events: await getEvents(examinationTimetableData)
		});
	} catch (error) {
		logger.error(error);
		res.status(500);
		return res.render('error/unhandled-exception');
	}
};

const postExaminationTimetable = (req, res) => {
	const { body, session } = req;

	session.examination = {};
	session.examination.examinationTimetableId = body[examinationTimetable.id];

	return res.redirect(`${baseDirectory}/${examinationHaveYourSayRoute}`);
};

module.exports = { getExaminationTimetable, postExaminationTimetable };
