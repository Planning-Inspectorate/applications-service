const {
	getByCaseReference: getApplicationRepository,
	getAllApplications: getAllApplicationsRepository
} = require('../repositories/project.repository');
const mapApplicationsToCSV = require('../utils/map-applications-to-csv');
const { isEmpty } = require('lodash');
const {
	mapApplicationToApi,
	mapApplicationsToApi,
	buildApplicationsFiltersFromApplications
} = require('../utils/application.mapper');

const getApplication = async (caseReference) =>
	mapApplicationToApi(await getApplicationRepository(caseReference));

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
	const sortDirection = sort?.startsWith('-') ? 'desc' : 'asc';
	const sortFieldName = sort?.replace(/^[+-]/, '');

	const niFieldsToBoFields = {
		ProjectName: 'projectName',
		DateOfDCOSubmission: 'dateOfDCOSubmission',
		ConfirmedDateOfDecision: 'confirmedDateOfDecision',
		Stage: 'stage'
	};

	const orderBy =
		sortFieldName === 'PromoterName'
			? { applicant: { organisationName: sortDirection } }
			: { [niFieldsToBoFields[sortFieldName]]: sortDirection };
	const filters = {
		...(query?.region ? { region: query?.region } : {}),
		...(query?.stage ? { stage: query?.stage } : {}),
		...(query?.sector ? { sector: query?.sector } : {})
	};

	return {
		pageNo,
		size,
		offset: size * (pageNo - 1),
		orderBy,
		...(query.searchTerm ? { searchTerm: query.searchTerm } : {}),
		...(isEmpty(filters) ? {} : { filters })
	};
};
const getAllApplications = async (query) => {
	const { pageNo, ...queryOptions } = createQueryFilters(query);
	const { applications, count } = await getAllApplicationsRepository(queryOptions);
	const { applications: allApplications, count: totalItemsWithoutFilters } =
		await getAllApplicationsRepository();
	const filters = buildApplicationsFiltersFromApplications(allApplications);
	return {
		applications: mapApplicationsToApi(applications),
		totalItems: count,
		totalItemsWithoutFilters,
		itemsPerPage: queryOptions.size,
		totalPages: Math.ceil(Math.max(1, count) / queryOptions.size),
		currentPage: pageNo,
		filters
	};
};

const getAllApplicationsDownload = async () => {
	const { applications } = await getAllApplicationsRepository();
	const mappedToAPIApplications = mapApplicationsToApi(applications);
	return mapApplicationsToCSV(mappedToAPIApplications);
};

module.exports = {
	createQueryFilters,
	getApplication,
	getAllApplications,
	getAllApplicationsDownload
};
