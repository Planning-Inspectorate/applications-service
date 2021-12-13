/* eslint-disable class-methods-use-this */
const InterestedParty = require('./interested-party');
const consts = require('./const');

module.exports = class OwnIP extends InterestedParty {
  constructor(behalf) {
    if (behalf.toUpperCase() !== consts.behalfs.own) {
      throw new Error(`Behalf '${behalf}' is not 'me'`);
    }
    super(behalf);
  }

  get(data) {
    const {
      'full-name': mename,
      email: memail,
      telephone: mephone,
      'over-18': over18,
      behalf,
      case_ref: caseref,
    } = data;

    const {
      line1: mebuild,
      line2: mestreet,
      line3: metown,
      postcode: mecode,
      country: mecountry,
    } = data.address;

    const interestedParty = {
      caseref,
      behalf,
      mename,
      memail,
      mephone,
      mebuild,
      mestreet,
      metown,
      mecode,
      mecountry,
      // Do not remove this comment:
      // Store over18/under18 information in field wp_ipc_relreps.<behalf>county as field over18 does not exist
      mecounty: consts.over18Values[over18.toLowerCase()],
    };
    return interestedParty;
  }

  getEmailingDetails(data) {
    return { email: data.memail, ipName: data.mename, ipRef: `${data.ID}` };
  }
};
