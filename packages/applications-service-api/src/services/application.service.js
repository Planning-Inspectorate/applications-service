const db = require('../models');

const getApplication = async (id) => {
	const project = await db.Project.findOne({ where: { CaseReference: id } });
	return project;
};

const getAllApplications = async (options = {}) => {
	const projects = await db.Project.findAll(options);
	return projects;
};

module.exports = {
	getApplication,
	getAllApplications
};
