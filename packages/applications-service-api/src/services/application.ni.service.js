const {
	getApplication: getApplicationRepository,
	getAllApplications: getAllApplicationsRepository
} = require('../repositories/project.ni.repository');
const { mapApplicationsToCSV } = require('../utils/map-applications-to-csv');
const {
	buildApiFiltersFromNIApplications,
	mapApplicationFiltersToNI,
	addMapZoomLevelAndLongLat,
	mapNIApplicationsToApi
} = require('../utils/application.mapper');
const { isEmpty } = require('lodash');

const getNIApplication = async (caseReference) => {
	const application = await getApplicationRepository(caseReference);
	return addMapZoomLevelAndLongLat(application?.dataValues);
};

const getAllNIApplications = async (query) => {
	const { pageNo, size, offset, order } = createQueryFilters(query);

	const { applications: allApplications, count: totalItemsWithoutFilters } =
		await getAllApplicationsRepository();
	const availableFilters = buildApiFiltersFromNIApplications(allApplications);

	const repositoryOptions = {
		offset,
		limit: size,
		order,
		searchTerm: query?.searchTerm
	};
	const appliedFilters = mapApplicationFiltersToNI(query);
	if (!isEmpty(appliedFilters)) repositoryOptions.filters = appliedFilters;

	const { applications, count } = await getAllApplicationsRepository(repositoryOptions);

	return {
		applications: mapNIApplicationsToApi(applications),
		totalItems: count,
		itemsPerPage: size,
		totalPages: Math.ceil(Math.max(1, count) / size),
		currentPage: pageNo,
		totalItemsWithoutFilters,
		filters: availableFilters
	};
};

const getAllNIApplicationsDownload = async () => {
	const { applications } = await getAllApplicationsRepository();
	const mappedApplications = mapNIApplicationsToApi(applications);
	return mapApplicationsToCSV(mappedApplications);
};

const createQueryFilters = (query) => {
	// Pagination
	const pageNo = parseInt(query?.page) || 1;
	const defaultSize = 25;
	const maxSize = 100;
	const size = Math.min(parseInt(query?.size) || defaultSize, maxSize);

	// Sorting
	const allowedSortFieldsWithDirection = [
		'ProjectName',
		'PromoterName',
		'DateOfDCOSubmission',
		'ConfirmedDateOfDecision',
		'Stage'
	].flatMap((field) => [field, `+${field}`, `-${field}`]);

	const defaultSort = '+ProjectName';
	const sort = allowedSortFieldsWithDirection.includes(query?.sort) ? query?.sort : defaultSort;
	const sortDirection = sort?.startsWith('-') ? 'DESC' : 'ASC';
	const sortFieldName = sort?.replace(/^[+-]/, '');

	const order = [[sortFieldName, sortDirection]];
	if (sortFieldName === 'Stage') {
		order.push(['ProjectName', 'ASC']);
	}
	return {
		pageNo,
		size,
		offset: size * (pageNo - 1),
		order
	};
};

module.exports = {
	createQueryFilters,
	getNIApplication,
	getAllNIApplications,
	getAllNIApplicationsDownload
};
