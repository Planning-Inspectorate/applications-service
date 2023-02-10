// const { Op, fn, col, literal } = require('sequelize');
const db = require('../models');

module.exports = {
	async getAdvice(requestQuery) {
		const itemsPerPage = requestQuery.itemsPerPage;
		const offset = (requestQuery.page - 1) * itemsPerPage;

		const where = {
			// case_reference: requestQuery.caseReference
		};

		const dbQuery = {
			where,
			order: [['DateAdviceGiven', 'DESC'], ['AdviceID']],
			offset,
			limit: itemsPerPage
		};

		const queryResult = await db.Advice.findAndCountAll(dbQuery);

		return {
			count: queryResult.count,
			rows: queryResult.rows.map((row) => row.dataValues)
		};
	}
};
