const formatTitle = (filter) => {
	return `${filter.name} ${filter.value}`;
};

const formatName = (filter) => {
	return `${filter.name}-${filter.value}`;
};

const formatNameWithCount = (name, count) => {
	return `${name} (${count})`;
};

module.exports = {
	formatName,
	formatTitle,
	formatNameWithCount
};
