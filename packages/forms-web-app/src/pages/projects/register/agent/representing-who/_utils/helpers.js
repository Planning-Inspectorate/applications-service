const { registerAgentRepresentingWhoOptions } = require('../config');

registerAgentRepresentingWhoOptions;

const isRepresentingWho = (representingWho) => ({
	family: representingWho === registerAgentRepresentingWhoOptions.family,
	person: representingWho === registerAgentRepresentingWhoOptions.person,
	organisation: representingWho === registerAgentRepresentingWhoOptions.organisation
});

module.exports = { isRepresentingWho };
