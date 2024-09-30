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
const { isBackOfficeCaseReference } = require('../utils/is-backoffice-case-reference');

const getBackOfficeDocuments = (req, res) =>
	getDocuments(req, res, fetchBackOfficeDocuments, fetchBackOfficeDocumentFilters);

const getNIDocuments = (req, res) =>
	getDocuments(req, res, fetchNIDocuments, fetchNIDocumentFilters);

const getDocuments = async (req, res, getDocumentsFn, getFiltersFn) => {
	const { body } = req;
	const { isMaterialChange } = body;

	const requestFilters = buildFilters(req);

	const [documents, availableFilters] = await Promise.all([
		getDocumentsFn(requestFilters, isMaterialChange),
		getFiltersFn(requestFilters.caseReference, isMaterialChange)
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

const getDocumentByCaseReference = async (req, res) => {
	let response;
	const { caseReference } = req.params;
	let { type } = req.query;

	if (isBackOfficeCaseReference(caseReference)) {
		const { data } = await fetchBackOfficeDocumentsByType({
			caseReference,
			type
		});

		response = data;
	} else {
		const { data } = await fetchNIDocumentsByType({
			caseReference,
			type
		});
		response = data;
	}

	if (!response)
		return res
			.status(StatusCodes.NOT_FOUND)
			.json({ message: `No document found for ${caseReference} with type ${type}` });

	return res.status(StatusCodes.OK).send(response);
};

module.exports = {
	getNIDocuments,
	getBackOfficeDocuments,
	getDocumentByCaseReference
};
