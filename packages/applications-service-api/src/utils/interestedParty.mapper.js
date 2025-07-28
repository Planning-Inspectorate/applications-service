const { getDate } = require('./date-utils');
const { generateId } = require('./generate-id');

const BEHALF_SELF = 'me';
const BEHALF_ORG = 'them';
const BEHALF_AGENT = 'you';

const CONTACT_TYPES_BACK_OFFICE = {
	person: 'PERSON',
	organisation: 'ORGANISATION',
	agent: 'AGENT',
	family: 'FAMILY_GROUP'
};

const CONTACT_TYPES_API = {
	[BEHALF_SELF]: CONTACT_TYPES_BACK_OFFICE.person,
	[BEHALF_ORG]: CONTACT_TYPES_BACK_OFFICE.organisation,
	[BEHALF_AGENT]: CONTACT_TYPES_BACK_OFFICE.agent
};

const REPRESENTATION_TYPE = 'Members of the public/businesses';

const mapInterestedParty = (data) => {
	let interestedParty = {
		referenceId: generateId('F'),
		caseReference: data.case_ref,
		originalRepresentation: data.comment,
		representationType: REPRESENTATION_TYPE,
		dateReceived: getDate()
	};

	switch (data.behalf) {
		case BEHALF_SELF:
		case BEHALF_ORG:
			interestedParty.representationFrom = CONTACT_TYPES_API[data.behalf];
			interestedParty.represented = mapInterestedPartyContactDetails(
				data,
				CONTACT_TYPES_API[data.behalf]
			);
			break;
		case BEHALF_AGENT:
			interestedParty.representationFrom = CONTACT_TYPES_BACK_OFFICE.agent;
			interestedParty.represented = mapInterestedPartyContactDetails(
				data.representee,
				CONTACT_TYPES_BACK_OFFICE[data.representing]
			);
			interestedParty.representative = mapInterestedPartyContactDetails(
				data.representor,
				CONTACT_TYPES_BACK_OFFICE.agent
			);
	}

	return interestedParty;
};

const mapInterestedPartyContactDetails = (contactDetails, type) => {
	const [firstName, ...otherNames] = contactDetails['full-name'].split(' ');
	const lastName = otherNames.join(' ');

	const details = {
		firstName,
		lastName,
		type,
		under18: contactDetails['over-18'] === 'no',
		contactMethod: 'email',
		email: contactDetails.email,
		phoneNumber: contactDetails.telephone,
		address: {
			addressLine1: contactDetails.address.line1,
			addressLine2: contactDetails.address.line2,
			town: contactDetails.address.line3,
			postcode: contactDetails.address.postcode,
			country: contactDetails.address.country
		}
	};

	if (type === CONTACT_TYPES_BACK_OFFICE.organisation || type === CONTACT_TYPES_BACK_OFFICE.agent) {
		return {
			...details,
			organisationName: contactDetails['organisation-name'],
			jobTitle: contactDetails.role
		};
	}

	return details;
};

module.exports = { mapInterestedParty };
