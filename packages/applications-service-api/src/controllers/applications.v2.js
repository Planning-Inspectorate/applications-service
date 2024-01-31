const { getApplication: getApplicationFromService } = require('../services/application.service');
const { StatusCodes } = require('http-status-codes');
const ApiError = require('../error/apiError');
const { mapResponseBackToNILegacyFormat } = require('../utils/application.mapper');

const getApplication = async (req, res) => {
	const { caseReference } = req.params;

	const application = await getApplicationFromService(caseReference);

	if (!application) throw ApiError.applicationNotFound(caseReference);

	const applicationResponse = mapResponseBackToNILegacyFormat(application);

	res.status(StatusCodes.OK).send(applicationResponse);
};

module.exports = {
	getApplication
};
