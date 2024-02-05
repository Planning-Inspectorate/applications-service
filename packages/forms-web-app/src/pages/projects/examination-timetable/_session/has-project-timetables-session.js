const projectTimetablesSessionID = 'hasTimetables';

const getHasProjectTimetablesSession = (session, caseRef) =>
	session[projectTimetablesSessionID]?.[caseRef];

const setHasProjectTimetablesSession = (session, caseRef, hasProjectTimetables) => {
	if (!session[projectTimetablesSessionID]) session[projectTimetablesSessionID] = {};

	session[projectTimetablesSessionID][caseRef] = hasProjectTimetables;
};

module.exports = { getHasProjectTimetablesSession, setHasProjectTimetablesSession };
