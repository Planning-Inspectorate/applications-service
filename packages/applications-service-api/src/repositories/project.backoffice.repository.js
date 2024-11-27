const { prismaClient } = require('../lib/prisma');
const { featureFlag } = require('../lib/config');

const getByCaseReference = async (caseReference) => {
	return prismaClient.project.findUnique({
		where: {
			caseReference: caseReference
		},
		include: {
			applicant: true
		}
	});
};

const getAllApplications = async (options = {}) => {
	const { filters, searchTerm, orderBy, offset, size, excludeNullDateOfSubmission } = options;
	const where = excludeNullDateOfSubmission || searchTerm || filters ? { AND: [] } : {};

	if (excludeNullDateOfSubmission) {
		where['AND'].push({
			OR: [
				{
					dateOfDCOSubmission: {
						not: null
					}
				}
			]
		});
	}

	if (searchTerm) {
		const terms = options.searchTerm.split(' ');
		where['AND'].push({
			OR: [
				{ projectName: { contains: searchTerm } },
				{ caseReference: { contains: searchTerm } },
				...(featureFlag.allowWelshTranslation
					? [{ projectNameWelsh: { contains: searchTerm } }]
					: []),
				...terms.map((term) => ({
					OR: [
						{ applicant: { organisationName: { contains: term } } },
						{ applicant: { firstName: { contains: term } } },
						{ applicant: { lastName: { contains: term } } }
					]
				}))
			]
		});
	}
	if (filters?.region) {
		where['AND'].push({
			OR: filters.region.map((region) => ({
				regions: { contains: region }
			}))
		});
	}
	if (filters?.stage) {
		where['AND'].push({
			OR: filters.stage.map((stage) => ({
				stage: stage
			}))
		});
	}
	if (filters?.sector) {
		where['AND'].push({
			OR: filters.sector.map((sector) => ({
				sector: { contains: sector }
			}))
		});
	}

	const findOptions = {
		where,
		...(orderBy && { orderBy }),
		...(offset !== undefined && { skip: offset }),
		...(size !== undefined && { take: size }),
		include: {
			applicant: true
		}
	};

	const applications = await prismaClient.project.findMany(findOptions);
	const count = await prismaClient.project.count({ where });
	return { applications, count };
};

module.exports = {
	getByCaseReference,
	getAllApplications
};
