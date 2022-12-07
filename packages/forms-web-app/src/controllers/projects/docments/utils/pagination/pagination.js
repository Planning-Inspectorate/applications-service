const { getPaginationData, calculatePageOptions } = require('../../../../../lib/pagination');
const getPagination = (data) => {
	const paginationData = getPaginationData(data);
	const pageOptions = calculatePageOptions(paginationData);
	return {
		pageOptions,
		paginationData
	};
};

module.exports = {
	getPagination
};
