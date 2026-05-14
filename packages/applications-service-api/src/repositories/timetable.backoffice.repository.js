const { Prisma } = require('../../prisma/client/client.js');
const { prismaClient } = require('../lib/prisma');
const config = require('../lib/config');

const getTimetablesByCaseReference = async (caseRef) =>
	prismaClient.examinationTimetable.findMany({
		where: {
			caseReference: caseRef
		},
		orderBy: {
			date: Prisma.SortOrder.asc
		},
		take: config.timetableItemsPerPage,
		include: {
			eventLineItems: true
		}
	});

module.exports = {
	getTimetablesByCaseReference
};
