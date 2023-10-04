const {
	getProjectUpdates: getProjectUpdatesRepository,
	deleteProjectUpdate: deleteProjectUpdateRepository
} = require('../repositories/projectUpdate.repository');
const ApiError = require('../error/apiError');

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

const deleteProjectUpdate = async (req, res) => {
	const { projectUpdateId } = req.params;

	try {
		await deleteProjectUpdateRepository(projectUpdateId);
	} catch (error) {
		if (error.name === 'PrismaClientKnownRequestError' && error.code === 'P2025') {
			throw ApiError.notFound(`Project Update with projectUpdateId '${projectUpdateId}' not found`);
		}
		throw error;
	}

	res.status(204).send();
};

module.exports = {
	getProjectUpdates,
	deleteProjectUpdate
};
