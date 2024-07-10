const {
	getRepresentationById: getRepresentationByIdRepository,
	getRepresentations: getRepresentationsRepository,
	getFilters
} = require('../repositories/representation.repository');
const {
	getDocumentsByIds: getDocumentsByIdsBORepository
} = require('../repositories/document.repository');
const {
	mapRepresentationToApi,
	mapRepresentationsToApi
} = require('../utils/representation.mapper');
const createQueryFilters = (query) => {
	const pageNo = parseInt(query?.page) || 1;
	const defaultSize = 25;
	const maxSize = 100;
	const size = Math.min(parseInt(query?.size) || defaultSize, maxSize);

	return {
		pageNo,
		size,
		offset: size * (pageNo - 1),
		caseReference: query.caseReference,
		searchTerm: query.searchTerm,
		type: query.type
	};
};

const getRepresentationsForApplication = async (query) => {
	const { pageNo, size, caseReference, searchTerm, type, offset } = createQueryFilters(query);
	const options = {
		caseReference,
		offset,
		limit: size,
		type,
		searchTerm
	};
	const { representations, count } = await getRepresentationsRepository(options);

	const typeFilters = await getFilters(caseReference);

	return {
		representations: mapRepresentationsToApi(representations),
		totalItems: count,
		itemsPerPage: size,
		totalPages: Math.ceil(Math.max(1, count) / size),
		currentPage: pageNo,
		filters: { typeFilters }
	};
};

const getRepresentationById = async (id) => {
	const representation = await getRepresentationByIdRepository(id);
	if (!representation) return;
	const documents = await getDocumentsByIdsBORepository(representation.attachmentIds);
	return mapRepresentationToApi(representation, documents);
};

module.exports = {
	getRepresentationsForApplication,
	getRepresentationById
};
