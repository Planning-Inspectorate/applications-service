const { Op } = require('sequelize');
const db = require('../models');
const {
	getRepresentationsWithCount: getRepresentationsWithCountNIRepository,
	getRepresentations: getRepresentationsNIRepository,
	getRepresentationById: getRepresentationByIdNIRepository
} = require('../repositories/representation.ni.repository');
const {
	getRepresentationById: getRepresentationByBORepository,
	getRepresentationsByCaseReference: getRepresentationsByCaseReferenceBORepository
} = require('../repositories/representation.backoffice.repository');
const {
	getDocumentsByDataId: getDocumentsByDataIdNIRepository
} = require('../repositories/document.ni.repository');
const {
	getServiceUserById: getServiceUserByIdBORepository
} = require('../repositories/serviceUser.backoffice.repository');
const {
	getDocumentsByIds: getDocumentsByIdsBORepository
} = require('../repositories/document.backoffice.repository');
const {
	mapBackOfficeRepresentationToApi,
	mapBackOfficeRepresentationsToApi
} = require('../utils/representation.mapper');
const config = require('../lib/config');
const apiError = require('../error/apiError');

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

	const { representations, count } = await getRepresentationsByCaseReferenceBORepository({
		caseReference,
		offset,
		limit: size,
		type,
		searchTerm
	});
	const representationsData = await Promise.all(
		representations.map(async (representation) => {
			const represented = await getServiceUserByIdBORepository(representation.representedId);
			if (!represented) return;
			const representative = await getServiceUserByIdBORepository(representation.representativeId);
			return { representation, represented, representative };
		})
	);
	const representationsDataWithRepresented = representationsData.filter((r) => r?.represented);

	const mappedRepresentations = mapBackOfficeRepresentationsToApi(
		representationsDataWithRepresented
	);

	// TODO PAGINATION AND FILTERS WIP
	return {
		representations: mappedRepresentations,
		totalItems: count,
		itemsPerPage: size,
		totalPages: Math.ceil(Math.max(1, 0) / size),
		currentPage: pageNo,
		filters: { typeFilters: [] }
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
	const typeFilters = await getFilters('RepFrom', caseReference);
	return {
		representations,
		totalItems: count,
		itemsPerPage: size,
		totalPages: Math.ceil(Math.max(1, count) / size),
		currentPage: pageNo,
		filters: {
			typeFilters: typeFilters
				? typeFilters.map((filter) => ({
						name: filter.RepFrom,
						count: filter.count
				  }))
				: []
		}
	};
};

const getRepresentationById = async (id, caseReference) => {
	if (isBackOfficeCaseReference(caseReference)) {
		const representation = await getRepresentationByBORepository(id);
		if (!representation) return;
		const represented = await getServiceUserByIdBORepository(representation.representedId);
		if (!represented) {
			throw apiError.notFound(
				`Service user not found for representation ${representation.representedId}`
			);
		}
		const representative = await getServiceUserByIdBORepository(representation.representativeId);
		const documents = await getDocumentsByIdsBORepository(representation.attachmentIds);
		return mapBackOfficeRepresentationToApi(representation, represented, representative, documents);
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

const getFilters = async (filter, applicationId) => {
	let where = { CaseReference: applicationId };

	if (filter === 'RepFrom') {
		where = { CaseReference: applicationId, RepFrom: { [Op.ne]: null } };
	}

	return getRepresentationsNIRepository({
		where,
		attributes: [filter, [db.sequelize.fn('COUNT', db.sequelize.col(filter)), 'count']],
		group: [filter]
	});
};

module.exports = {
	getRepresentationsForApplication,
	getRepresentationById,
	getFilters
};
