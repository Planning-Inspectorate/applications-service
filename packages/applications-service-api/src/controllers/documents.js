const { StatusCodes } = require('http-status-codes');
const {
	fetchDocuments,
	fetchDocumentsByType,
	fetchDocumentFilters,
	fetchDocumentByDocRef
} = require('../services/document.service');

const getDocuments = async (req, res) => {
	const { body } = req;
	const { isMaterialChange } = body;

	const requestFilters = buildFilters(req);

	const [documents, availableFilters] = await Promise.all([
		fetchDocuments(requestFilters, isMaterialChange),
		fetchDocumentFilters(requestFilters.caseReference, isMaterialChange)
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

	const { data } = await fetchDocumentsByType({
		caseReference,
		type
	});
	response = data;

	if (!response)
		return res
			.status(StatusCodes.NOT_FOUND)
			.json({ message: `No document found for ${caseReference} with type ${type}` });

	return res.status(StatusCodes.OK).send(response);
};

const getDocumentLinkByDocumentReference = async (req, res) => {
	const { docRef } = req.params;
	const [document] = await fetchDocumentByDocRef(docRef);

	if (!document || !document.path) {
		return res.status(StatusCodes.NOT_FOUND).send('Document not found');
	}

	res.status(StatusCodes.OK).json({ path: document.path });
};

module.exports = {
	getDocuments,
	getDocumentByCaseReference,
	getDocumentLinkByDocumentReference
};
