const config = require('../lib/config');
const db = require('../models');
const {
	getAllAdviceByCaseReference: getAllBackOfficeAdvice
} = require('../repositories/advice.backoffice.repository');
const {
	getAllAdviceByCaseReference: getAllNIAdvice
} = require('../repositories/advice.ni.repository');
const { mapBackOfficeAdviceToApi } = require('../utils/advice.mapper');

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

const gg = ({ count, advice }) => {
	return {
		count,
		advice: mapBackOfficeAdviceToApi(advice)
	};
};
const getAllAdvice = async (query) => {
	const { caseReference, pageNo, size, offset, searchTerm } = createQueryFilters(query);

	const { advice, count } = isBackOfficeCaseReference(caseReference)
		? gg(await getAllBackOfficeAdvice(caseReference, offset, size, searchTerm))
		: await getAllNIAdvice(caseReference, offset, size, searchTerm);

	return {
		advice: advice,
		totalItems: count,
		itemsPerPage: size,
		totalPages: Math.ceil(Math.max(1, count) / size),
		currentPage: pageNo
	};
};

const getAdviceById = async (adviceID) => {
	const advice = await db.Advice.findOne({
		where: {
			adviceID
		}
	});

	if (!advice) return undefined;

	const attachments = await db.Attachment.findAllAttachmentsWithCase(advice.caseReference, {
		where: {
			adviceID
		}
	});

	const adviceDTO = advice.get({
		plain: true
	});

	adviceDTO.attachments = attachments.map((attachment) => {
		// eslint-disable-next-line no-unused-vars
		const { adviceID, ...dto } = attachment.get({
			plain: true
		});
		return dto;
	});

	return adviceDTO;
};

module.exports = {
	getAllAdvice,
	getAdviceById
};
