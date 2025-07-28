const { pinsContactDetails } = require('../../../../config');
const {
	getMaterialChangeProcessGuideStages
} = require('../../../process-guide/_utils/get-material-change-process-guide-stages');
const { getProcessGuideStages } = require('../../../process-guide/_utils/get-process-guide-stages');
const { formatProjectUpdate } = require('../../_utils/format-project-update');
const {
	getProjectsAllUpdatesURL
} = require('../../all-updates/_utils/get-projects-all-updates-url');
const { formatProcessGuideStages } = require('./format-process-guide-stages');
const { getProposal } = require('./get-proposal');

const getLatestUpdate = (projectUpdates, lang = 'en') =>
	Array.isArray(projectUpdates) && projectUpdates.length
		? formatProjectUpdate(projectUpdates[0], lang)
		: null;

const getPageData = (
	i18n,
	{ caseRef, contactEmailAddress, isMaterialChange, proposal },
	projectUpdates
) => ({
	contactEmailAddress: contactEmailAddress || pinsContactDetails.enquiriesEmailAddress,
	proposal: getProposal(i18n, proposal),
	latestUpdate: getLatestUpdate(projectUpdates, i18n.language),
	processGuideStages: formatProcessGuideStages(
		isMaterialChange ? getMaterialChangeProcessGuideStages(i18n) : getProcessGuideStages(i18n)
	),
	projectsAllUpdatesURL: getProjectsAllUpdatesURL(caseRef)
});

module.exports = {
	getPageData
};
