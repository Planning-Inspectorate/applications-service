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

  map(data) {
    const {
      // eslint-disable-next-line camelcase
      caseref: case_ref,
      behalf,
      mename,
      mecounty: over18,
      memail: email,
      mephone: telephone,
      mebuild: line1,
      mestreet: line2,
      metown: line3,
      mecode: postcode,
      mecountry: country,
      therep,
    } = data;

    const personalData = {
      case_ref,
      behalf,
      'full-name': mename,
      'over-18': consts.over18[over18.toLowerCase()],
      address: {
        line1,
        line2,
        line3,
        postcode,
        country,
      },
      email,
      telephone,
    };
    let comments;
    try {
      comments = JSON.parse(therep);
    } catch (e) {
      comments = [{ topic: '', comment: therep }];
    }
    return {
      personal_data: { ...personalData },
      comments,
    };
  }

  getEmailingDetails(data) {
    return { email: data.memail, ipName: data.mename, ipRef: `${data.ID}` };
  }
};
