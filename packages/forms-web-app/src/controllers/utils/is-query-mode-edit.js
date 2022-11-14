const isQueryModeEdit = (query) => {
	return query?.mode === 'edit';
};

module.exports = { isQueryModeEdit };
