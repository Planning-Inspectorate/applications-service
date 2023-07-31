const stripPrefixFromProposalType = (proposalType = '') => {
	//regex: At the start of the string, find 2 word characters, followed by 2 number characters, followed by space, '-' and space
	//Matches 'EN01 - '
	const prefixPattern = /^\w{2}\d{2}\s-\s/;
	return proposalType.replace(prefixPattern, '');
};

const getPageData = ({ projectName, summary, webAddress, proposal }) => ({
	pageHeading: `Project Information`,
	pageTitle: `${projectName} - Project Information`,
	proposal: stripPrefixFromProposalType(proposal),
	summary,
	webAddress
});

module.exports = {
	stripPrefixFromProposalType,
	getPageData
};
