const { getPaginationData, calculatePageOptions } = require('../../../../lib/pagination');
const pagination = (response) => {
	const respData = response.data;
	const paginationData = getPaginationData(respData);
	const pageOptions = calculatePageOptions(paginationData);
	return {
		pageOptions,
		paginationData
	};
};

module.exports = {
	pagination
};
