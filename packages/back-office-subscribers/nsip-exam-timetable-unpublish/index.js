const { prismaClient } = require('../lib/prisma');

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
};
