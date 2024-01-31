const {
	getByCaseReference: getBackOfficeApplication,
	getAllApplications: getAllBOApplicationsRepository
} = require('../repositories/project.backoffice.repository');
const { getAllNIApplications } = require('./application.ni.service');
const { getNIApplication } = require('./application.ni.service');
const config = require('../lib/config');
const {
	mapNIApplicationToApi,
	mapBackOfficeApplicationToApi,
	mapBackOfficeApplicationsToApi
} = require('../utils/application.mapper');

const getApplication = async (caseReference) =>
	isBackOfficeApplication(caseReference)
		? mapBackOfficeApplicationToApi(await getBackOfficeApplication(caseReference))
		: mapNIApplicationToApi(await getNIApplication(caseReference));

const getAllApplications = async (query) => {
	const isGetFromBackOfficeEnabled = config.backOfficeIntegration.applications.getAllApplications;
	if (!isGetFromBackOfficeEnabled) return getAllNIApplications(query);

	const applications = await getAllBOApplicationsRepository();
	// TODO: ASB-2190 - filters
	const filters = [];

	// TODO: ASB-2190 - pagination and sorting
	return {
		applications: mapBackOfficeApplicationsToApi(applications),
		totalItems: applications.length,
		itemsPerPage: 25,
		totalPages: 1,
		currentPage: 1,
		totalItemsWithoutFilters: 0,
		filters: filters
	};
};

const isBackOfficeApplication = (caseReference) =>
	config.backOfficeIntegration.applications.getApplication.caseReferences.includes(caseReference);

module.exports = {
	getApplication,
	getAllApplications
};
