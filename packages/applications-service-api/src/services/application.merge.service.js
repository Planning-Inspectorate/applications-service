const {
	getAllApplications: getAllBOApplicationsRepository
} = require('../repositories/project.backoffice.repository');
const {
	mapBackOfficeApplicationsToApi,
	mapApplicationFiltersToNI,
	buildApiFiltersFromNIApplications,
	buildApplicationsFiltersFromBOApplications,
	mapNIApplicationsToApi,
	mergeFilters
} = require('../utils/application.mapper');
const mapApplicationsToCSV = require('../utils/map-applications-to-csv');
const {
	getAllApplications: getAllNIApplicationsRepository
} = require('../repositories/project.ni.repository');
const { isEmpty, uniqBy } = require('lodash');
const sortApplications = require('../utils/sort-applications.merge');

/**
 * This is a temporary file which will be removed once the applications-service-api is updated to only use BO applications.
 * In the meantime while we are merging the applications from BO and NI we need to combine and sort them on the API level
 */

const getAllMergedApplications = async (query) => {
	const {
		applications: niApplications,
		allApplications: allNIApplications,
		filters: filtersNI
	} = await getNIApplicationsWithoutPagination(query);
	const {
		applications: boApplications,
		allApplications: allBOApplications,
		filters: filtersBO
	} = await getBOApplicationsWithoutPagination(query);
	const { applications, totalItems, totalItemsWithoutFilters } = mergeApplicationsAndCounts(
		boApplications,
		niApplications,
		allBOApplications,
		allNIApplications
	);

	const filters = mergeFilters(filtersNI, filtersBO);
	const sortedApplications = sortApplications(applications, query?.sort);
	return {
		applications: sortedApplications,
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
		excludeNullDateOfSubmission: query.excludeNullDateOfSubmission,
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
		filters: isEmpty(appliedFilters) ? undefined : appliedFilters,
		excludeNullDateOfSubmission: query.excludeNullDateOfSubmission
	};
};

const getBOApplicationsWithoutPagination = async (query) => {
	const queryOptions = createQueryFiltersBO(query);
	const { applications } = await getAllBOApplicationsRepository(queryOptions);
	const { applications: allApplications } = await getAllBOApplicationsRepository();
	return {
		applications: mapBackOfficeApplicationsToApi(applications),
		allApplications: mapBackOfficeApplicationsToApi(allApplications),
		filters: buildApplicationsFiltersFromBOApplications(allApplications)
	};
};

const getNIApplicationsWithoutPagination = async (query) => {
	const queryOptions = createQueryFiltersNI(query);
	const { applications } = await getAllNIApplicationsRepository(queryOptions);
	const { applications: allApplications } = await getAllNIApplicationsRepository();
	return {
		applications: mapNIApplicationsToApi(applications),
		allApplications: mapNIApplicationsToApi(allApplications),
		filters: buildApiFiltersFromNIApplications(allApplications)
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
	const allNIApplications = await getAllNIApplicationsRepository();
	const niApplications = mapNIApplicationsToApi(allNIApplications.applications);
	const allBOApplications = await getAllBOApplicationsRepository();
	const boApplications = mapBackOfficeApplicationsToApi(allBOApplications.applications);
	const mergedApplications = uniqBy([...boApplications, ...niApplications], 'CaseReference');
	return mapApplicationsToCSV(mergedApplications);
};

module.exports = {
	getAllMergedApplications,
	getAllMergedApplicationsDownload
};
