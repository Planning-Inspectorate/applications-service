const { StatusCodes } = require('http-status-codes');
const { fetchNIDocuments, fetchNIDocumentFilters } = require('../services/document.ni.service');
const {
	fetchBackOfficeDocuments,
	fetchBackOfficeDocumentFilters
} = require('../services/document.backoffice.service');

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

module.exports = {
	getNIDocuments,
	getBackOfficeDocuments
};
