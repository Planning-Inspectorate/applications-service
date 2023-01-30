const getProjectDateOfNonAcceptance = (appData) => {
	const projectDateOfNonAcceptance = appData.dateOfNonAcceptance;
	if (!projectDateOfNonAcceptance) throw new Error('Project date of non acceptance not found');

	return projectDateOfNonAcceptance;
};

module.exports = { getProjectDateOfNonAcceptance };
