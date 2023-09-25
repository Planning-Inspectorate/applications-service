const {
	getApplication: getApplicationRepository,
	getAllApplications: getAllApplicationsRepository,
	getAllApplicationsCount
} = require('../repositories/project.ni.repository');
const mapApplicationsToCSV = require('../utils/map-applications-to-csv');
const {
	buildApiFiltersFromNIApplications,
	mapApplicationFiltersToNI,
	addMapZoomLevelAndLongLat
} = require('../utils/application.mapper');
const { isEmpty } = require('lodash');

const getNIApplication = async (caseReference) => {
	const application = await getApplicationRepository(caseReference);
	return addMapZoomLevelAndLongLat(application?.dataValues);
};

const getAllNIApplications = async (query) => {
	const { pageNo, size, offset, order } = createQueryFilters(query);

	const availableFilters = await getAvailableFilters();

	const repositoryOptions = {
		offset,
		limit: size,
		order,
		searchTerm: query?.searchTerm
	};
	const appliedFilters = mapApplicationFiltersToNI(query);
	if (!isEmpty(appliedFilters)) repositoryOptions.filters = appliedFilters;

	const { applications, count } = await getAllApplicationsRepository(repositoryOptions);
	const totalItemsWithoutFilters = await getAllApplicationsCount();

	return {
		applications: applications.map(addMapZoomLevelAndLongLat),
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
	const applicationsWithMapZoomLvlAndLongLat = applications.map(addMapZoomLevelAndLongLat);
	return mapApplicationsToCSV(applicationsWithMapZoomLvlAndLongLat);
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

const getAvailableFilters = async () => {
	const { applications } = await getAllApplicationsRepository({
		attributes: ['Stage', 'Region', 'Proposal']
	});
	return buildApiFiltersFromNIApplications(applications);
};

module.exports = {
	getNIApplication,
	getAllNIApplications,
	getAllNIApplicationsDownload
};
