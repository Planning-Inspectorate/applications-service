const { mapInterestedParty } = require('../../../src/utils/interestedParty.mapper');
const { getDate } = require('../../../src/utils/date-utils');
const {
	INTERESTED_PARTY_SELF_API,
	INTERESTED_PARTY_ORGANISATION_API,
	INTERESTED_PARTY_AGENT_PERSON_API,
	INTERESTED_PARTY_AGENT_ORGANISATION_API,
	INTERESTED_PARTY_AGENT_FAMILY_API,
	INTERESTED_PARTY_SELF_BACK_OFFICE,
	INTERESTED_PARTY_ORGANISATION_BACK_OFFICE,
	INTERESTED_PARTY_AGENT_PERSON_BACK_OFFICE,
	INTERESTED_PARTY_AGENT_ORGANISATION_BACK_OFFICE,
	INTERESTED_PARTY_AGENT_FAMILY_BACK_OFFICE
} = require('../../__data__/interestedParty');
const { generateId } = require('../../../src/utils/generate-id');

jest.mock('../../../src/utils/date-utils');
jest.mock('../../../src/utils/generate-id');

describe('interestedParty mapper', () => {
	describe('mapInterestedParty', () => {
		const mockDate = new Date('2022-12-09 13:30:21:123');
		beforeAll(() => {
			getDate.mockReturnValue(mockDate);
			generateId.mockReturnValue('F3AAB2CF4');
		});

		it.each([
			[INTERESTED_PARTY_SELF_API, INTERESTED_PARTY_SELF_BACK_OFFICE],
			[INTERESTED_PARTY_ORGANISATION_API, INTERESTED_PARTY_ORGANISATION_BACK_OFFICE],
			[INTERESTED_PARTY_AGENT_PERSON_API, INTERESTED_PARTY_AGENT_PERSON_BACK_OFFICE],
			[INTERESTED_PARTY_AGENT_ORGANISATION_API, INTERESTED_PARTY_AGENT_ORGANISATION_BACK_OFFICE],
			[INTERESTED_PARTY_AGENT_FAMILY_API, INTERESTED_PARTY_AGENT_FAMILY_BACK_OFFICE]
		])('maps api data to back office format', (input, expectedOutput) => {
			expect(mapInterestedParty(input)).toEqual({
				...expectedOutput,
				referenceId: 'F3AAB2CF4'
			});
		});
	});
});
