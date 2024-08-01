const { isBackOfficeCaseReference } = require('../../../src/utils/is-backoffice-case-reference');
const {
	INTERESTED_PARTY_SELF_API,
	INTERESTED_PARTY_SELF_BACK_OFFICE
} = require('../../__data__/interestedParty');
const { createInterestedParty } = require('../../../src/services/interestedParty.service');

jest.mock('../../../src/services/interestedParty.ni.service');
const {
	createInterestedParty: createNIInterestedParty
} = require('../../../src/services/interestedParty.ni.service');

jest.mock('../../../src/services/backoffice.publish.service');
const {
	publishRegisterRepresentation
} = require('../../../src/services/backoffice.publish.service');

jest.mock('../../../src/utils/interestedParty.mapper');
const { mapInterestedParty } = require('../../../src/utils/interestedParty.mapper');

jest.mock('../../../src/lib/notify');
const { sendIPRegistrationConfirmationEmailToIP } = require('../../../src/lib/notify');

jest.mock('../../../src/services/application.backoffice.service');
const { getApplication } = require('../../../src/services/application.backoffice.service');

jest.mock('../../../src/utils/date-utils');
const { getDate } = require('../../../src/utils/date-utils');

const { APPLICATION_API } = require('../../__data__/application');
jest.mock('../../../src/utils/is-backoffice-case-reference');
describe('interestedParty service', () => {
	describe('createInterestedParty', () => {
		beforeEach(() => {
			isBackOfficeCaseReference.mockImplementation(
				(caseReference) => caseReference === 'BC0110002'
			);
		});

		describe('NI case', () => {
			const NI_CASE_REFERENCE = 'EN010116';

			it('invokes ni service', async () => {
				createNIInterestedParty.mockResolvedValueOnce({ ID: '123456' });

				const createInterestedPartyRequest = {
					...INTERESTED_PARTY_SELF_API,
					case_ref: NI_CASE_REFERENCE
				};

				const interestedParty = await createInterestedParty(createInterestedPartyRequest);

				expect(createNIInterestedParty).toHaveBeenCalledWith(createInterestedPartyRequest);
				expect(interestedParty).toEqual({
					referenceId: '123456'
				});
			});
		});

		describe('Back Office case', () => {
			const mockDate = new Date('2022-12-09 13:30:21:123');
			beforeAll(() => getDate.mockReturnValue(mockDate));

			it('returns referenceId', async () => {
				mapInterestedParty.mockReturnValueOnce(INTERESTED_PARTY_SELF_BACK_OFFICE);
				getApplication.mockResolvedValueOnce({
					...APPLICATION_API,
					caseReference: 'BC0110002'
				});

				const interestedParty = await createInterestedParty(INTERESTED_PARTY_SELF_API);

				expect(publishRegisterRepresentation).toHaveBeenCalledWith(
					INTERESTED_PARTY_SELF_BACK_OFFICE
				);
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
