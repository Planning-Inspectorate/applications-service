const timetablesSessionID = 'timetables';

const getTimetablesSession = (session, caseRef) => session[timetablesSessionID]?.[caseRef];

const setTimetablesSession = (session, caseRef, hasTimetables) => {
	if (!session[timetablesSessionID]) session[timetablesSessionID] = {};

	session[timetablesSessionID][caseRef] = hasTimetables;
};

module.exports = { getTimetablesSession, setTimetablesSession };
