const db = require('../models');
const { Op } = require('sequelize');
const { pick } = require('lodash');

const getApplication = async (caseReference) => db.Project.findOne({ where: { CaseReference: caseReference } });

const getAllApplications = async (options = {}) => {
	const { filters, searchTerm } = options;
	let findAllOptions = pick(options, ['attributes', 'offset', 'limit', 'order']);
	findAllOptions.where = {};

	// filters
	const filterStatements = [];
	if (filters?.region) filterStatements.push({ Region: { [Op.in]: filters.region } });
	if (filters?.stage) filterStatements.push({ Stage: { [Op.in]: filters.stage } });
	if (filters?.sector) {
		const sectorStatements = filters.sector.map((sector) => ({
			Proposal: { [Op.like]: `${sector}%` }
		}));
		filterStatements.push({ [Op.or]: sectorStatements });
	}

	// search
	const searchTermStatements = [];
	if (searchTerm) {
		searchTermStatements.push({ ProjectName: { [Op.like]: `%${searchTerm}%` } });
		searchTermStatements.push({ PromoterName: { [Op.like]: `%${searchTerm}%` } });
	}

	// build where clause
	if (filterStatements.length > 0)
		findAllOptions.where = { ...findAllOptions.where, [Op.and]: filterStatements };
	if (searchTermStatements.length > 0)
		findAllOptions.where = { ...findAllOptions.where, [Op.or]: searchTermStatements };

	const { rows, count } = await db.Project.findAndCountAll({
		...findAllOptions,
		raw: true
	});

	return { applications: rows, count };
};

const getAllApplicationsCount = async () => db.Project.count();

module.exports = {
	getApplication,
	getAllApplications,
	getAllApplicationsCount
};
