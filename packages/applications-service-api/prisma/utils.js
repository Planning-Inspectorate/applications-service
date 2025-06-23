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
	await prismaClient.project.create({
		data: {
			...projectData,
			applicant: {
				create: {
					...applicantData,
					serviceUserId: applicantId
				}
			}
		}
	});
	await prismaClient.serviceUser.upsert({
		where: { serviceUserId: applicantId },
		update: {},
		create: {
			serviceUserId: applicantId,
			...applicantData
		}
	});
}

async function createRepresentationWithServiceUsers(data) {
	const { represented, representative, ...representationData } = data;
	await prismaClient.representation.create({
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
					caseReference: data.caseReference
				}
			}
		}
	});
}

module.exports = {
	createExaminationTimetableWithEventItems,
	createRepresentationWithServiceUsers,
	createProjectWithServiceUsers
};
