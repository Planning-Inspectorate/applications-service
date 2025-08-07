const logger = require('../../../lib/logger');
const { getProjectData } = require('../../../lib/application-api-wrapper');
const { getPageData } = require('./_utils/get-page-data');
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
const { getEvents } = require('./_utils/events/get-events');

const view = 'projects/examination-timetable/view.njk';

const getProjectsExaminationTimetableController = async (req, res) => {
	try {
		const { params, i18n } = req;
		const { case_ref } = params;
		const { data } = await getProjectData(case_ref);
		const examinationTimetableData = data;
		const {
			locals: {
				applicationData: { projectName }
			}
		} = res;
		const pageData = getPageData(case_ref, projectName, examinationTimetableData, i18n);

		return res.render(view, {
			...pageData,
			events: await getEvents(examinationTimetableData, i18n)
		});
	} catch (error) {
		logger.error(error);
		res.status(500);
		return res.render('error/unhandled-exception');
	}
};

const postProjectsExaminationTimetableController = (req, res, next) => {
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

module.exports = {
	getProjectsExaminationTimetableController,
	postProjectsExaminationTimetableController
};
