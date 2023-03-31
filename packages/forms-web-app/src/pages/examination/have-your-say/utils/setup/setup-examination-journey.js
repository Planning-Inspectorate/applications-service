const { getAppData } = require('../../../../../services/application.service');
const { setupHasComeDirect } = require('./setup-has-come-direct');
const {
	getExaminationTimetableId,
	hasExaminationSession
} = require('../../../_session/examination-session');
const { setBaseSessionData } = require('../session-helpers');
const {
	getAndAddSelectedTimetableToSession
} = require('../../../../../utils/timetables/get-selected-timetable');

const hasComeFromTheExaminationTimetablePage = (session) =>
	hasExaminationSession(session) && getExaminationTimetableId(session);

const setupExaminationJourney = async (session, caseRef) => {
	const { data: applicationData } = await getAppData(caseRef);
	setBaseSessionData(session, caseRef, applicationData);

	if (hasComeFromTheExaminationTimetablePage(session)) {
		await getAndAddSelectedTimetableToSession(
			session,
			caseRef,
			session.examination.examinationTimetableId
		);
		session.examination.showChooseDeadline = false;
	} else setupHasComeDirect(session, applicationData.dateOfNonAcceptance);
};

module.exports = {
	setupExaminationJourney
};
