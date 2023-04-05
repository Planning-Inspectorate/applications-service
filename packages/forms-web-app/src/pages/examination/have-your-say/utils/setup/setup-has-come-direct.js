const { getHasOpenTimetables } = require('../../../../../utils/timetables/get-timetables-state');

const setupHasComeDirect = async (session, caseRef) => {
	if (await getHasOpenTimetables(caseRef)) {
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
