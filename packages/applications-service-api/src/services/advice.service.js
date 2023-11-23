const config = require('../lib/config');
const {
	getAllAdviceByCaseReference: getAllBackOfficeAdvice,
	getAdviceById: getBackOfficeAdviceById
} = require('../repositories/advice.backoffice.repository');
const {
	getAllAdviceByCaseReference: getAllNIAdvice,
	getAdviceById: getNIAdviceById
} = require('../repositories/advice.ni.repository');
const {
	mapBackOfficeAdviceListToApi,
	mapBackOfficeAdviceToApi,
	mapNIAdviceToApi
} = require('../utils/advice.mapper');
const db = require('../models');
const { getDocumentsByIds } = require('../repositories/document.backoffice.repository');
const isBackOfficeCaseReference = (caseReference) =>
	(config.backOfficeIntegration.advice.getAdvice.caseReferences || []).includes(caseReference);

const createQueryFilters = (query) => {
	const caseReference = query.caseRef;
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
		if (!advice) return undefined;
		const attachments = await getDocumentsByIds(advice.attachmentIds);
		return mapBackOfficeAdviceToApi({
			...advice,
			attachments
		});
	} else {
		const advice = await getNIAdviceById(adviceID, caseReference);
		if (!advice) return undefined;
		const attachments = await db.Attachment.findAllAttachmentsWithCase(caseReference);
		return mapNIAdviceToApi({
			...advice,
			attachments: attachments.map(({ dataValues }) => dataValues)
		});
	}
};

module.exports = {
	getAllAdvice,
	getAdviceById
};
