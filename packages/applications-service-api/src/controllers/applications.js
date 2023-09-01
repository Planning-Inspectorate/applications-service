const { StatusCodes } = require('http-status-codes');
const logger = require('../lib/logger');
const {
	getApplication: getApplicationFromApplicationApiService,
	getAllApplications: getAllApplicationsFromApplicationApiService,
	getAllApplicationsDownloadInBatches: getAllApplicationsDownloadInBatchesApiService
} = require('../services/application.service');
const ApiError = require('../error/apiError');
const TransformToCSV = require('../utils/stream-applications-to-csv');
const { Readable } = require('stream');

const getApplication = async (req, res) => {
	const { caseReference } = req.params;

	logger.debug(`Retrieving application ${caseReference} ...`);

	const application = await getApplicationFromApplicationApiService(caseReference);

	if (!application) throw ApiError.applicationNotFound(caseReference);

	logger.debug(`Application ${caseReference} retrieved`);

	res.status(StatusCodes.OK).send(application);
};

const getAllApplications = async (req, res) => {
	logger.debug(`Retrieving all applications ...`);

	const { applications, totalItems, currentPage, itemsPerPage, totalPages } =
		await getAllApplicationsFromApplicationApiService(req.query);

	if (!totalItems) throw ApiError.noApplicationsFound();

	const response = {
		applications,
		totalItems,
		currentPage,
		itemsPerPage,
		totalPages
	};

	res.status(StatusCodes.OK).send(response);
};

const getAllApplicationsDownload = async (req, res) => {
	logger.debug(`Retrieving all applications for download ...`);

	const readableStream = new Readable({ objectMode: true });
	readableStream._read = () => {};
	const transformToCSV = new TransformToCSV({ objectMode: true });

	getAllApplicationsDownloadInBatchesApiService(readableStream);

	res.setHeader('Content-Type', 'text/csv');
	res.setHeader('Content-Disposition', 'attachment; filename=applications.csv');

	readableStream.pipe(transformToCSV).pipe(res);
};

module.exports = {
	getApplication,
	getAllApplications,
	getAllApplicationsDownload
};
