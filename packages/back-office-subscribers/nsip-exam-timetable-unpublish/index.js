const { prismaClient } = require('../lib/prisma');
const axios = require('axios');

module.exports = async (context, message) => {
	const caseReference = message.caseReference;

	if (!caseReference) {
		throw new Error(`caseReference is required for nsip-exam-timetable-unpublish function`, {
			correlationId: message.correlationId
		});
	}

	context.log(`invoking nsip-exam-timetable-unpublish for caseReference: ${caseReference}`);

	// we use deleteMany to avoid the need to check if the timetable exists
	await prismaClient.examinationTimetable.deleteMany({
		where: {
			caseReference
		}
	});

	context.log(`unpublished ExaminationTimetable with caseReference: ${caseReference}`);
	context.log(`clearing ExaminationTimetable cache for caseRef ${caseReference}...`);

	const cacheKeyPattern = `cache:${caseReference}:timetables`;
	const url = `${process.env.APPLICATIONS_SERVICE_API_URL}/api/v1/cache/clear?pattern=${cacheKeyPattern}`;

	const { data: cacheClearResponse } = await axios.delete(url);

	context.log(JSON.stringify(cacheClearResponse, null, 2));
	context.log(`examinationTimetable cache cleared for caseRef ${caseReference}`);
};
