const { createInterestedParty } = require('../../../src/services/interestedParty.ni.service');
const {
	INTERESTED_PARTY_SELF_API,
	INTERESTED_PARTY_SELF_NI
} = require('../../__data__/interestedParty');
const { APPLICATION_FO } = require('../../__data__/application');

jest.mock('../../../src/repositories/interestedParty.ni.repository');
jest.mock('../../../src/repositories/project.ni.repository');
jest.mock('../../../src/lib/notify');
jest.mock('../../../src/utils/date-utils');
const {
	createInterestedParty: createInterestedPartyRepository,
	updateInterestedParty
} = require('../../../src/repositories/interestedParty.ni.repository');
const { getApplication } = require('../../../src/repositories/project.ni.repository');
const { sendIPRegistrationConfirmationEmailToIP } = require('../../../src/lib/notify');
const { getDate } = require('../../../src/utils/date-utils');

describe('interestedParty.ni.service', () => {
	describe('createInterestedParty', () => {
		const mockDate = new Date('2022-12-09 13:30:00');

		beforeEach(() => getDate.mockReturnValueOnce(mockDate));

		it('invokes create repository', async () => {
			getApplication.mockResolvedValueOnce({ dataValues: APPLICATION_FO });
			createInterestedPartyRepository.mockResolvedValueOnce({
				behalf: 'me',
				ID: 123456,
				caseref: 'EN010116',
				memail: 'joe@example.org',
				mename: 'Joe Bloggs'
			});

			const createInterestedPartyRequest = {
				...INTERESTED_PARTY_SELF_API,
				case_ref: 'EN010116'
			};

			await createInterestedParty(createInterestedPartyRequest);

			expect(createInterestedPartyRepository).toHaveBeenCalledWith(INTERESTED_PARTY_SELF_NI);
			expect(getApplication).toHaveBeenCalledWith('EN010116');
			expect(sendIPRegistrationConfirmationEmailToIP).toHaveBeenCalledWith({
				email: 'joe@example.org',
				projectName: 'North Lincolnshire Green Energy Park',
				ipName: 'Joe Bloggs',
				ipRef: '123456',
				projectEmail: 'webteam@planninginspectorate.gov.uk'
			});
			expect(updateInterestedParty).toHaveBeenCalledWith(123456, { emailed: mockDate });
		});
	});
});
