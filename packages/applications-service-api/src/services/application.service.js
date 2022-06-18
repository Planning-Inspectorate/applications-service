const db = require('../models');

const getApplication = async (id) => {
	const project = await db.Project.findOne({ where: { CaseReference: id } });
	return project;
};

const getAllApplications = async () => {
	const projects = await db.Project.findAll();
	return projects;
};

module.exports = {
	getApplication,
	getAllApplications
};
