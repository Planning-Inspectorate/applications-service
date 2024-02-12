const {
	getByCaseReference: getBackOfficeApplication,
	getAllApplications: getAllBOApplicationsRepository
} = require('../repositories/project.backoffice.repository');
const { getAllNIApplications } = require('./application.ni.service');
const { getNIApplication } = require('./application.ni.service');
const config = require('../lib/config');
const { isEmpty } = require('lodash');
const {
	mapNIApplicationToApi,
	mapBackOfficeApplicationToApi,
	mapBackOfficeApplicationsToApi,
	buildApplicationsFiltersFromBOApplications
} = require('../utils/application.mapper');

const getApplication = async (caseReference) =>
	isBackOfficeApplication(caseReference)
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
	const getFromBackOffice = config.backOfficeIntegration.applications.getAllApplications;

	switch (getFromBackOffice) {
		case 'BO':
			return await getAllBOApplications(query);
		case 'BOTH':
			return await getAllMergedApplications(query);
		default:
			// default is NI so no breaking change
			return await getAllNIApplications(query);
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

const getAllMergedApplications = async (query) => {
	const niApplications = await getAllNIApplications(query);
	const boApplications = await getAllBOApplications(query);

	const totalItems = niApplications.totalItems + boApplications.totalItems;
	const totalItemsWithoutFilters =
		niApplications.totalItemsWithoutFilters + boApplications.totalItemsWithoutFilters;
	const itemsPerPage = niApplications.itemsPerPage + boApplications.itemsPerPage;
	const mergedApplications = [];
	const mergedFilters = {};
	return {
		applications: mergedApplications,
		totalItems,
		totalItemsWithoutFilters,
		itemsPerPage,
		totalPages: 1,
		currentPage: 1,
		filters: mergedFilters
	};
};
const isBackOfficeApplication = (caseReference) =>
	config.backOfficeIntegration.applications.getApplication.caseReferences.includes(caseReference);

module.exports = {
	getApplication,
	getAllApplications
};
