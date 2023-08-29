const db = require('../models');

const getApplication = async (id) => {
	return await db.Project.findOne({ where: { CaseReference: id } });
};

const getAllApplications = async (query) => {
	const pageNo = parseInt(query?.page) || 1;
	const size = Math.min(parseInt(query?.size) || 25, 100);

	const count = await db.Project.count();
	const applications = await db.Project.findAll({
		offset: size * (pageNo - 1),
		limit: size
	});

	return {
		applications,
		totalItems: count,
		itemsPerPage: size,
		totalPages: Math.ceil(Math.max(1, count) / size),
		currentPage: pageNo
	};
};

module.exports = {
	getApplication,
	getAllApplications
};
