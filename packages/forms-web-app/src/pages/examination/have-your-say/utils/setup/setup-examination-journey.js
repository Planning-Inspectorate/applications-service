const { setBaseSessionData } = require('../session-helpers');
const { getAppData } = require('../../../../../services/application.service');
const { setupFromExamTimetable } = require('./setup-from-exam-timetable');
const { setupHasComeDirect } = require('./setup-has-come-direct');
const {
	getExaminationTimetableId,
	hasExaminationSession
} = require('../../../_session/examination-session');

const hasComeFromTheExaminationTimetablePage = (session) =>
	hasExaminationSession(session) && getExaminationTimetableId(session);

const setupExaminationJourney = async (session, caseRef) => {
	const { data: applicationData } = await getAppData(caseRef);
	setBaseSessionData(session, caseRef, applicationData);

	hasComeFromTheExaminationTimetablePage(session)
		? await setupFromExamTimetable(session, caseRef)
		: setupHasComeDirect(session, applicationData.dateOfNonAcceptance);
};

module.exports = {
	setupExaminationJourney
};
