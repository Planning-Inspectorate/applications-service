const { request } = require('../__data__/supertest');
const uuid = require('uuid');
const config = require('../../src/lib/config');
const { APPLICATION_FO, APPLICATION_DB } = require('../__data__/application');
const {
	INTERESTED_PARTY_SELF_API,
	INTERESTED_PARTY_SELF_NI,
	INTERESTED_PARTY_ORGANISATION_API,
	INTERESTED_PARTY_ORGANISATION_NI,
	INTERESTED_PARTY_AGENT_PERSON_API,
	INTERESTED_PARTY_AGENT_PERSON_NI,
	INTERESTED_PARTY_AGENT_ORGANISATION_API,
	INTERESTED_PARTY_AGENT_ORGANISATION_NI,
	INTERESTED_PARTY_AGENT_FAMILY_API,
	INTERESTED_PARTY_AGENT_FAMILY_NI,
	INTERESTED_PARTY_SELF_BACK_OFFICE,
	INTERESTED_PARTY_ORGANISATION_BACK_OFFICE,
	INTERESTED_PARTY_AGENT_PERSON_BACK_OFFICE,
	INTERESTED_PARTY_AGENT_ORGANISATION_BACK_OFFICE,
	INTERESTED_PARTY_AGENT_FAMILY_BACK_OFFICE
} = require('../__data__/interestedParty');
const { isBackOfficeCaseReference } = require('../../src/utils/is-backoffice-case-reference');
const mockInterestedPartyCreate = jest.fn();
const mockInterestedPartyUpdate = jest.fn();
const mockNIProjectFindOne = jest.fn();
jest.mock('../../src/models', () => ({
	InterestedParty: {
		create: (query) => mockInterestedPartyCreate(query),
		update: (id, data) => mockInterestedPartyUpdate(id, data)
	},
	Project: {
		findOne: (query) => mockNIProjectFindOne(query)
	}
}));

const mockProjectFindUnique = jest.fn();
jest.mock('uuid');
jest.mock('../../src/lib/prisma', () => ({
	prismaClient: {
		project: {
			findUnique: (query) => mockProjectFindUnique(query)
		}
	}
}));

jest.mock('../../src/lib/eventClient');
const { sendMessages } = require('../../src/lib/eventClient');

jest.mock('../../src/utils/date-utils');
const { getDate } = require('../../src/utils/date-utils');
jest.mock('../../src/utils/is-backoffice-case-reference');
const { notifyBuilder } = require('@planning-inspectorate/pins-notify');
jest.mock('@planning-inspectorate/pins-notify', () => ({
	createNotifyClient: {
		createNotifyClient: jest.fn().mockReturnThis()
	},
	notifyBuilder: {
		reset: jest.fn().mockReturnThis(),
		setNotifyClient: jest.fn().mockReturnThis(),
		setTemplateId: jest.fn().mockReturnThis(),
		setDestinationEmailAddress: jest.fn().mockReturnThis(),
		setTemplateVariablesFromObject: jest.fn().mockReturnThis(),
		setReference: jest.fn().mockReturnThis(),
		sendEmail: jest.fn()
	}
}));

