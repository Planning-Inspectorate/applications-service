const { Op } = require('sequelize');
const db = require('../models');
const {
	getRepresentationsWithCount: getRepresentationsWithCountNIRepository,
	getRepresentations: getRepresentationsNIRepository,
	getRepresentationById: getRepresentationByIdNIRepository
} = require('../repositories/representation.ni.repository');
const {
	getRepresentationById: getRepresentationByBORepository,
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
	mapBackOfficeRepresentationsToApi
} = require('../utils/representation.mapper');
const config = require('../lib/config');

const isBackOfficeCaseReference = (caseReference) =>
	(config.backOfficeIntegration.representations.getRepresentations.caseReferences || []).includes(
		caseReference
	);

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
	const queryFilters = createQueryFilters(query);
	return isBackOfficeCaseReference(query.caseReference)
		? getRepresentationsForBO(queryFilters)
		: getRepresentationsForNI(queryFilters);
};

const getRepresentationsForBO = async (queryFilters) => {
	const { pageNo, size, caseReference, searchTerm, type, offset } = queryFilters;

	const { representations, count } = await getRepresentationsBORepository({
		caseReference,
		offset,
		limit: size,
		type,
		searchTerm
	});

	const mappedRepresentations = mapBackOfficeRepresentationsToApi(representations);
	const typeFilters = await getBOFilters(caseReference);

	return {
		representations: mappedRepresentations,
		totalItems: count,
		itemsPerPage: size,
		totalPages: Math.ceil(Math.max(1, 0) / size),
		currentPage: pageNo,
		filters: { typeFilters }
	};
};
const getRepresentationsForNI = async (queryFilters) => {
	const { pageNo, size, caseReference, searchTerm, type, offset } = queryFilters;

	const { count, representations } = await getRepresentationsWithCountNIRepository({
		caseReference,
		offset,
		limit: size,
		type,
		searchTerm
	});
	const typeFilters = await getNIFilters('RepFrom', caseReference);
	return {
		representations,
		totalItems: count,
		itemsPerPage: size,
		totalPages: Math.ceil(Math.max(1, count) / size),
		currentPage: pageNo,
		filters: { typeFilters }
	};
};

const getRepresentationById = async (id, caseReference) => {
	if (isBackOfficeCaseReference(caseReference)) {
		const representation = await getRepresentationByBORepository(id);
		if (!representation) return;
		const documents = await getDocumentsByIdsBORepository(representation.attachmentIds);
		return mapBackOfficeRepresentationToApi(representation, documents);
	} else {
		const representation = await getRepresentationByIdNIRepository(id);
		if (!representation) return;
		const dataIDs = representation.Attachments ? representation.Attachments.split(',') : [];
		let attachments = await getDocumentsByDataIdNIRepository(dataIDs);
		if (attachments && attachments.length > 0) {
			attachments = attachments.map((att) => ({
				...att,
				path: att.path ? `${config.documentsHost}${att.path}` : null
			}));
		}
		representation.attachments = attachments;
		return representation;
	}
};

const getNIFilters = async (filter, caseReference) => {
	const filters = await getRepresentationsNIRepository({
		where: { CaseReference: caseReference, RepFrom: { [Op.ne]: null } },
		attributes: [filter, [db.sequelize.fn('COUNT', db.sequelize.col(filter)), 'count']],
		group: [filter]
	});
	return filters.map((filter) => ({
		name: filter.RepFrom,
		count: filter.count
	}));
};

module.exports = {
	getRepresentationsForApplication,
	getRepresentationById,
	getNIFilters
};
