const {
	getApplication: getApplicationFromApplicationRepository,
	getAllApplications: getAllApplicationsFromApplicationRepository,
	getAllApplicationsCount: getAllApplicationsCountFromApplicationRepository
} = require('../repositories/project.ni.repository');
const mapApplicationsToCSV = require('../utils/map-applications-to-csv');
const addMapZoomLvlAndLongLat =
	require('../utils/add-map-zoom-and-longlat').addMapZoomLvlAndLongLat;
const getApplication = async (id) => {
	const application = await getApplicationFromApplicationRepository(id);
	return application?.dataValues ? addMapZoomLvlAndLongLat(application.dataValues) : null;
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

	return {
		pageNo,
		size,
		offset: size * (pageNo - 1),
		order: [[sortFieldName, sortDirection]]
	};
};

const getAllApplications = async (query) => {
	const { pageNo, size, offset, order } = createQueryFilters(query);

	const count = await getAllApplicationsCountFromApplicationRepository();
	const applications = await getAllApplicationsFromApplicationRepository({
		offset,
		limit: size,
		order
	});

	return {
		applications: applications.map((document) => addMapZoomLvlAndLongLat(document.dataValues)),
		totalItems: count,
		itemsPerPage: size,
		totalPages: Math.ceil(Math.max(1, count) / size),
		currentPage: pageNo
	};
};

const getAllApplicationsDownload = async () => {
	const applications = await getAllApplicationsFromApplicationRepository();
	const applicationsWithMapZoomLvlAndLongLat = applications.map((document) =>
		addMapZoomLvlAndLongLat(document.dataValues)
	);
	return mapApplicationsToCSV(applicationsWithMapZoomLvlAndLongLat);
};

module.exports = {
	getApplication,
	getAllApplications,
	getAllApplicationsDownload
};
