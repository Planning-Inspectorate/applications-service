const { Op } = require('sequelize');
const db = require('../models');
const { getRepresentations } = require('../repositories/representation.ni.repository');

const createQueryFilters = (query) => {
	// Pagination
	const pageNo = parseInt(query?.page) || 1;
	const defaultSize = 25;
	const maxSize = 100;
	const size = Math.min(parseInt(query?.size) || defaultSize, maxSize);

	return {
		pageNo,
		size,
		offset: size * (pageNo - 1),
		order: [['DateRrepReceived', 'ASC'], ['PersonalName']]
	};
};

const getRepresentationsForApplication = async (query) => {
	const { pageNo, size, offset, order } = createQueryFilters(query);

	const repositoryOptions = {
		offset,
		limit: size,
		order,
		type: query?.type,
		searchTerm: query?.searchTerm
	};

	const { count, representations } = getRepresentations(repositoryOptions);
	const typeFilters = await getFilters('RepFrom', query?.applicationId);

	return {
		representations,
		totalItems: count,
		itemsPerPage: size,
		totalPages: Math.ceil(Math.max(1, count) / size),
		currentPage: pageNo,
		filters: {
			typeFilters: typeFilters
				? typeFilters.map((f) => ({
						name: f.dataValues.RepFrom,
						count: f.dataValues.count
				  }))
				: []
		}
	};
};

const getRepresentationById = async (ID) => {
	return db.Representation.findOne({ where: { ID } });
};

const getFilters = async (filter, applicationId) => {
	let where = { CaseReference: applicationId };

	if (filter === 'RepFrom') {
		where = { CaseReference: applicationId, RepFrom: { [Op.ne]: null } };
	}

	return db.Representation.findAll({
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
