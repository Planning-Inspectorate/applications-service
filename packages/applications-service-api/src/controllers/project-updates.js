const {
	getProjectUpdates: getProjectUpdatesRepository
} = require('../repositories/projectUpdate.repository');

const getProjectUpdates = async (req, res) => {
	const { caseReference } = req.params;

	const projectUpdatesDB = await getProjectUpdatesRepository(caseReference);

	const projectUpdates = projectUpdatesDB.map((projectUpdate) => ({
		updateDate: projectUpdate.updateDate,
		updateName: projectUpdate.updateName,
		updateContentEnglish: projectUpdate.updateContentEnglish,
		updateContentWelsh: projectUpdate.updateContentWelsh
	}));

	res.send({
		updates: projectUpdates
	});
};

module.exports = {
	getProjectUpdates
};
