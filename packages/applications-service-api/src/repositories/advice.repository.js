const { prismaClient } = require('../lib/prisma');
const { mapSearchTermToQuery } = require('../utils/queries');
const getAllAdviceByCaseReference = async (caseReference, offset, size, searchTerm) => {
	const where = {
		AND: [
			{
				caseReference
			},
			{
				...(searchTerm
					? mapSearchTermToQuery(searchTerm, [
							'from',
							'agent',
							'enquiryDetails',
							'enquiryDetailsWelsh',
							'adviceDetails',
							'adviceDetailsWelsh'
					  ])
					: {})
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

const getAdviceById = async (adviceID) => {
	return prismaClient.advice.findUnique({
		where: {
			adviceId: parseInt(adviceID)
		}
	});
};

module.exports = {
	getAllAdviceByCaseReference,
	getAdviceById
};
