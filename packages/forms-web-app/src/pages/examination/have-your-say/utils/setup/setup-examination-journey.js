const { getProjectData } = require('../../../../../lib/application-api-wrapper');
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
	const { data: applicationData } = await getProjectData(caseRef);
	setBaseSessionData(session, caseRef, applicationData);

	const examinationTimetableId = session.examination?.examinationTimetableId;
	session.examination = {
		examinationTimetableId
	};

	if (hasComeFromTheExaminationTimetablePage(session)) {
		await getAndAddSelectedTimetableToSession(
			session,
			caseRef,
			session.examination.examinationTimetableId
		);
		session.examination.showChooseDeadline = false;
	} else await setupHasComeDirect(session, caseRef);
};

module.exports = {
	setupExaminationJourney
};
