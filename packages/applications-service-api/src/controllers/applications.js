const { StatusCodes } = require('http-status-codes');
const logger = require('../lib/logger');
const { mapApplicationsToCSV } = require('../utils/map-to-csv');
const {
	getApplication: getApplicationFromApplicationApiService,
	getAllApplications: getAllApplicationsFromApplicationApiService,
	getAllApplicationsDownload: getAllApplicationsDownloadFromApplicationApiService
} = require('../services/application.service');
const ApiError = require('../error/apiError');

const getApplication = async (req, res) => {
	const { caseReference } = req.params;

	logger.debug(`Retrieving application ${caseReference} ...`);

	const application = await getApplicationFromApplicationApiService(caseReference);

	if (!application) throw ApiError.applicationNotFound(caseReference);

	const applicationResponse = addMapZoomLvlAndLongLat(application.dataValues);

	logger.debug(`Application ${caseReference} retrieved`);

	res.status(StatusCodes.OK).send(applicationResponse);
};

const getAllApplications = async (req, res) => {
	logger.debug(`Retrieving all applications ...`);

	const { applications, totalItems, currentPage, itemsPerPage, totalPages } =
		await getAllApplicationsFromApplicationApiService(req.query);

	if (!totalItems) throw ApiError.noApplicationsFound();

	const response = {
		applications: applications.map((document) => addMapZoomLvlAndLongLat(document.dataValues)),
		totalItems,
		currentPage,
		itemsPerPage,
		totalPages
	};

	res.status(StatusCodes.OK).send(response);
};

const getAllApplicationsDownload = async (req, res) => {
	logger.debug(`Retrieving all applications for download ...`);

	const applications = await getAllApplicationsDownloadFromApplicationApiService(req.query);

	if (!applications) throw ApiError.noApplicationsFound();

	const mappedApplications = applications.map((document) =>
		addMapZoomLvlAndLongLat(document.dataValues)
	);

	const response = mapApplicationsToCSV(mappedApplications);

	res.setHeader('Content-Type', 'text/csv');
	res.setHeader('Content-Disposition', 'attachment; filename=applications.csv');
	res.status(StatusCodes.OK).send(response);
};

const addMapZoomLvlAndLongLat = (document) => {
	const area = ['COUNTRY', 'REGION', 'COUNTY', 'BOROUGH', 'DISTRICT', 'CITY', 'TOWN', 'JUNCTION'];
	const MAPZOOMLVL_OFFSET = 5;
	const DEFAULT_MAPZOOMLVL = 9;
	const DEFAULT_LONGLAT = ['53.8033666', '-2.7044637'];
	const mapZoomLevel = document.MapZoomLevel ? document.MapZoomLevel : 'COUNTRY';
	let LongLat = [...DEFAULT_LONGLAT];
	if (document.LatLong) {
		const latLong = document.LatLong.split(',');
		LongLat = [latLong[1], latLong[0]];
	}

	const application = {
		...document,
		MapZoomLevel: mapZoomLevel
			? MAPZOOMLVL_OFFSET + area.indexOf(mapZoomLevel.toUpperCase())
			: MAPZOOMLVL_OFFSET + DEFAULT_MAPZOOMLVL,
		LongLat
	};
	delete application.LatLong;
	return application;
};

module.exports = {
	getApplication,
	getAllApplications,
	getAllApplicationsDownload
};
