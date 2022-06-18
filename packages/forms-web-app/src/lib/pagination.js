/**
 * Derives pagination data from a given set of paginated results
 * @param paginatedResults paginated results returned from a Applications API call
 * @returns an object containing pagination data for the result set which includes the start and end range that is
 * represented by the current page of results
 */
const getPaginationData = (paginatedResults) => {
	const paginationData = {};
	paginationData.totalItems = paginatedResults.totalItems;
	paginationData.itemsPerPage = paginatedResults.itemsPerPage;
	paginationData.totalPages = paginatedResults.totalPages;
	paginationData.currentPage = parseInt(paginatedResults.currentPage, 10);
	paginationData.fromRange = paginatedResults.itemsPerPage * (paginatedResults.currentPage - 1) + 1;
	paginationData.toRange =
		paginationData.currentPage === paginatedResults.totalPages
			? paginatedResults.totalItems
			: paginatedResults.itemsPerPage * paginatedResults.currentPage;
	return paginationData;
};

/**
 * Calculates the page numbers which should be offered to users for a given amount of pages, taking into account
 * the current page of the user
 * @param currentPage current page of the user
 * @param totalPages total number of result pages available
 * @returns an array of page options to be displayed
 */
const calculatePageNumbers = (currentPage, totalPages) => {
	let delta = 1;
	if (currentPage === 1 || totalPages === currentPage) {
		delta = 2;
	}
	const range = Array(totalPages)
		.fill()
		.map((_, index) => index + 1);
	return range.reduce((pages, page) => {
		if (page === 1 || page === totalPages) {
			return [...pages, page];
		}
		if (page - delta <= currentPage && page + delta >= currentPage) {
			return [...pages, page];
		}
		if (pages[pages.length - 1] !== '...') {
			return [...pages, '...'];
		}

		return pages;
	}, []);
};

/**
 * Calculates the page options which should be offered to users for a given set of pagination data
 * @param paginationData
 * @returns an array of page options to be displayed
 */
const calculatePageOptions = (paginationData) => {
	let pageNumbers = calculatePageNumbers(paginationData.currentPage, paginationData.totalPages);
	if (paginationData.currentPage !== 1) {
		pageNumbers = ['prev', ...pageNumbers];
	}
	if (paginationData.currentPage !== paginationData.totalPages) {
		pageNumbers = [...pageNumbers, 'next'];
	}
	return pageNumbers;
};

module.exports = {
	calculatePageOptions,
	getPaginationData
};
