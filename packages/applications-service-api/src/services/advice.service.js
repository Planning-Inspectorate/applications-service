const { Op } = require('sequelize');

const db = require('../models');

module.exports = {
	async getAdvice(requestQuery) {
		const itemsPerPage = requestQuery.itemsPerPage;

		const where = {
			[Op.and]: [
				{
					...(requestQuery.caseReference ? { caseReference: requestQuery.caseReference } : {})
				},
				{
					...(requestQuery.searchTerm ? mapSearchTermToQuery(requestQuery.searchTerm) : {})
				}
			]
		};

		const dbQuery = {
			where,
			order: [['dateAdviceGiven', 'DESC'], ['adviceID']],
			offset: (requestQuery.page - 1) * itemsPerPage,
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

	async getAdviceById(adviceID) {
		const advice = await db.Advice.findOne({
			where: {
				adviceID
			}
		});

		if (!advice) return undefined;

		const attachments = await db.Attachment.findAllAttachmentsWithCase(advice.caseReference, {
			where: {
				adviceID
			}
		});

		const adviceDTO = advice.get({
			plain: true
		});

		adviceDTO.attachments = attachments.map((attachment) => {
			// eslint-disable-next-line no-unused-vars
			const { adviceID, ...dto } = attachment.get({
				plain: true
			});
			return dto;
		});

		return adviceDTO;
	}
};

function mapSearchTermToQuery(searchTerm) {
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
}
