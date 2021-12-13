const OwnIP = require('./interested-party-own');
const OrgIP = require('./interested-party-organisation');
const AgentIP = require('./interested-party-agent');

const consts = require('./const');

module.exports.createIP = (behalf) => {
  switch (behalf.toUpperCase()) {
    case consts.behalfs.own: {
      return new OwnIP(behalf);
    }
    case consts.behalfs.org: {
      return new OrgIP(behalf);
    }
    case consts.behalfs.agent: {
      return new AgentIP(behalf);
    }
    default: {
      throw new Error('Unsupported interested type behalf');
    }
  }
};
