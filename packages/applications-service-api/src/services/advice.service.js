const { Op } = require('sequelize');
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
			order: [['dateAdviceGiven', 'DESC'], ['adviceID']],
			offset,
			limit: itemsPerPage
		};

		const { count, rows } = await db.Advice.findandCountAllWithAttachments(dbQuery);

		const attachments = await db.Attachment.findAllAttachments({
			where: {
				adviceID: {
					[Op.or]: rows.map((row) => row.adviceID)
				}
			}
		});

		console.log(
			attachments.map((row) =>
				row.get({
					plain: true
				})
			)
		);

		return {
			count,
			rows: rows.map((row) =>
				row.get({
					plain: true
				})
			)
		};
	}
};
