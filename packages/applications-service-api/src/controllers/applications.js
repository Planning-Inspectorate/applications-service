const { StatusCodes } = require('http-status-codes');
const logger = require('../lib/logger');
const { getNIApplication } = require('../services/application.ni.service');
const {
	getAllApplicationsDownload: getAllApplicationsDownloadService
} = require('../services/application.backoffice.service');
const {
	getAllApplications: getAllApplicationsService
} = require('../services/application.backoffice.service');
const ApiError = require('../error/apiError');

const getApplication = async (req, res) => {
	const { caseReference } = req.params;

	logger.debug(`Retrieving application ${caseReference} ...`);

	const application = await getNIApplication(caseReference);

	if (!application) throw ApiError.applicationNotFound(caseReference);

	logger.debug(`Application ${caseReference} retrieved`);

	res.status(StatusCodes.OK).send(application);
};

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

module.exports = {
	getApplication,
	getAllApplications,
	getAllApplicationsDownload
};
