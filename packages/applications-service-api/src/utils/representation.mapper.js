const { mapBackOfficeDocuments } = require('./document.mapper');
const config = require('../lib/config');
const mapBackOfficeRepresentationToApi = (representation, documents = []) => {
	return {
		...mapCommonRepresentationBOFieldsToApi(representation),
		attachments: mapBackOfficeDocuments(documents)
	};
};

const mapNIRepresentationToApi = (representation, documents = []) => {
	return {
		...representation,
		attachments: documents.map((doc) => ({
			...doc,
			path: doc.path ? `${config.documentsHost}${doc.path}` : null
		}))
	};
};

const mapBackOfficeRepresentationsToApi = (representation) => {
	return representation.map((representation) =>
		mapCommonRepresentationBOFieldsToApi(representation)
	);
};

const mapCommonRepresentationBOFieldsToApi = (representation) => {
	const represented = representation?.represented;
	const representative = representation?.representative;
	let PersonalName = '';
	if (!represented.firstName && !represented.lastName) {
		PersonalName = represented.organisationName;
	} else {
		PersonalName = `${represented.firstName || ''} ${represented.lastName || ''}`.trim();
	}
	const Representative = `${representative?.firstName || ''} ${
		representative?.lastName || ''
	}`.trim();
	return {
		ID: representation.representationId,
		CaseReference: representation.caseReference,
		UniqueReference: representation.referenceId,
		PersonalName,
		Representative,
		OrgOnBhalfName: represented.organisationName,
		RepFrom: representation.representationType,
		repFromWelsh: repFromWelshDictionary[representation.representationType],
		RepresentationRedacted: representation.representationComment,
		DateRrepReceived: representation.dateReceived,
		Attachments: representation.attachmentIds
	};
};

const repFromWelshDictionary = {
	'Local Authorities': 'Awdurdodau Lleol',
	'Members of the public/businesses': "Aelodau'r Cyhoedd/Busnesau",
	'Non-statutory organisations': 'Sefydliadau Anstatudol',
	'Other statutory consultees': 'Ymgyngoreion Statudol Eraill',
	'Parish councils': 'Cyngorau Plwyf'
};

module.exports = {
	mapBackOfficeRepresentationToApi,
	mapBackOfficeRepresentationsToApi,
	mapNIRepresentationToApi,
	repFromWelshDictionary
};