describe('/api/v1/interested-party', () => {
	describe('POST /', () => {
		afterEach(() => {
			notifyBuilder.setDestinationEmailAddress.mockClear();
			notifyBuilder.setTemplateVariablesFromObject.mockClear();
			notifyBuilder.setReference.mockClear();
			notifyBuilder.sendEmail.mockClear();
		});

		describe('NI project', () => {
			beforeEach(() => {
				isBackOfficeCaseReference.mockReturnValue(false);
				mockNIProjectFindOne.mockResolvedValueOnce({ dataValues: APPLICATION_FO });
			});

			afterEach(() => {
				mockInterestedPartyCreate.mockClear();
			});

			const mockReferenceId = 'ANCNBDJND';

			describe('Registration for self', () => {
				let response;
				beforeEach(async () => {
					mockInterestedPartyCreate.mockResolvedValueOnce({
						dataValues: {
							ID: mockReferenceId,
							behalf: 'me',
							memail: 'joe@example.org',
							mename: 'Joe Bloggs'
						}
					});

					const apiRequestBody = {
						...INTERESTED_PARTY_SELF_API,
						case_ref: 'EN010116'
					};

					response = await request.post('/api/v1/interested-party').send(apiRequestBody);
				});

				it('saves to database and returns reference ID', async () => {
					expect(mockInterestedPartyCreate).toHaveBeenCalledWith(INTERESTED_PARTY_SELF_NI);

					expect(response.status).toEqual(201);
					expect(response.body).toEqual({ referenceId: mockReferenceId });
				});

				it('sends confirmation email to interested party', async () => {
					expect(notifyBuilder.setDestinationEmailAddress).toHaveBeenCalledWith('joe@example.org');
					expect(notifyBuilder.setTemplateVariablesFromObject).toHaveBeenCalledWith({
						'email address': 'joe@example.org',
						project_name: 'North Lincolnshire Green Energy Park',
						interested_party_name: 'Joe Bloggs',
						interested_party_ref: mockReferenceId,
						preliminary_meeting_url: config.services.notify.preliminaryMeetingUrl,
						having_your_say_url: config.services.notify.havingYourSayUrl,
						project_email: 'webteam@planninginspectorate.gov.uk'
					});
					expect(notifyBuilder.setReference).toHaveBeenCalledWith(mockReferenceId);
					expect(notifyBuilder.sendEmail).toHaveBeenCalledTimes(1);
				});
			});

			describe('Registration for organisation', () => {
				it('saves to database and returns reference ID', async () => {
					mockInterestedPartyCreate.mockResolvedValueOnce({
						dataValues: {
							ID: mockReferenceId,
							behalf: 'them',
							orgmail: 'joe@example.org',
							contactname: 'Joe Bloggs'
						}
					});

					const response = await request
						.post('/api/v1/interested-party')
						.send(INTERESTED_PARTY_ORGANISATION_API);

					expect(mockInterestedPartyCreate).toHaveBeenCalledWith(INTERESTED_PARTY_ORGANISATION_NI);

					expect(response.status).toEqual(201);
					expect(response.body).toEqual({ referenceId: mockReferenceId });
				});
			});

			describe('Registration on behalf of', () => {
				beforeEach(() => {
					mockInterestedPartyCreate.mockResolvedValueOnce({
						dataValues: {
							ID: mockReferenceId,
							behalf: 'you',
							agmail: 'joe@example.org',
							agname: 'Joe Bloggs'
						}
					});
				});

				describe('a person', () => {
					it('saves to database and returns reference ID', async () => {
						const response = await request
							.post('/api/v1/interested-party')
							.send(INTERESTED_PARTY_AGENT_PERSON_API);

						expect(mockInterestedPartyCreate).toHaveBeenCalledWith(
							INTERESTED_PARTY_AGENT_PERSON_NI
						);

						expect(response.status).toEqual(201);
						expect(response.body).toEqual({ referenceId: mockReferenceId });
					});
				});

				describe('an organisation', () => {
					it('saves to database and returns reference ID', async () => {
						const response = await request
							.post('/api/v1/interested-party')
							.send(INTERESTED_PARTY_AGENT_ORGANISATION_API);

						expect(mockInterestedPartyCreate).toHaveBeenCalledWith(
							INTERESTED_PARTY_AGENT_ORGANISATION_NI
						);

						expect(response.status).toEqual(201);
						expect(response.body).toEqual({ referenceId: mockReferenceId });
					});
				});

				describe('a family group', () => {
					it('saves to database and returns reference ID', async () => {
						const response = await request
							.post('/api/v1/interested-party')
							.send(INTERESTED_PARTY_AGENT_FAMILY_API);

						expect(mockInterestedPartyCreate).toHaveBeenCalledWith(
							INTERESTED_PARTY_AGENT_FAMILY_NI
						);

						expect(response.status).toEqual(201);
						expect(response.body).toEqual({ referenceId: mockReferenceId });
					});
				});
			});

			describe('Database insert failure', () => {
				it('returns 400 error', async () => {
					const errorMessage =
						"Incorrect string value: '\xF0\x9D\x99\xB1\xF0\x9D...' for column 'mename' at row 1";
					mockInterestedPartyCreate.mockImplementationOnce(() => {
						throw {
							name: 'SequelizeDatabaseError',
							parent: {
								code: 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD'
							},
							message: errorMessage
						};
					});

					const response = await request.post('/api/v1/interested-party').send({
						...INTERESTED_PARTY_SELF_API,
						'full-name': 'M. 𝙱𝔍'
					});

					expect(response.status).toEqual(400);
					expect(response.body).toEqual({
						code: 400,
						errors: [errorMessage]
					});
				});
			});
		});

		describe('Back Office project', () => {
			const BACK_OFFICE_CASE_REFERENCE = 'BC0110002';
			const mockReferenceId = 'F3AAB2CF4';
			const mockDate = new Date('2022-12-09 13:30:21:123');

			beforeEach(() => {
				isBackOfficeCaseReference.mockReturnValue(true);
				getDate.mockReturnValue(mockDate);
				uuid.v4.mockReturnValue('3aab2cf4c4d34e3e8');

				mockProjectFindUnique.mockResolvedValueOnce({
					...APPLICATION_DB,
					caseReference: BACK_OFFICE_CASE_REFERENCE
				});
			});

			describe('Registration details are published to message queue', () => {
				it.each([
					['a person', INTERESTED_PARTY_SELF_API, INTERESTED_PARTY_SELF_BACK_OFFICE],
					[
						'an organisation',
						INTERESTED_PARTY_ORGANISATION_API,
						INTERESTED_PARTY_ORGANISATION_BACK_OFFICE
					],
					[
						'a person via agent',
						INTERESTED_PARTY_AGENT_PERSON_API,
						INTERESTED_PARTY_AGENT_PERSON_BACK_OFFICE
					],
					[
						'an organisation via agent',
						INTERESTED_PARTY_AGENT_ORGANISATION_API,
						INTERESTED_PARTY_AGENT_ORGANISATION_BACK_OFFICE
					],
					[
						'a family group via agent',
						INTERESTED_PARTY_AGENT_FAMILY_API,
						INTERESTED_PARTY_AGENT_FAMILY_BACK_OFFICE
					]
				])('%s', async (str, apiRequest, message) => {
					const response = await request.post('/api/v1/interested-party').send(apiRequest);

					expect(sendMessages).toHaveBeenCalledWith('register-representation', [
						{
							applicationProperties: {
								type: 'Publish',
								version: '0.1'
							},
							body: {
								...message,
								referenceId: 'F3AAB2CF4'
							},
							contentType: 'application/json'
						}
					]);

					expect(response.status).toEqual(201);
					expect(response.body).toEqual({ referenceId: mockReferenceId });
				});
			});

			describe('Email confirmation is sent', () => {
				it.each([
					['interested party', INTERESTED_PARTY_SELF_API, 'joe@example.org', 'Joe Bloggs'],
					['interested party', INTERESTED_PARTY_ORGANISATION_API, 'joe@example.org', 'Joe Bloggs'],
					['agent', INTERESTED_PARTY_AGENT_PERSON_API, 'another@example.org', 'A.N. Other'],
					['agent', INTERESTED_PARTY_AGENT_ORGANISATION_API, 'another@example.org', 'A.N. Other'],
					['agent', INTERESTED_PARTY_AGENT_FAMILY_API, 'another@example.org', 'A.N. Other']
				])(
					'sends email confirmation to %s',
					async (emailRecipient, apiRequest, expectedEmail, expectedName) => {
						await request.post('/api/v1/interested-party').send(apiRequest);

						expect(notifyBuilder.setDestinationEmailAddress).toHaveBeenCalledWith(expectedEmail);
						expect(notifyBuilder.setTemplateVariablesFromObject).toHaveBeenCalledWith({
							'email address': expectedEmail,
							project_name: 'North Lincolnshire Green Energy Park',
							interested_party_name: expectedName,
							interested_party_ref: mockReferenceId,
							preliminary_meeting_url: config.services.notify.preliminaryMeetingUrl,
							having_your_say_url: config.services.notify.havingYourSayUrl,
							project_email: 'webteam@planninginspectorate.gov.uk'
						});
						expect(notifyBuilder.setReference).toHaveBeenCalledWith(mockReferenceId);
						expect(notifyBuilder.sendEmail).toHaveBeenCalledTimes(1);
					}
				);
			});
		});

		describe('request with missing required properties', () => {
			it('should return 400 error with message', async () => {
				const response = await request.post('/api/v1/interested-party').send({});

				expect(response.status).toEqual(400);
				expect(response.body).toEqual({
					code: 400,
					errors: [
						"must have required property 'case_ref'",
						"must have required property 'behalf'",
						"must have required property 'comment'"
					]
				});
			});
		});
	});
});
