const {
	getAllApplications: getAllBOApplicationsRepository
} = require('../repositories/project.backoffice.repository');
const {
	mapBackOfficeApplicationsToApi,
	addMapZoomLevelAndLongLat,
	mapApplicationFiltersToNI,
	buildApiFiltersFromNIApplications
} = require('../utils/application.mapper');
const mapApplicationsToCSV = require('../utils/map-applications-to-csv');
const {
	getAllApplications: getAllNIApplicationsRepository
} = require('../repositories/project.ni.repository');
const { isEmpty, uniqBy } = require('lodash');

const getAllMergedApplications = async (query) => {
	const { applications: niApplications, allApplications: allNIApplications } =
		await getNIApplicationsWithoutPagination(query);
	const { applications: boApplications, allApplications: allBOApplications } =
		await getBOApplicationsWithoutPagination(query);
	const { applications, allApplications, totalItems, totalItemsWithoutFilters } =
		mergeApplicationsAndCounts(
			boApplications,
			niApplications,
			allBOApplications,
			allNIApplications
		);

	const filters = buildApiFiltersFromNIApplications(allApplications);

	return {
		applications,
		totalItems,
		totalItemsWithoutFilters,
		itemsPerPage: totalItems,
		totalPages: 1,
		currentPage: 1,
		filters
	};
};
const createQueryFiltersBO = (query) => {
	const filters = {
		...(query?.region ? { region: query?.region } : {}),
		...(query?.stage ? { stage: query?.stage } : {}),
		...(query?.sector ? { sector: query?.sector } : {})
	};
	return {
		orderBy: {
			projectName: 'asc'
		},
		...(query.searchTerm ? { searchTerm: query.searchTerm } : {}),
		...(isEmpty(filters) ? {} : { filters })
	};
};

const createQueryFiltersNI = (query) => {
	const order = [['ProjectName', 'ASC']];
	const appliedFilters = mapApplicationFiltersToNI(query);
	return {
		order,
		searchTerm: query?.searchTerm,
		filters: isEmpty(appliedFilters) ? undefined : appliedFilters
	};
};

const getBOApplicationsWithoutPagination = async (query) => {
	const queryOptions = createQueryFiltersBO(query);
	const { applications } = await getAllBOApplicationsRepository(queryOptions);
	const { applications: allApplications } = await getAllBOApplicationsRepository();
	return {
		applications: mapBackOfficeApplicationsToApi(applications),
		allApplications: mapBackOfficeApplicationsToApi(allApplications)
	};
};

const getNIApplicationsWithoutPagination = async (query) => {
	const queryOptions = createQueryFiltersNI(query);
	const { applications } = await getAllNIApplicationsRepository(queryOptions);
	const { applications: allApplications } = await getAllNIApplicationsRepository();
	return {
		applications: applications.map(addMapZoomLevelAndLongLat),
		allApplications: allApplications.map(addMapZoomLevelAndLongLat)
	};
};

const mergeApplicationsAndCounts = (
	boApplications,
	niApplications,
	allBOApplications,
	allNIApplications
) => {
	const applications = uniqBy([...boApplications, ...niApplications], 'CaseReference');
	const totalItems = applications.length;

	// need to merge all items and then remove duplications to find the total count without filters
	const allApplications = uniqBy([...allBOApplications, ...allNIApplications], 'CaseReference');
	const totalItemsWithoutFilters = allApplications.length;
	return {
		applications,
		totalItems,
		totalItemsWithoutFilters,
		allApplications
	};
};

const getAllMergedApplicationsDownload = async () => {
	const allBOApplications = await getAllBOApplicationsRepository();
	const allNIApplications = await getAllNIApplicationsRepository();
	const boApplications = mapBackOfficeApplicationsToApi(allBOApplications.applications);
	const niApplications = allNIApplications.applications.map(addMapZoomLevelAndLongLat);
	const mergedApplications = uniqBy([...boApplications, ...niApplications], 'CaseReference');
	return mapApplicationsToCSV(mergedApplications);
};

module.exports = {
	getAllMergedApplications,
	getAllMergedApplicationsDownload
};
