const {
	getRepresentationByIdAndCaseRef: getRepresentationByBORepository,
	getRepresentations: getRepresentationsBORepository,
	getFilters: getBOFilters
} = require('../repositories/representation.backoffice.repository');
const {
	getDocumentsByIds: getDocumentsByIdsBORepository
} = require('../repositories/document.backoffice.repository');
const {
	mapBackOfficeRepresentationToApi,
	mapBackOfficeRepresentationsToApi
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

const backOfficeMapWrapper = ({ representations, count }) => {
	return {
		representations: mapBackOfficeRepresentationsToApi(representations),
		count
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
	const { representations, count } = backOfficeMapWrapper(
		await getRepresentationsBORepository(options)
	);

	const typeFilters = await getBOFilters(caseReference);

	return {
		representations,
		totalItems: count,
		itemsPerPage: size,
		totalPages: Math.ceil(Math.max(1, count) / size),
		currentPage: pageNo,
		filters: { typeFilters }
	};
};

const getRepresentationByIdAndCaseRef = async (id, caseReference) => {
	const representation = await getRepresentationByBORepository(id, caseReference);
	if (!representation) return;
	const documents = await getDocumentsByIdsBORepository(representation.attachmentIds);
	return mapBackOfficeRepresentationToApi(representation, documents);
};

module.exports = {
	getRepresentationsForApplication,
	getRepresentationByIdAndCaseRef
};
