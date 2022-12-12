const isTheFirstPage = (query) => parseInt(query.page) === 1 || !query || !query.page;

module.exports = {
	isTheFirstPage
};
