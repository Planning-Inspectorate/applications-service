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
		const { behalf, case_ref: caseref, comment: therep } = data;

		const {
			'full-name': youname,
			'over-18': representeeOver18,
			email: youmail,
			telephone: youphone
		} = data.representee;

		const {
			line1: youbuild,
			line2: youstreet,
			line3: youtown,
			postcode: youcode,
			country: youcountry
		} = data.representee.address;

		const {
			'full-name': agname,
			email: agmail,
			telephone: agphone,
			'organisation-name': agorgname
		} = data.representor;

		const {
			line1: agbuild,
			line2: agstreet,
			line3: agtown,
			postcode: agcode,
			country: agcountry
		} = data.representor.address;

		return {
			caseref,
			behalf,
			therep,
			agorgname,
			youname,
			youcounty: representeeOver18 ? consts.over18Values[representeeOver18.toLowerCase()] : '',
			youmail,
			youphone,
			youbuild,
			youstreet,
			youtown,
			youcode,
			youcountry,
			agname,
			agbuild,
			agstreet,
			agtown,
			agcode,
			agcountry,
			agmail,
			agphone
		};
	}

	getEmailingDetails(data) {
		return {
			email: data.agmail,
			ipName: data.agname,
			ipRef: `${data.ID}`
		};
	}
};
