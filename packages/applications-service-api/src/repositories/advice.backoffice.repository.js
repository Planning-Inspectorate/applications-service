const { prismaClient } = require('../lib/prisma');
const { english: stopWordList } = require('../utils/stopwords');
const { isGeneralAdviceCaseReference } = require('../utils/is-general-advice-case-reference');
const { featureFlag } = require('../lib/config');

const getAllAdviceByCaseReference = async (caseReference, offset, size, searchTerm, orderBy) => {
	const terms = Array.from(
		new Set(
			(searchTerm ?? '')
				.split(' ')
				.map((t) => t.trim().toLowerCase())
				.filter((t) => !stopWordList.includes(t))
		)
	);
	const generalAdviceCaseReference = isGeneralAdviceCaseReference(caseReference);

	const where = {
		AND: []
	};

	if (!featureFlag.displaySpecificAndGeneralAdvice || !generalAdviceCaseReference) {
		where.AND.push({
			caseReference
		});
	}

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

	let dbQuery;

	if (featureFlag.displaySpecificAndGeneralAdvice && generalAdviceCaseReference) {
		dbQuery = {
			where,
			include: {
				project: {
					select: {
						projectName: true,
						projectNameWelsh: true
					}
				}
			},
			orderBy: orderBy,
			skip: offset,
			take: size
		};
	} else {
		dbQuery = {
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
	}

	const [advice, count] = await prismaClient.$transaction([
		prismaClient.advice.findMany(dbQuery),
		prismaClient.advice.count({ where })
	]);
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
