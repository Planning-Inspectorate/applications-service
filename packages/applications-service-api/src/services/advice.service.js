const {
	getAllAdviceByCaseReference: getAllAdviceByCaseReferenceRepository,
	getAdviceById: getAdviceByIdRepository
} = require('../repositories/advice.repository');
const { mapAdviceListToApi, mapAdviceToApi } = require('../utils/advice.mapper');
const { getDocumentsByIds } = require('../repositories/document.repository');

const createQueryFilters = (query) => {
	const caseReference = query.caseReference;
	const pageNo = parseInt(query?.page) || 1;
	const defaultSize = 25;
	const maxSize = 100;
	const size = Math.min(parseInt(query?.size) || defaultSize, maxSize);
	const offset = (pageNo - 1) * size;
	const searchTerm = query?.searchTerm;

	return { pageNo, size, offset, searchTerm, caseReference };
};

const getAllAdvice = async (query) => {
	const { caseReference, pageNo, size, offset, searchTerm } = createQueryFilters(query);

	const { advice, count } = await getAllAdviceByCaseReferenceRepository(
		caseReference,
		offset,
		size,
		searchTerm
	);

	return {
		advice: mapAdviceListToApi(advice),
		totalItems: count,
		itemsPerPage: size,
		totalPages: Math.ceil(Math.max(1, count) / size),
		currentPage: pageNo
	};
};

const getAdviceById = async (adviceID) => {
	const advice = await getAdviceByIdRepository(adviceID);
	if (!advice) return;
	const attachments = await getDocumentsByIds(advice.attachmentIds);
	return mapAdviceToApi({
		...advice,
		attachments
	});
};

module.exports = {
	getAllAdvice,
	getAdviceById
};
