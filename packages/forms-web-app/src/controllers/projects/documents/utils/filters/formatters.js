const formatTitle = (filter) => `${filter.name} ${filter.value}`;

const formatName = (filter) => `${filter.name}-${filter.value}`;

const formatNameWithCount = (name, count) => `${name} (${count})`;

module.exports = {
	formatName,
	formatTitle,
	formatNameWithCount
};
