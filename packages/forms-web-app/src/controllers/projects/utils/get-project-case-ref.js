const getProjectCaseRef = (appData) => {
	const projectCaseRef = appData.CaseReference;
	if (!projectCaseRef) throw new Error('Project case ref not found');

	return projectCaseRef;
};

module.exports = { getProjectCaseRef };
