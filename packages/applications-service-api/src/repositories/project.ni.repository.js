const db = require('../models');

const getApplication = async (id) => {
	return await db.Project.findOne({ where: { CaseReference: id } });
};

const getAllApplications = async (options) => {
	return db.Project.findAll(options);
};

const getAllApplicationsCount = async () => {
	return db.Project.count();
};

module.exports = {
	getApplication,
	getAllApplications,
	getAllApplicationsCount
};
