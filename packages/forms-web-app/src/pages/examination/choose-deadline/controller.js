const logger = require('../../../lib/logger');
const { getTimetables } = require('../../../lib/application-api-wrapper');
const { getExaminationSession } = require('../_session/examination-session');
const { getPageData } = require('./_utils/get-page-data');
const { getSelectedTimetableFromId } = require('../../../utils/timetables/get-selected-timetable');
const {
	addSelectedTimetableToSession
} = require('../../../utils/timetables/add-selected-timetable-to-session');
const { chooseDeadlineId } = require('./config');
const view = 'examination/choose-deadline/view.njk';
const timetableSessionKey = 'timetables';

const getChooseDeadline = async (req, res, next) => {
	try {
		const { session } = req;
		const { caseRef } = session;
		const {
			data: { timetables }
		} = await getTimetables(caseRef);
		getExaminationSession(session)[timetableSessionKey] = timetables;
		return res.render(view, getPageData(session));
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

const postChooseDeadline = (req, res, next) => {
	try {
		const { body, session } = req;
		const { errors = {}, errorSummary = [] } = body;

		if (errors[chooseDeadlineId] || Object.keys(errors).length > 0) {
			return res.render(view, {
				...getPageData(session),
				errors,
				errorSummary
			});
		}

		const { selectedTimetable, selectedTimetableItems } = getSelectedTimetableFromId(
			getExaminationSession(session)[timetableSessionKey],
			body[chooseDeadlineId]
		);

		addSelectedTimetableToSession(session, selectedTimetableItems, selectedTimetable);
		getExaminationSession(session)[timetableSessionKey] = null;

		return res.redirect('select-deadline-item');
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

module.exports = { getChooseDeadline, postChooseDeadline };
