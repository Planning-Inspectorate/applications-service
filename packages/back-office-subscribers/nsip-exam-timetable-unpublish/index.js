const { prismaClient } = require('../lib/prisma');

module.exports = async (context, message) => {
	context.log(`invoking nsip-exam-timetable-unpublish`);
	const caseReference = message.caseReference;

	if (!caseReference) {
		throw new Error('caseReference is required');
	}

	// we use deleteMany to avoid the need to check if the project exists
	await prismaClient.examinationTimetable.deleteMany({
		where: {
			caseReference
		}
	});

	context.log(`unpublished ExaminationTimetable with caseReference: ${caseReference}`);
};
