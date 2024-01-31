const { getTimetables } = require('../../../../../lib/application-api-wrapper');
const {
	getOpenEventDeadlineTimetables
} = require('../../../../../utils/timetables/get-timetables-state');

const setupHasComeDirect = async (session, caseRef) => {
	const { data } = await getTimetables(caseRef);

	const timetables = data?.timetables || [];

	const hasOpenTimetables = getOpenEventDeadlineTimetables(timetables).length > 0;

	if (hasOpenTimetables) {
		session.examination = {
			showChooseDeadline: true
		};
	} else {
		throw new Error('NO_OPEN_DEADLINES');
	}
};

module.exports = {
	setupHasComeDirect
};
