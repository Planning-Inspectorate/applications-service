const db = require('../models');

const getApplication = async (id) => {
	return await db.Project.findOne({ where: { CaseReference: id } });
};

const getAllApplications = async (options) => {
	return await db.Project.findAll(options);
};

const getAllApplicationsCount = async () => {
	return await db.Project.count();
};

module.exports = {
	getApplication,
	getAllApplications,
	getAllApplicationsCount
};
