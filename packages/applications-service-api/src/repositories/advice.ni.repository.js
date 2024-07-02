const db = require('../models');
const { Op } = require('sequelize');
const { mapNISearchTermToQuery } = require('../utils/queries');

const getAllAdviceByCaseReference = async (caseReference, offset, size, searchTerm) => {
	const where = {
		[Op.and]: [
			{
				caseReference
			},
			{
				...(searchTerm
					? mapNISearchTermToQuery(searchTerm, [
							'firstName',
							'lastName',
							'organisation',
							'enquiryDetail',
							'adviceGiven'
					  ])
					: {})
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

const getAdviceById = async (adviceID) => {
	return db.Advice.findOne({
		where: {
			adviceID
		},
		raw: true
	});
};

module.exports = {
	getAllAdviceByCaseReference,
	getAdviceById
};
