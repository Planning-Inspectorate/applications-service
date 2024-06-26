const { isBackOfficeCaseReference } = require('../utils/is-backoffice-case-reference');
const {
	getAllAdviceByCaseReference: getAllBackOfficeAdvice,
	getAdviceById: getBackOfficeAdviceById
} = require('../repositories/advice.backoffice.repository');
const {
	getAllAdviceByCaseReference: getAllNIAdvice,
	getAdviceById: getNIAdviceById
} = require('../repositories/advice.ni.repository');
const { getDocumentsByDataId } = require('../repositories/document.ni.repository');
const {
	mapBackOfficeAdviceListToApi,
	mapBackOfficeAdviceToApi,
	mapNIAdviceToApi
} = require('../utils/advice.mapper');
const { getDocumentsByIds } = require('../repositories/document.backoffice.repository');

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

const mapBackOfficeAdviceToApiWrapper = ({ count, advice }) => {
	return {
		count,
		advice: mapBackOfficeAdviceListToApi(advice)
	};
};
const getAllAdvice = async (query) => {
	const { caseReference, pageNo, size, offset, searchTerm } = createQueryFilters(query);

	const { advice, count } = isBackOfficeCaseReference(caseReference)
		? mapBackOfficeAdviceToApiWrapper(
				await getAllBackOfficeAdvice(caseReference, offset, size, searchTerm)
		  )
		: await getAllNIAdvice(caseReference, offset, size, searchTerm);

	return {
		advice: advice,
		totalItems: count,
		itemsPerPage: size,
		totalPages: Math.ceil(Math.max(1, count) / size),
		currentPage: pageNo
	};
};

const getAdviceById = async (adviceID, caseReference) => {
	if (isBackOfficeCaseReference(caseReference)) {
		const advice = await getBackOfficeAdviceById(adviceID);
		if (!advice) return;
		const attachments = await getDocumentsByIds(advice.attachmentIds);
		return mapBackOfficeAdviceToApi({
			...advice,
			attachments
		});
	} else {
		const advice = await getNIAdviceById(adviceID, caseReference);
		if (!advice) return;

		const attachments = await getDocumentsByDataId(advice.attachments?.split(','));
		return mapNIAdviceToApi({
			...advice,
			attachments
		});
	}
};

module.exports = {
	getAllAdvice,
	getAdviceById
};
