const pick = require('lodash.pick');

module.exports = async (context, message) => {
	context.log(`invoking nsip-document function with message: ${JSON.stringify(message)}`);

	const document = pick(message, [
		'documentId',
		'caseId',
		'caseRef',
		'documentReference',
		'version',
		'examinationRefNo',
		'filename',
		'originalFilename',
		'size',
		'mime',
		'documentURI',
		'publishedDocumentURI',
		'virusCheckStatus',
		'fileMD5',
		'dateCreated',
		'lastModified',
		'caseType',
		'documentStatus',
		'redactedStatus',
		'publishedStatus',
		'datePublished',
		'documentType',
		'securityClassification',
		'sourceSystem',
		'origin',
		'owner',
		'author',
		'representative',
		'description',
		'stage',
		'filter1',
		'filter2'
	]);

	context.bindings.document = {
		...document,
		modifiedAt: new Date()
	};
};
