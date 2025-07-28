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
	if (represented.organisationName) {
		PersonalName = represented.organisationName;
	} else {
		PersonalName = `${represented.firstName || ''} ${represented.lastName || ''}`.trim();
	}

	let Representative = '';
	if (representative?.organisationName) {
		Representative = representative.organisationName;
	} else {
		Representative = `${representative?.firstName || ''} ${representative?.lastName || ''}`.trim();
	}

	return {
		ID: representation.representationId,
		CaseReference: representation.caseReference,
		UniqueReference: representation.referenceId,
		PersonalName,
		Representative,
		OrgOnBhalfName: represented.organisationName,
		RepFrom: representation.representationType,
		RepFromWelsh: repFromToWelsh(representation.representationType),
		RepresentationRedacted: representation.representationComment,
		DateRrepReceived: representation.dateReceived,
		Attachments: representation.attachmentIds
	};
};

const repFromToWelsh = (englishDesc = '') => {
	const repFromWelshDictionary = {
		'local authorities': 'Awdurdod Lleol',
		'members of the public/businesses': "Aelodau'r Cyhoedd/Busnesau",
		'non-statutory organisations': 'Sefydliadau Anstatudol',
		'other statutory consultees': 'Ymgyngoreion Statudol Eraill',
		'parish councils': 'Cyngor Plwyf'
	};
	const englishDescLower = englishDesc?.toLowerCase();
	return repFromWelshDictionary[englishDescLower];
};

module.exports = {
	mapBackOfficeRepresentationToApi,
	mapBackOfficeRepresentationsToApi,
	mapNIRepresentationToApi,
	repFromToWelsh
};
