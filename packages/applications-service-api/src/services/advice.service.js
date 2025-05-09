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

	const allowedSortFieldsWithDirection = ['adviceDate'].flatMap((field) => [
		field,
		`+${field}`,
		`-${field}`
	]);

	const defaultSort = '+adviceDate';
	const sort = allowedSortFieldsWithDirection.includes(query?.sort) ? query?.sort : defaultSort;
	const sortDirection = sort?.startsWith('-') ? 'desc' : 'asc';
	const sortFieldName = sort?.replace(/^[+-]/, '');

	const orderBy = [{ [sortFieldName]: sortDirection }, { adviceId: 'asc' }];

	return { pageNo, size, offset, searchTerm, caseReference, orderBy };
};

const mapBackOfficeAdviceToApiWrapper = ({ count, advice }) => {
	return {
		count,
		advice: mapBackOfficeAdviceListToApi(advice)
	};
};
const getAllAdvice = async (query) => {
	const { caseReference, pageNo, size, offset, searchTerm, orderBy } = createQueryFilters(query);

	const { advice, count } = isBackOfficeCaseReference(caseReference)
		? mapBackOfficeAdviceToApiWrapper(
				await getAllBackOfficeAdvice(caseReference, offset, size, searchTerm, orderBy)
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
