const { StatusCodes } = require('http-status-codes');
const {
	fetchNIDocuments,
	fetchNIDocumentFilters,
	fetchNIDocumentsByType
} = require('../services/document.ni.service');
const {
	fetchBackOfficeDocuments,
	fetchBackOfficeDocumentFilters,
	fetchBackOfficeDocumentsByType
} = require('../services/document.backoffice.service');
const config = require('../lib/config');

const getBackOfficeDocuments = (req, res) =>
	getDocuments(req, res, fetchBackOfficeDocuments, fetchBackOfficeDocumentFilters);

const getNIDocuments = (req, res) =>
	getDocuments(req, res, fetchNIDocuments, fetchNIDocumentFilters);

const getDocuments = async (req, res, getDocumentsFn, getFiltersFn) => {
	const requestFilters = buildFilters(req);

	const [documents, availableFilters] = await Promise.all([
		getDocumentsFn(requestFilters),
		getFiltersFn(requestFilters.caseReference)
	]);

	const responseBody = {
		documents: documents.data,
		filters: availableFilters,
		totalItems: documents.count,
		itemsPerPage: requestFilters.itemsPerPage,
		totalPages: Math.ceil(Math.max(1, documents.count) / requestFilters.itemsPerPage),
		currentPage: requestFilters.page
	};

	return res.status(StatusCodes.OK).send(responseBody);
};

const buildFilters = (req) => ({
	caseReference: req.body.caseReference,
	page: req.body.page || 1,
	itemsPerPage: Math.min(req.body.size || 25, 100),
	filters: req.body.filters,
	searchTerm: req.body.searchTerm,
	datePublishedFrom: req.body.datePublishedFrom,
	datePublishedTo: req.body.datePublishedTo
});

const documentTypeDict = {
	RULE_6_LETTER: {
		bo: 'Rule 6 letter',
		ni: 'Rule 6 letter - Notification of the preliminary meeting and matters to be discussed'
	},
	RULE_8_LETTER: {
		bo: 'Rule 8 letter',
		ni: 'Rule 8 letter - notification of timetable for the examination'
	},
	EXAMINATION_LIBRARY: {
		bo: 'Examination library',
		ni: 'Examination library'
	},
	DECISION_LETTER_APPROVE: {
		bo: 'DCO decision letter (SoS)(approve)',
		ni: 'DCO decision letter (SoS)(approve)'
	},
	DECISION_LETTER_REFUSE: {
		bo: 'DCO decision letter (SoS)(refuse)',
		ni: 'DCO decision letter (SoS)(refuse)'
	}
};
const getDocumentByCaseReference = async (req, res) => {
	const backOfficeCaseReferences =
		config.backOfficeIntegration.documents.getDocuments.caseReferences || [];

	let response;
	const { caseReference } = req.params;
	let { type } = req.query;
	const capType = type.toUpperCase();

	if (backOfficeCaseReferences.includes(caseReference)) {
		response = await fetchBackOfficeDocumentsByType({
			caseReference,
			type: documentTypeDict[capType].bo
		});
	} else {
		response = await fetchNIDocumentsByType({
			caseReference,
			type: documentTypeDict[capType].ni
		});
	}

	if (!response.data)
		return res
			.status(StatusCodes.NOT_FOUND)
			.json({ message: `No document found for ${caseReference} with type ${type}` });

	return res.status(StatusCodes.OK).send({ ...response });
};

module.exports = {
	getNIDocuments,
	getBackOfficeDocuments,
	getDocumentByCaseReference
};
