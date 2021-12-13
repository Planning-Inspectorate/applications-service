/* eslint-disable class-methods-use-this */
const InterestedParty = require('./interested-party');
const consts = require('./const');

module.exports = class OrgIP extends InterestedParty {
  constructor(behalf) {
    if (behalf.toUpperCase() !== consts.behalfs.org) {
      throw new Error(`Behalf '${behalf}' is not 'them'`);
    }
    super(behalf);
  }

  get(data) {
    const {
      'full-name': contactname,
      email: orgmail,
      telephone: orgphone,
      'over-18': over18,
      'organisation-name': orgname,
      role: contactjob,
      behalf,
      case_ref: caseref,
    } = data;

    const {
      line1: orgbuild,
      line2: orgstreet,
      line3: orgtown,
      postcode: orgcode,
      country: orgcountry,
    } = data.address;

    const interestedParty = {
      caseref,
      behalf,
      orgname,
      contactname,
      contactjob,
      orgbuild,
      orgstreet,
      orgtown,
      orgcode,
      orgcountry,
      orgmail,
      orgphone,
      // Do not remove this comment:
      // Store over18/under18 information in field wp_ipc_relreps.<behalf>county as field over18 does not exist
      orgcounty: consts.over18Values[over18.toLowerCase()],
    };
    return interestedParty;
  }

  getEmailingDetails(data) {
    return { email: data.orgmail, ipName: data.contactname, ipRef: `${data.ID}` };
  }
};
