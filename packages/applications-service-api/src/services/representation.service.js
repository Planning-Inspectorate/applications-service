const {
	getRepresentationsWithCount: getRepresentationsWithCountNIRepository,
	getRepresentationById: getRepresentationByIdNIRepository,
	getFilters: getNIFilters
} = require('../repositories/representation.ni.repository');
const {
	getRepresentationByIdAndCaseRef: getRepresentationByBORepository,
	getRepresentations: getRepresentationsBORepository,
	getFilters: getBOFilters
} = require('../repositories/representation.backoffice.repository');
const {
	getDocumentsByDataId: getDocumentsByDataIdNIRepository
} = require('../repositories/document.ni.repository');
const {
	getDocumentsByIds: getDocumentsByIdsBORepository
} = require('../repositories/document.backoffice.repository');
const {
	mapBackOfficeRepresentationToApi,
	mapBackOfficeRepresentationsToApi,
	mapNIRepresentationToApi
} = require('../utils/representation.mapper');
const { isBackOfficeCaseReference } = require('../utils/is-backoffice-case-reference');
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
	const isBOApplication = isBackOfficeCaseReference(caseReference);
	const { representations, count } = isBOApplication
		? backOfficeMapWrapper(await getRepresentationsBORepository(options))
		: await getRepresentationsWithCountNIRepository(options);

	const typeFilters = isBOApplication
		? await getBOFilters(caseReference)
		: await getNIFilters('RepFrom', caseReference);

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
	const isBOApplication = isBackOfficeCaseReference(caseReference);
	const representation = isBOApplication
		? await getRepresentationByBORepository(id, caseReference)
		: await getRepresentationByIdNIRepository(id);
	if (!representation) return;
	const documents = isBOApplication
		? await getDocumentsByIdsBORepository(representation.attachmentIds)
		: await getDocumentsByDataIdNIRepository(representation.Attachments?.split(','));
	return isBOApplication
		? mapBackOfficeRepresentationToApi(representation, documents)
		: mapNIRepresentationToApi(representation, documents);
};

module.exports = {
	getRepresentationsForApplication,
	getRepresentationByIdAndCaseRef
};
