const dayjs = require('dayjs');

const stripPrefixFromProposalType = (proposalType = '') => {
	//regex: At the start of the string, find 2 word characters, followed by 2 number characters, followed by space, '-' and space
	//Matches 'EN01 - '
	const prefixPattern = /^\w{2}\d{2}\s-\s/;
	return proposalType.replace(prefixPattern, '');
};

const formatDate = (date, format = 'D MMMM YYYY') => {
	return dayjs(date).format(format);
};

const getLatestUpdate = (latestUpdates) => {
	if (Array.isArray(latestUpdates) && latestUpdates.length) {
		const latestUpdate = latestUpdates[0];
		return { ...latestUpdate, updateDate: formatDate(latestUpdate.updateDate) };
	} else {
		return null;
	}
};

const getPageData = ({ proposal }, latestUpdates) => ({
	proposal: stripPrefixFromProposalType(proposal),
	latestUpdate: getLatestUpdate(latestUpdates)
});

module.exports = {
	stripPrefixFromProposalType,
	getPageData,
	getLatestUpdate
};
