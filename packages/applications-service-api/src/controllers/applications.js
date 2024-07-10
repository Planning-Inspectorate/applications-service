const { StatusCodes } = require('http-status-codes');
const logger = require('../lib/logger');
const {
	getAllApplicationsDownload: getAllApplicationsDownloadService,
	getAllApplications: getAllApplicationsService,
	getApplication: getApplicationService
} = require('../services/application.service');
const ApiError = require('../error/apiError');
const { mapResponseBackToNILegacyFormat } = require('../utils/application.mapper');

const getAllApplications = async (req, res) => {
	const {
		applications,
		totalItems,
		currentPage,
		itemsPerPage,
		totalPages,
		filters,
		totalItemsWithoutFilters
	} = await getAllApplicationsService(req.query);

	const response = {
		applications,
		totalItems,
		currentPage,
		itemsPerPage,
		totalPages,
		totalItemsWithoutFilters,
		filters
	};

	res.status(StatusCodes.OK).send(response);
};

const getAllApplicationsDownload = async (req, res) => {
	logger.debug(`Retrieving all applications for download ...`);

	res.setHeader('Content-Type', 'text/csv');
	res.setHeader('Content-Disposition', 'attachment; filename=applications.csv');

	const response = await getAllApplicationsDownloadService();

	res.status(StatusCodes.OK).send(response);
};

const getApplication = async (req, res) => {
	const { caseReference } = req.params;

	const application = await getApplicationService(caseReference);

	if (!application) throw ApiError.applicationNotFound(caseReference);

	const applicationResponse = mapResponseBackToNILegacyFormat(application);

	res.status(StatusCodes.OK).send(applicationResponse);
};

module.exports = {
	getAllApplications,
	getAllApplicationsDownload,
	getApplication
};
