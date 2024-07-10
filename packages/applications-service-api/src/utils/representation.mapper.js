const { mapDocuments } = require('./document.mapper');
const mapRepresentationToApi = (representation, documents = []) => {
	return {
		...mapCommonRepresentationToApi(representation),
		attachments: mapDocuments(documents)
	};
};

const mapRepresentationsToApi = (representation) => {
	return representation.map((representation) => mapCommonRepresentationToApi(representation));
};

const mapCommonRepresentationToApi = (representation) => {
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
	mapRepresentationToApi,
	mapRepresentationsToApi,
	repFromToWelsh
};
