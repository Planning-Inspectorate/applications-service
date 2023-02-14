const { Op } = require('sequelize');
const db = require('../models');

module.exports = {
	async getAdvice(requestQuery) {
		const itemsPerPage = requestQuery.itemsPerPage;
		const offset = (requestQuery.page - 1) * itemsPerPage;

		const where = {
			...(requestQuery.caseReference ? { caseReference: requestQuery.caseReference } : {})
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

		const adviceWithAttachments = rows.map((row) => {
			const advice = row.get({
				plain: true
			});

			advice.sttachments = attachments
				.filter((attachment) => attachment.adviceID === advice.adviceID)
				.map((attachment) =>
					attachment.get({
						plain: true
					})
				);

			return advice;
		});

		return {
			count,
			rows: adviceWithAttachments
		};
	}
};
