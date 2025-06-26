const { prismaClient } = require('../src/lib/prisma');

async function createExaminationTimetableWithEventItems(data) {
	await prismaClient.examinationTimetable.create({
		data: {
			caseReference: data.caseReference,
			eventId: data.eventId,
			type: data.type,
			eventTitle: data.eventTitle,
			description: data.description,
			eventDeadlineStartDate: new Date(data.eventDeadlineStartDate),
			date: new Date(data.date),
			eventLineItems: {
				create: data.eventItemDescriptions.map((description) => ({
					eventLineItemDescription: description
				}))
			}
		}
	});
}

async function createProjectWithServiceUsers(data) {
	const { applicant, ...projectData } = data;
	const { applicantId, ...applicantData } = applicant;

	await prismaClient.$transaction(async (tx) => {
		await tx.serviceUser.upsert({
			where: { serviceUserId: applicantId },
			update: {
				...applicantData
			},
			create: {
				serviceUserId: applicantId,
				...applicantData
			}
		});

		await tx.project.create({
			data: {
				...projectData,
				applicant: {
					create: {
						serviceUserId: applicantId,
						...applicantData
					}
				}
			}
		});
	});
}

async function createRepresentationWithServiceUsers(data) {
	const { represented, representative, ...representationData } = data;

	await prismaClient.$transaction(async (tx) => {
		await tx.serviceUser.upsert({
			where: { serviceUserId: represented.representedId },
			update: {
				firstName: represented.firstName,
				lastName: represented.lastName,
				organisationName: represented.organisationName,
				caseReference: representationData.caseReference
			},
			create: {
				serviceUserId: represented.representedId,
				firstName: represented.firstName,
				lastName: represented.lastName,
				organisationName: represented.organisationName,
				caseReference: representationData.caseReference
			}
		});

		await tx.serviceUser.upsert({
			where: { serviceUserId: representative.representativeId },
			update: {
				firstName: representative.firstName,
				lastName: representative.lastName,
				organisationName: representative.organisationName,
				caseReference: representationData.caseReference
			},
			create: {
				serviceUserId: representative.representativeId,
				firstName: representative.firstName,
				lastName: representative.lastName,
				organisationName: representative.organisationName,
				caseReference: representationData.caseReference
			}
		});

		await tx.representation.create({
			data: {
				...representationData,
				represented: {
					create: {
						serviceUserId: represented.representedId,
						firstName: represented.firstName,
						lastName: represented.lastName,
						organisationName: represented.organisationName,
						caseReference: representationData.caseReference
					}
				},
				representative: {
					create: {
						serviceUserId: representative.representativeId,
						firstName: representative.firstName,
						lastName: representative.lastName,
						organisationName: representative.organisationName,
						caseReference: representationData.caseReference
					}
				}
			}
		});
	});
}

module.exports = {
	createRepresentationWithServiceUsers,
	createExaminationTimetableWithEventItems,
	createProjectWithServiceUsers
};
