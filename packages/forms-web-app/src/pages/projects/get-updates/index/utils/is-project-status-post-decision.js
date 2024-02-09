const isProjectStatusPostDecision = (projectStatusNumber) => {
	return projectStatusNumber >= 7;
};

module.exports = { isProjectStatusPostDecision };
