const { pinsContactDetails } = require('../../../../config');
const { getProcessGuideStages } = require('../../../process-guide/_utils/get-process-guide-stages');
const { formatProjectUpdate } = require('../../_utils/format-project-update');
const {
	getProjectsAllUpdatesURL
} = require('../../all-updates/_utils/get-projects-all-updates-url');
const { formatProcessGuideStages } = require('./format-process-guide-stages');
const { stripPrefixFromProposalType } = require('./strip-prefix-from-proposal-type');

const getLatestUpdate = (projectUpdates) =>
	Array.isArray(projectUpdates) && projectUpdates.length
		? formatProjectUpdate(projectUpdates[0])
		: null;

const getPageData = ({ caseRef, contactEmailAddress, proposal }, projectUpdates) => ({
	contactEmailAddress: contactEmailAddress || pinsContactDetails.enquiriesEmailAddress,
	proposal: stripPrefixFromProposalType(proposal),
	latestUpdate: getLatestUpdate(projectUpdates),
	processGuideStages: formatProcessGuideStages(getProcessGuideStages),
	projectsAllUpdatesURL: getProjectsAllUpdatesURL(caseRef)
});

module.exports = {
	getPageData
};
