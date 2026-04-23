const {
	INTERESTED_PARTY_SELF_API,
	INTERESTED_PARTY_SELF_BACK_OFFICE
} = require('../../__data__/interestedParty');
const { createInterestedParty } = require('../../../src/services/interestedParty.service');

jest.mock('../../../src/services/publish.service');
const { publishRegisterRepresentation } = require('../../../src/services/publish.service');

jest.mock('../../../src/utils/interestedParty.mapper');
const { mapInterestedParty } = require('../../../src/utils/interestedParty.mapper');

jest.mock('../../../src/lib/notify');
const { sendIPRegistrationConfirmationEmailToIP } = require('../../../src/lib/notify');

jest.mock('../../../src/services/application.service');
const { getApplication } = require('../../../src/services/application.service');

jest.mock('../../../src/utils/date-utils');
const { getDate } = require('../../../src/utils/date-utils');

const { APPLICATION_API } = require('../../__data__/application');
describe('interestedParty service', () => {
	describe('createInterestedParty', () => {
		const mockDate = new Date('2022-12-09 13:30:21:123');
		beforeAll(() => getDate.mockReturnValue(mockDate));
		it('returns referenceId', async () => {
			mapInterestedParty.mockReturnValueOnce(INTERESTED_PARTY_SELF_BACK_OFFICE);
			getApplication.mockResolvedValueOnce({
				...APPLICATION_API,
				caseReference: 'BC0110002'
			});

			const interestedParty = await createInterestedParty(INTERESTED_PARTY_SELF_API);

			expect(publishRegisterRepresentation).toHaveBeenCalledWith(INTERESTED_PARTY_SELF_BACK_OFFICE);
			expect(sendIPRegistrationConfirmationEmailToIP).toHaveBeenCalledWith({
				email: 'joe@example.org',
				projectName: 'North Lincolnshire Green Energy Park',
				ipName: 'Joe Bloggs',
				ipRef: 'BC0110002-091222133021123',
				projectEmail: 'webteam@planninginspectorate.gov.uk'
			});
			expect(interestedParty).toEqual({
				referenceId: 'BC0110002-091222133021123'
			});
		});

		describe('Back Office case - Welsh, without Welsh Project name', () => {
			const mockDate = new Date('2022-12-09 13:30:21:123');
			beforeAll(() => getDate.mockReturnValue(mockDate));

			it('returns referenceId', async () => {
				mapInterestedParty.mockReturnValueOnce(INTERESTED_PARTY_SELF_BACK_OFFICE);
				getApplication.mockResolvedValueOnce({
					...APPLICATION_API,
					regions: ['wales'],
					projectName: 'A Welsh Project',
					projectNameWelsh: null,
					caseReference: 'BC0110002'
				});

				const interestedParty = await createInterestedParty(INTERESTED_PARTY_SELF_API);

				expect(publishRegisterRepresentation).toHaveBeenCalledWith(
					INTERESTED_PARTY_SELF_BACK_OFFICE
				);
				expect(sendIPRegistrationConfirmationEmailToIP).toHaveBeenCalledWith({
					email: 'joe@example.org',
					projectName: 'A Welsh Project',
					projectNameWelsh: 'A Welsh Project',
					ipName: 'Joe Bloggs',
					ipRef: 'BC0110002-091222133021123',
					projectEmail: 'webteam@planninginspectorate.gov.uk'
				});
				expect(interestedParty).toEqual({
					referenceId: 'BC0110002-091222133021123'
				});
			});
		});

		describe('Back Office case - Welsh, with Welsh Project name', () => {
			const mockDate = new Date('2022-12-09 13:30:21:123');
			beforeAll(() => getDate.mockReturnValue(mockDate));

			it('returns referenceId', async () => {
				mapInterestedParty.mockReturnValueOnce(INTERESTED_PARTY_SELF_BACK_OFFICE);
				getApplication.mockResolvedValueOnce({
					...APPLICATION_API,
					regions: ['wales'],
					projectName: 'A Welsh Project',
					projectNameWelsh: 'A Project Name in Welsh',
					caseReference: 'BC0110002'
				});

				const interestedParty = await createInterestedParty(INTERESTED_PARTY_SELF_API);

				expect(publishRegisterRepresentation).toHaveBeenCalledWith(
					INTERESTED_PARTY_SELF_BACK_OFFICE
				);
				expect(sendIPRegistrationConfirmationEmailToIP).toHaveBeenCalledWith({
					email: 'joe@example.org',
					projectName: 'A Welsh Project',
					projectNameWelsh: 'A Project Name in Welsh',
					ipName: 'Joe Bloggs',
					ipRef: 'BC0110002-091222133021123',
					projectEmail: 'webteam@planninginspectorate.gov.uk'
				});
				expect(interestedParty).toEqual({
					referenceId: 'BC0110002-091222133021123'
				});
			});
		});

		describe('Back Office case - multiregion including Wales, without Welsh Project name', () => {
			const mockDate = new Date('2022-12-09 13:30:21:123');
			beforeAll(() => getDate.mockReturnValue(mockDate));

			it('returns referenceId', async () => {
				mapInterestedParty.mockReturnValueOnce(INTERESTED_PARTY_SELF_BACK_OFFICE);
				getApplication.mockResolvedValueOnce({
					...APPLICATION_API,
					regions: ['south_east', 'north_east', 'wales'],
					projectName: 'A multiregion project including Wales',
					projectNameWelsh: null,
					caseReference: 'BC0110002'
				});

				const interestedParty = await createInterestedParty(INTERESTED_PARTY_SELF_API);

				expect(publishRegisterRepresentation).toHaveBeenCalledWith(
					INTERESTED_PARTY_SELF_BACK_OFFICE
				);
				expect(sendIPRegistrationConfirmationEmailToIP).toHaveBeenCalledWith({
					email: 'joe@example.org',
					projectName: 'A multiregion project including Wales',
					projectNameWelsh: 'A multiregion project including Wales',
					ipName: 'Joe Bloggs',
					ipRef: 'BC0110002-091222133021123',
					projectEmail: 'webteam@planninginspectorate.gov.uk'
				});
				expect(interestedParty).toEqual({
					referenceId: 'BC0110002-091222133021123'
				});
			});
		});

		describe('Back Office case - multiregion including Wales, with Welsh Project name', () => {
			const mockDate = new Date('2022-12-09 13:30:21:123');
			beforeAll(() => getDate.mockReturnValue(mockDate));

			it('returns referenceId', async () => {
				mapInterestedParty.mockReturnValueOnce(INTERESTED_PARTY_SELF_BACK_OFFICE);
				getApplication.mockResolvedValueOnce({
					...APPLICATION_API,
					regions: ['south_east', 'north_east', 'wales'],
					projectName: 'A multiregion project including Wales',
					projectNameWelsh: 'Welsh multiregion project name',
					caseReference: 'BC0110002'
				});

				const interestedParty = await createInterestedParty(INTERESTED_PARTY_SELF_API);

				expect(publishRegisterRepresentation).toHaveBeenCalledWith(
					INTERESTED_PARTY_SELF_BACK_OFFICE
				);
				expect(sendIPRegistrationConfirmationEmailToIP).toHaveBeenCalledWith({
					email: 'joe@example.org',
					projectName: 'A multiregion project including Wales',
					projectNameWelsh: 'A multiregion project including Wales',
					ipName: 'Joe Bloggs',
					ipRef: 'BC0110002-091222133021123',
					projectEmail: 'webteam@planninginspectorate.gov.uk'
				});
				expect(interestedParty).toEqual({
					referenceId: 'BC0110002-091222133021123'
				});
			});
		});

		describe('Back Office case - multiregion not including Wales', () => {
			const mockDate = new Date('2022-12-09 13:30:21:123');
			beforeAll(() => getDate.mockReturnValue(mockDate));

			it('returns referenceId', async () => {
				mapInterestedParty.mockReturnValueOnce(INTERESTED_PARTY_SELF_BACK_OFFICE);
				getApplication.mockResolvedValueOnce({
					...APPLICATION_API,
					regions: ['south_east', 'north_east', 'north_west'],
					projectName: 'A multiregion project not including Wales',
					caseReference: 'BC0110002'
				});

				const interestedParty = await createInterestedParty(INTERESTED_PARTY_SELF_API);

				expect(publishRegisterRepresentation).toHaveBeenCalledWith(
					INTERESTED_PARTY_SELF_BACK_OFFICE
				);
				expect(sendIPRegistrationConfirmationEmailToIP).toHaveBeenCalledWith({
					email: 'joe@example.org',
					projectName: 'A multiregion project not including Wales',
					ipName: 'Joe Bloggs',
					ipRef: 'BC0110002-091222133021123',
					projectEmail: 'webteam@planninginspectorate.gov.uk'
				});
				expect(interestedParty).toEqual({
					referenceId: 'BC0110002-091222133021123'
				});
			});
		});
	});
});
