const getProjectName = (appData) => {
	const projectName = appData.ProjectName;
	if (!projectName) throw new Error('Project name not found');

	return projectName;
};

module.exports = { getProjectName };
