const {
	getByCaseReference: getBackOfficeApplication,
	getAllApplications: getAllBOApplicationsRepository
} = require('../repositories/project.backoffice.repository');
const { mapApplicationsToCSV } = require('../utils/map-applications-to-csv');
const { isEmpty } = require('lodash');
const {
	mapBackOfficeApplicationToApi,
	mapBackOfficeApplicationsToApi,
	buildApplicationsFiltersFromBOApplications
} = require('../utils/application.mapper');

const getApplication = async (caseReference) =>
	mapBackOfficeApplicationToApi(await getBackOfficeApplication(caseReference));

const createQueryFilters = (query) => {
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
		orderBy,
		...(query.searchTerm ? { searchTerm: query.searchTerm } : {}),
		...(isEmpty(filters) ? {} : { filters })
	};
};
const getAllApplications = async (query) => {
	return getAllBOApplications(query);
};

const getAllBOApplications = async (query) => {
	const { ...queryOptions } = createQueryFilters(query);
	const { applications, count } = await getAllBOApplicationsRepository(queryOptions);
	const filters = buildApplicationsFiltersFromBOApplications(applications);
	return {
		applications: mapBackOfficeApplicationsToApi(applications),
		totalItems: count,
		filters
	};
};

const getAllApplicationsDownload = async () => {
	return getAllBOApplicationsDownload();
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
