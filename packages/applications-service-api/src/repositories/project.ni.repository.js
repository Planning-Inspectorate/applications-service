const db = require('../models');
const { Op } = require('sequelize');
const { pick } = require('lodash');
const config = require('../lib/config');
const { english: stopWordList } = require('../utils/stopwords');
const getApplication = async (caseReference) =>
	db.Project.findOne({ where: { CaseReference: caseReference } });

const getAllApplications = async (options = {}) => {
	const { filters, searchTerm, excludeNullDateOfSubmission } = options;

	let findAllOptions = pick(options, ['attributes', 'offset', 'limit', 'order']);
	findAllOptions.where = {
		Region: { [Op.ne]: 'Wales' },
		CaseReference: { [Op.notIn]: config.backOfficeIntegration.caseReferences }
	};

	if (excludeNullDateOfSubmission) {
		findAllOptions.where = {
			...findAllOptions.where,
			DateOfDCOSubmission: { [Op.gt]: 0, [Op.ne]: null }
		};
	}

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

	// build where clause
	if (filterStatements.length > 0)
		findAllOptions.where = { ...findAllOptions.where, [Op.and]: filterStatements };
	if (searchTerm) {
		const terms = searchTerm
			.split(' ')
			.filter((term) => !stopWordList.includes(term.toLowerCase()));
		const searchTermStatements = {
			[Op.or]: [
				{ CaseReference: { [Op.like]: `%${searchTerm}%` } },
				{
					[Op.and]: terms.map((term) => ({
						ProjectName: { [Op.like]: `%${term}%` }
					}))
				},
				{
					[Op.and]: terms.map((term) => ({
						PromoterName: { [Op.like]: `%${term}%` }
					}))
				}
			]
		};
		findAllOptions.where = { ...findAllOptions.where, ...searchTermStatements };
	}
	const { rows, count } = await db.Project.findAndCountAll({
		...findAllOptions,
		raw: true
	});

	return { applications: rows, count };
};

module.exports = {
	getApplication,
	getAllApplications
};
