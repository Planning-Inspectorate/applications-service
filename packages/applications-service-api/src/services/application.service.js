const db = require('../models');

const getApplication = async (id) => {
	return await db.Project.findOne({ where: { CaseReference: id } });
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

	const count = await db.Project.count();
	const applications = await db.Project.findAll({
		offset,
		limit: size,
		order
	});

	return {
		applications,
		totalItems: count,
		itemsPerPage: size,
		totalPages: Math.ceil(Math.max(1, count) / size),
		currentPage: pageNo
	};
};

const getAllApplicationsDownload = async () => {
	return db.Project.findAll({
		order: [['ProjectName', 'ASC']]
	});
};

module.exports = {
	getApplication,
	getAllApplications,
	getAllApplicationsDownload
};
