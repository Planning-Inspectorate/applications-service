const { prismaClient } = require('../lib/prisma');
const getAllAdviceByCaseReference = async (caseReference, offset, size, searchTerm) => {
	const where = {
		AND: [
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
		orderBy: [
			{
				adviceDate: 'desc'
			},
			{
				adviceId: 'asc'
			}
		],
		skip: offset,
		take: size
	};

	const advice = await prismaClient.advice.findMany(dbQuery);
	const count = await prismaClient.advice.count({ where });
	return { count, advice };
};

const mapSearchTermToQuery = (searchTerm) => {
	if (searchTerm) {
		const searchStatements = ['from', 'agent', 'enquiryDetails', 'adviceDetails'].map((field) => ({
			[field]: { contains: searchTerm }
		}));
		return { OR: searchStatements };
	}
};

module.exports = {
	getAllAdviceByCaseReference
};
