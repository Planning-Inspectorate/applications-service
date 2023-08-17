const formatProjectStagesToLowerCase = (projectStages) => {
	let result = {};
	for (const key in projectStages) {
		const element = projectStages[key];

		if (typeof element === 'string') {
			result[key] = element.toLocaleLowerCase();
		}
	}

	return result;
};

module.exports = {
	formatProjectStagesToLowerCase
};
