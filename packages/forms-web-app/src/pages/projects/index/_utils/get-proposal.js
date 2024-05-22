const { projectsIndexI18nNamespace } = require('../config');

const getProposalID = (proposal) => proposal.split(' - ')[0];

const getProposal = (i18n, proposal = '') =>
	i18n.t(`${projectsIndexI18nNamespace}.subsectors.${getProposalID(proposal)}`);

module.exports = { getProposal };
