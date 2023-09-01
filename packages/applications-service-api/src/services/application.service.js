const {
	getApplication: getApplicationFromApplicationRepository,
	getAllApplications: getAllApplicationsFromApplicationRepository,
	getAllApplicationsCount: getAllApplicationsCountFromApplicationRepository
} = require('../repositories/project.ni.repository');
const addMapZoomLvlAndLongLat =
	require('../utils/add-map-zoom-and-longlat').addMapZoomLvlAndLongLat;
const getApplication = async (id) => {
	const application = await getApplicationFromApplicationRepository(id);
	return addMapZoomLvlAndLongLat(application.dataValues);
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

const getAllApplicationsDownloadInBatches = async (readableStream) => {
	const batchSize = 100;
	let skip = 0;
	let hasMore = true;
	let isFirstBatch = true;

	while (hasMore) {
		const applications = await getAllApplicationsFromApplicationRepository({
			offset: skip,
			limit: batchSize,
			order: [['ProjectName', 'ASC']]
		});

		if (skip === 0) isFirstBatch = true;
		skip += batchSize;
		hasMore = applications.length === batchSize;

		if (applications.length > 0) {
			const mappedApplications = applications.map((item) =>
				addMapZoomLvlAndLongLat(item.dataValues)
			);
			// Set the CSV Header key to toggle the first csv string to capture headers
			if (isFirstBatch) {
				mappedApplications.setCSVHeader = true;
				isFirstBatch = false;
			}
			// Push the batch of items to the readable stream
			readableStream.push(mappedApplications);
		}
	}

	// Signal the end of the stream
	readableStream.push(null);
};

module.exports = {
	getApplication,
	getAllApplications,
	getAllApplicationsDownloadInBatches
};
