/* eslint-disable class-methods-use-this */
const InterestedParty = require('./interested-party');
const consts = require('./const');

module.exports = class OrgIP extends InterestedParty {
  constructor(behalf) {
    if (behalf.toUpperCase() !== consts.behalfs.agent) {
      throw new Error(`Behalf '${behalf}' is not 'you'`);
    }
    super(behalf);
  }

  get(data) {
    const { behalf, case_ref: caseref, 'organisation-name': agorgname } = data;

    const {
      'full-name': youname,
      'over-18': representeeOver18,
      email: youmail,
      telephone: youphone,
    } = data.representee;

    const {
      line1: youbuild,
      line2: youstreet,
      line3: youtown,
      postcode: youcode,
      country: youcountry,
    } = data.representee.address;

    const {
      'full-name': agname,
      'over-18': representorOver18,
      email: agmail,
      telephone: agphone,
    } = data.representor;

    const {
      line1: agbuild,
      line2: agstreet,
      line3: agtown,
      postcode: agcode,
      country: agcountry,
    } = data.representor.address;

    const interestedParty = {
      caseref,
      behalf,
      agorgname,
      youname,
      youcounty: consts.over18Values[representeeOver18.toLowerCase()],
      youmail,
      youphone,
      youbuild,
      youstreet,
      youtown,
      youcode,
      youcountry,
      agname,
      agcounty: consts.over18Values[representorOver18.toLowerCase()],
      agbuild,
      agstreet,
      agtown,
      agcode,
      agcountry,
      agmail,
      agphone,
    };
    return interestedParty;
  }

  getEmailingDetails(data) {
    return { email: data.agmail, ipName: data.agname, ipRef: `${data.ID}` };
  }
};
