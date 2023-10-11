const { request } = require('../__data__/supertest');
const config = require('../../src/lib/config');

jest.mock('../../src/utils/date-utils');
jest.mock('../../src/lib/eventClient');
jest.mock('uuid');
const { getDate } = require('../../src/utils/date-utils');
const { sendMessages } = require('../../src/lib/eventClient');
const uuid = require('uuid');

const submissionRequest = () =>
	request
		.post('/api/v1/submissions/BC0110001')
		.field('name', 'Joe Bloggs')
		.field('email', 'joe@example.org')
		.field('interestedParty', 'true')
		.field('ipReference', '1234567879')
		.field('deadline', 'Deadline 2')
		.field('submissionType', 'Comments on LIRs')
		.field('sensitiveData', 'false')
		.field('lateSubmission', 'false');

describe('/api/v1/submissions', () => {
	const mockTime = new Date('2023-12-30T11:06:13.245Z');
	const mockUuid = 'eb43f2de-cd51-4f95-a7a3-e04082bdcd8b';

	beforeEach(() => {
		config.backOfficeIntegration.submissions.postSubmission.caseReferences = ['BC0110001'];
		uuid.v4.mockReturnValue(mockUuid);
	});

	describe('POST /:caseReference', () => {
		describe('Back Office case reference', () => {
			const requestSubmissionId = 'BC0110001-101023134030108';
			const mockGeneratedSubmissionId = 'BC0110001-301223110613245';
			const expectedMessage = {
				blobGuid: mockUuid,
				caseReference: 'BC0110001',
				deadline: 'Deadline 2',
				email: 'joe@example.org',
				interestedParty: true,
				interestedPartyReference: '1234567879',
				lateSubmission: false,
				name: 'Joe Bloggs',
				sensitiveData: false,
				submissionType: 'Comments on LIRs'
			};

			describe('submission with written representation', () => {
				describe('request with submissionId provided', () => {
					it('uploads pdf of representation, publishes message, and returns submissionId', async () => {
						const response = await submissionRequest()
							.field('representation', 'this is the representation text')
							.field('submissionId', requestSubmissionId);

						expect(sendMessages).toBeCalledWith('deadline-submission-topic', [
							{
								applicationProperties: {},
								body: {
									...expectedMessage,
									documentName: `Written-Representation-${requestSubmissionId}.pdf`,
									submissionId: requestSubmissionId
								},
								contentType: 'application/json'
							}
						]);
						expect(response.status).toEqual(201);
						expect(response.body.submissionId).toEqual(requestSubmissionId);
					});
				});

				describe('request with no submissionId', () => {
					it('uploads pdf of representation, publishes message, and returns generated submissionId', async () => {
						getDate.mockReturnValueOnce(new Date()).mockReturnValueOnce(mockTime);

						const response = await submissionRequest().field(
							'representation',
							'this is the representation text'
						);

						expect(sendMessages).toBeCalledWith('deadline-submission-topic', [
							{
								applicationProperties: {},
								body: {
									...expectedMessage,
									documentName: `Written-Representation-${mockGeneratedSubmissionId}.pdf`,
									submissionId: mockGeneratedSubmissionId
								},
								contentType: 'application/json'
							}
						]);
						expect(response.status).toEqual(201);
						expect(response.body.submissionId).toEqual(mockGeneratedSubmissionId);
					});
				});
			});

			describe('submission with user uploaded file', () => {
				const mockFile = Buffer.from([1, 2, 3]);

				describe('request with submissionId provided', () => {
					it('uploads user file, publishes message, and returns submissionId', async () => {
						const response = await submissionRequest()
							.field('submissionId', requestSubmissionId)
							.attach('file', mockFile, { filename: 'foo.pdf' });

						expect(sendMessages).toBeCalledWith('deadline-submission-topic', [
							{
								applicationProperties: {},
								body: {
									...expectedMessage,
									documentName: `Written-Representation-${mockGeneratedSubmissionId}.pdf`,
									submissionId: mockGeneratedSubmissionId
								},
								contentType: 'application/json'
							}
						]);
						expect(response.status).toEqual(201);
						expect(response.body.submissionId).toEqual(requestSubmissionId);
					});
				});

				describe('request with no submissionId', () => {
					it('uploads user file, publishes message, and returns generated submissionId', async () => {
						getDate.mockReturnValueOnce(new Date()).mockReturnValueOnce(mockTime);

						const response = await submissionRequest().attach('file', mockFile, {
							filename: 'foo.pdf'
						});

						expect(sendMessages).toBeCalledWith('deadline-submission-topic', [
							{
								applicationProperties: {},
								body: {
									...expectedMessage,
									documentName: `foo.pdf`,
									submissionId: mockGeneratedSubmissionId
								},
								contentType: 'application/json'
							}
						]);
						expect(response.status).toEqual(201);
						expect(response.body.submissionId).toEqual(mockGeneratedSubmissionId);
					});
				});
			});
		});
	});
});
