const { request } = require('../__data__/supertest');
const uuid = require('uuid');
const config = require('../../src/lib/config');
const { APPLICATION_DB } = require('../__data__/application');
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
} = require('../__data__/interestedParty');

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

		const BACK_OFFICE_CASE_REFERENCE = 'BC0110002';
		const mockReferenceId = 'F3AAB2CF4';
		const mockDate = new Date('2022-12-09 13:30:21:123');

		beforeEach(() => {
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
