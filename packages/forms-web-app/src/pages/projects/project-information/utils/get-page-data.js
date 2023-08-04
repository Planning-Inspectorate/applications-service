const { formatProjectUpdate } = require('../../utils/format-project-update');
const { stripPrefixFromProposalType } = require('./strip-prefix-from-proposal-type');

const getLatestUpdate = (projectUpdates) =>
	Array.isArray(projectUpdates) && projectUpdates.length
		? formatProjectUpdate(projectUpdates[0])
		: null;

const getPageData = ({ proposal }, projectUpdates) => ({
	proposal: stripPrefixFromProposalType(proposal),
	latestUpdate: getLatestUpdate(projectUpdates)
});

module.exports = {
	getPageData
};
