const { mapBackOfficeDocuments } = require('./document.mapper');
const mapBackOfficeRepresentationToApi = (
	representation,
	represented,
	representative,
	documents
) => {
	let PersonalName = '';
	if (!represented.firstName && !represented.lastName) {
		PersonalName = represented.organisationName;
	} else {
		PersonalName = `${represented.firstName || ''} ${represented.lastName || ''}`.trim();
	}
	const Representative = `${representative.firstName || ''} ${
		representative.lastName || ''
	}`.trim();
	return {
		ID: representation.representationId,
		CaseReference: representation.caseReference,
		UniqueReference: representation.referenceId,
		PersonalName,
		Representative,
		OrgOnBhalfName: represented.organisationName,
		RepFrom: representation.representationType,
		RepresentationRedacted: representation.representationComment,
		DateRrepReceived: representation.dateReceived,
		Attachments: representation.attachmentIds,
		attachments: mapBackOfficeDocuments(documents)
	};
};

module.exports = {
	mapBackOfficeRepresentationToApi
};
