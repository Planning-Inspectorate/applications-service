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
			case_ref: caseref
		} = data;

		const {
			line1: orgbuild,
			line2: orgstreet,
			line3: orgtown,
			postcode: orgcode,
			country: orgcountry
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
			orgcounty: consts.over18Values[over18.toLowerCase()]
		};
		return interestedParty;
	}

	getEmailingDetails(data) {
		return { email: data.orgmail, ipName: data.contactname, ipRef: `${data.ID}` };
	}

	map(data) {
		const {
			ID: ipRefNo,
			// eslint-disable-next-line camelcase
			caseref: case_ref,
			behalf,
			orgname,
			contactname,
			contactjob,
			orgcounty: over18,
			orgmail: email,
			orgphone: telephone,
			orgbuild: line1,
			orgstreet: line2,
			orgtown: line3,
			orgcode: postcode,
			orgcountry: country,
			therep
		} = data;

		const personalData = {
			ipRefNo,
			case_ref,
			behalf,
			'full-name': contactname,
			'over-18': consts.over18[over18.toLowerCase()],
			'organisation-name': orgname,
			role: contactjob,
			address: {
				line1,
				line2,
				line3,
				postcode,
				country
			},
			email,
			telephone
		};
		const comments = therep;
		return {
			personal_data: { ...personalData },
			comments
		};
	}
};
