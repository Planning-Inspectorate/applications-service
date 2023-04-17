const { getApplication: getApplicationService } = require('../services/application.v2.service');
const { StatusCodes } = require('http-status-codes');
const ApiError = require('../error/apiError');

const getApplication = async (req, res) => {
	const { caseReference } = req.params;

	const application = await getApplicationService(caseReference);

	if (!application) throw ApiError.applicationNotFound(caseReference);

	const applicationResponse = mapResponse(application);

	res.status(StatusCodes.OK).send(applicationResponse);
};

const mapResponse = (application) => ({
	...application,
	regions: application.regions ? application.regions.split(',') : []
});

module.exports = {
	getApplication
};
