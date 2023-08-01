const { getApplication } = require('../services/application.v2.service');
const {
	getProjectUpdates: getProjectUpdatesRepository
} = require('../repositories/projectUpdate.repository');
const ApiError = require('../error/apiError');

const getProjectUpdates = async (req, res) => {
	const { caseReference } = req.params;

	const application = await getApplication(caseReference);
	if (!application) throw ApiError.applicationNotFound(caseReference);

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
