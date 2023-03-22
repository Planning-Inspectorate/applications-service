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
		const { data } = await getAppData(case_ref);
		const examinationTimetableData = data;
		const projectName = examinationTimetableData.ProjectName;
		const pageData = getPageData(case_ref, projectName, examinationTimetableData);

		return res.render(view, {
			...pageData,
			events: await getEvents(examinationTimetableData)
		});
	} catch (error) {
		logger.error(error);
		res.status(500);
		return res.render('error/unhandled-exception');
	}
};

const postExaminationTimetable = (req, res, next) => {
	try {
		const { body, session } = req;

		if (!body[examinationTimetable.id]) throw new Error('NO_EXAM_TIMETABLE_ID');

		session.examination = {};
		session.examination.examinationTimetableId = body[examinationTimetable.id];

		return res.redirect(`${baseDirectory}/${examinationHaveYourSayRoute}`);
	} catch (e) {
		logger.error(e);
		next(e);
	}
};

module.exports = { getExaminationTimetable, postExaminationTimetable };
