const { prismaClient } = require('../lib/prisma');
const { english: stopWordList } = require('../utils/stopwords');

const getAllAdviceByCaseReference = async (caseReference, offset, size, searchTerm) => {
	const terms = searchTerm?.split(' ').filter((term) => !stopWordList.includes(term.toLowerCase()));
	const where = {
		AND: [
			{
				caseReference
			}
		]
	};

	if (terms?.length > 0) {
		where.AND.push({
			OR: [
				'from',
				'agent',
				'enquiryDetails',
				'enquiryDetailsWelsh',
				'adviceDetails',
				'adviceDetailsWelsh'
			].map((field) => ({
				AND: terms.map((term) => ({
					[field]: { contains: term }
				}))
			}))
		});
	}

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
