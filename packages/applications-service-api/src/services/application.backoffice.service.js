const {
	getByCaseReference: getBackOfficeApplication,
	getAllApplications: getAllBOApplicationsRepository
} = require('../repositories/project.backoffice.repository');
const { getAllNIApplications } = require('./application.ni.service');
const { mapApplicationsToCSV } = require('../utils/map-applications-to-csv');
const {
	getAllMergedApplications,
	getAllMergedApplicationsDownload
} = require('./application.merge.service');
const { getNIApplication, getAllNIApplicationsDownload } = require('./application.ni.service');
const config = require('../lib/config');
const { isBackOfficeCaseReference } = require('../utils/is-backoffice-case-reference');
const { isEmpty } = require('lodash');
const {
	mapNIApplicationToApi,
	mapBackOfficeApplicationToApi,
	mapBackOfficeApplicationsToApi,
	buildApplicationsFiltersFromBOApplications
} = require('../utils/application.mapper');

const getApplication = async (caseReference) =>
	isBackOfficeCaseReference(caseReference)
		? mapBackOfficeApplicationToApi(await getBackOfficeApplication(caseReference))
		: mapNIApplicationToApi(await getNIApplication(caseReference));

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
	const getApplications = config.backOfficeIntegration.getAllApplications;
	switch (getApplications) {
		case 'BO':
			return getAllBOApplications(query);
		case 'MERGE':
			return getAllMergedApplications(query);
		// NI is the default
		default:
			return getAllNIApplications(query);
	}
};

const getAllBOApplications = async (query) => {
	const { pageNo, ...queryOptions } = createQueryFilters(query);
	const { applications, count } = await getAllBOApplicationsRepository(queryOptions);
	const { applications: allApplications, count: totalItemsWithoutFilters } =
		await getAllBOApplicationsRepository();
	const filters = buildApplicationsFiltersFromBOApplications(allApplications);
	return {
		applications: mapBackOfficeApplicationsToApi(applications),
		totalItems: count,
		totalItemsWithoutFilters,
		itemsPerPage: queryOptions.size,
		totalPages: Math.ceil(Math.max(1, count) / queryOptions.size),
		currentPage: pageNo,
		filters
	};
};

const getAllApplicationsDownload = async () => {
	const getApplications = config.backOfficeIntegration.getAllApplications;
	switch (getApplications) {
		case 'BO':
			return getAllBOApplicationsDownload();
		case 'MERGE':
			return getAllMergedApplicationsDownload();
		// NI is the default
		default:
			return getAllNIApplicationsDownload();
	}
};

const getAllBOApplicationsDownload = async () => {
	const { applications } = await getAllBOApplicationsRepository();
	const mappedToAPIApplications = mapBackOfficeApplicationsToApi(applications);
	return mapApplicationsToCSV(mappedToAPIApplications);
};
module.exports = {
	createQueryFilters,
	getApplication,
	getAllApplications,
	getAllApplicationsDownload
};
