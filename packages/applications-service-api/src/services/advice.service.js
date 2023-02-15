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

		const { count, rows } = await db.Advice.findAndCountAll(dbQuery);

		return {
			count,
			rows: rows.map((row) =>
				row.get({
					plain: true
				})
			)
		};
	},

	// Stubbed for future ticket, will determin waht can be reused/discarded then
	async getAdviceById(/*adviceId*/) {
		// const attachments = await db.Attachment.findAllAttachments({
		// 	where: {
		// 		adviceID: {
		// 			[Op.or]: rows.map((row) => row.adviceID)
		// 		}
		// 	}
		// });
		// const adviceWithAttachments = rows.map((row) => {
		// 	const advice = row.get({
		// 		plain: true
		// 	});
		// 	advice.attachments = attachments
		// 		.filter((attachment) => attachment.adviceID === advice.adviceID)
		// 		.map((attachment) => {
		// 			// eslint-disable-next-line no-unused-vars
		// 			const { adviceID, ...dto } = attachment.get({
		// 				plain: true
		// 			});
		// 			return dto;
		// 		});
		// 	return advice;
		// });
	}
};
