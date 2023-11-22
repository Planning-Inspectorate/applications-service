const db = require('../models');
const { Op } = require('sequelize');

const getAllAdviceByCaseReference = async (caseReference, offset, size, searchTerm) => {
	const where = {
		[Op.and]: [
			{
				caseReference
			},
			{
				...(searchTerm ? mapSearchTermToQuery(searchTerm) : {})
			}
		]
	};

	const dbQuery = {
		where,
		order: [['dateAdviceGiven', 'DESC'], ['adviceID']],
		offset,
		limit: size,
		raw: true
	};

	const { count, rows } = await db.Advice.findAndCountAll(dbQuery);

	return {
		count,
		advice: rows
	};
};

const mapSearchTermToQuery = (searchTerm) => {
	if (searchTerm) {
		const searchStatements = [
			'firstName',
			'lastName',
			'organisation',
			'enquiryDetail',
			'adviceGiven'
		].map((field) => ({
			[field]: { [Op.like]: `%${searchTerm}%` }
		}));
		return { [Op.or]: searchStatements };
	}
};

module.exports = {
	getAllAdviceByCaseReference
};
