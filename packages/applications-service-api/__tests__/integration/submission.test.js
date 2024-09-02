const { generateId } = require('../../src/utils/generate-id');
const mockUploadData = jest.fn();
const mockGetBlockBlobClient = jest.fn().mockReturnValue({
	uploadData: mockUploadData
});
const mockBlobServiceClient = jest.fn().mockReturnValue({
	getContainerClient: jest.fn().mockReturnValue({
		getBlockBlobClient: mockGetBlockBlobClient
	})
});

jest.mock('../../src/utils/generate-id');

jest.mock('@azure/storage-blob', () => ({
	BlobServiceClient: mockBlobServiceClient
}));

const mockFindUnique = jest.fn();
jest.mock('../../src/lib/prisma', () => ({
	prismaClient: {
		project: {
			findUnique: (query) => mockFindUnique(query)
		}
	}
}));

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

jest.mock('../../src/utils/date-utils');
jest.mock('../../src/lib/eventClient');
jest.mock('../../src/utils/pdf');
jest.mock('uuid');
const { sendMessages } = require('../../src/lib/eventClient');
const { textToPdf } = require('../../src/utils/pdf');
const uuid = require('uuid');
const { APPLICATION_DB } = require('../__data__/application');

const BACK_OFFICE_CASE_REFERENCE = 'BC0110001';

const { request } = require('../__data__/supertest');
const { isBackOfficeCaseReference } = require('../../src/utils/is-backoffice-case-reference');

jest.mock('../../src/utils/is-backoffice-case-reference');
const submissionRequest = () =>
	request
		.post(`/api/v1/submissions/${BACK_OFFICE_CASE_REFERENCE}`)
		.field('name', 'Joe Bloggs')
		.field('email', 'joe@example.org')
		.field('interestedParty', 'true')
		.field('ipReference', '1234567879')
		.field('deadline', 'Deadline 2')
		.field('submissionType', 'Comments on LIRs')
		.field('sensitiveData', 'false')
		.field('lateSubmission', 'false');

describe('/api/v1/submissions', () => {
	const mockUuid = 'eb43f2de-cd51-4f95-a7a3-e04082bdcd8b';

	beforeEach(() => {
		isBackOfficeCaseReference.mockImplementation(
			(caseReference) => caseReference === BACK_OFFICE_CASE_REFERENCE
		);
		uuid.v4.mockReturnValue(mockUuid);
	});

	describe('POST /:caseReference', () => {
		describe('Back Office case reference', () => {
			const mockFileBuffer = Buffer.from([1, 2, 3]);
			const mockSubmissionId = 'S3AAB2CF4';
			const expectedMessage = {
				blobGuid: mockUuid,
				caseReference: BACK_OFFICE_CASE_REFERENCE,
				deadline: 'Deadline 2',
				email: 'joe@example.org',
				interestedParty: true,
				interestedPartyReference: '1234567879',
				lateSubmission: false,
				name: 'Joe Bloggs',
				sensitiveData: false,
				submissionType: 'Comments on LIRs'
			};

			beforeEach(() => {
				textToPdf.mockReturnValue(mockFileBuffer);
				generateId.mockReturnValue(mockSubmissionId);
			});

			afterEach(() => {
				mockGetBlockBlobClient.mockClear();
				mockUploadData.mockClear();
				sendMessages.mockClear();
			});

			let response;

			describe('submission with written representation', () => {
				const generatedPDFFileName = `Joe-Bloggs-Written-Representation.pdf`;

				describe('request with submissionId provided', () => {
					beforeEach(async () => {
						response = await submissionRequest()
							.field('representation', 'this is the representation text')
							.field('submissionId', mockSubmissionId);
					});

					it('uploads file to blob storage', async () => {
						expect(mockGetBlockBlobClient).toBeCalledWith(`${mockUuid}/${generatedPDFFileName}`);
						expect(mockUploadData).toBeCalledWith(mockFileBuffer, {
							blobHTTPHeaders: { blobContentType: 'application/pdf' }
						});
					});

					it('publishes message to topic', async () => {
						expect(sendMessages).toBeCalledWith('deadline-submission-topic', [
							{
								applicationProperties: {},
								body: {
									...expectedMessage,
									documentName: generatedPDFFileName,
									submissionId: mockSubmissionId
								},
								contentType: 'application/json'
							}
						]);
					});

					it('returns successful api response with submissionId', async () => {
						expect(response.status).toEqual(201);
						expect(response.body.submissionId).toEqual(mockSubmissionId);
					});
				});

				describe('request with no submissionId', () => {
					beforeEach(async () => {
						response = await submissionRequest().field(
							'representation',
							'this is the representation text'
						);
					});

					it('uploads file to blob storage', async () => {
						expect(mockGetBlockBlobClient).toBeCalledWith(`${mockUuid}/${generatedPDFFileName}`);
						expect(mockUploadData).toBeCalledWith(mockFileBuffer, {
							blobHTTPHeaders: { blobContentType: 'application/pdf' }
						});
					});

					it('publishes message to topic', async () => {
						expect(sendMessages).toBeCalledWith('deadline-submission-topic', [
							{
								applicationProperties: {},
								body: {
									...expectedMessage,
									documentName: generatedPDFFileName,
									submissionId: mockSubmissionId
								},
								contentType: 'application/json'
							}
						]);
					});

					it('returns successful api response with submissionId', async () => {
						expect(response.status).toEqual(201);
						expect(response.body.submissionId).toEqual(mockSubmissionId);
					});
				});
			});

			describe('submission with user uploaded file', () => {
				describe('request with submissionId provided', () => {
					beforeEach(async () => {
						response = await submissionRequest()
							.field('submissionId', mockSubmissionId)
							.attach('file', mockFileBuffer, { filename: 'foo.pdf' });
					});

					it('uploads file to blob storage', async () => {
						expect(mockGetBlockBlobClient).toBeCalledWith(`${mockUuid}/foo.pdf`);
						expect(mockUploadData).toBeCalledWith(mockFileBuffer, {
							blobHTTPHeaders: { blobContentType: 'application/pdf' }
						});
					});

					it('publishes message to topic', async () => {
						expect(sendMessages).toBeCalledWith('deadline-submission-topic', [
							{
								applicationProperties: {},
								body: {
									...expectedMessage,
									documentName: 'foo.pdf',
									submissionId: mockSubmissionId
								},
								contentType: 'application/json'
							}
						]);
					});

					it('returns successful api response with submissionId', async () => {
						expect(response.status).toEqual(201);
						expect(response.body.submissionId).toEqual(mockSubmissionId);
					});
				});

				describe('request with no submissionId', () => {
					beforeEach(async () => {
						response = await submissionRequest().attach('file', mockFileBuffer, {
							filename: 'foo.pdf'
						});
					});

					it('uploads file to blob storage', async () => {
						expect(mockGetBlockBlobClient).toBeCalledWith(`${mockUuid}/foo.pdf`);
						expect(mockUploadData).toBeCalledWith(mockFileBuffer, {
							blobHTTPHeaders: { blobContentType: 'application/pdf' }
						});
					});

					it('publishes message to topic', async () => {
						expect(sendMessages).toBeCalledWith('deadline-submission-topic', [
							{
								applicationProperties: {},
								body: {
									...expectedMessage,
									documentName: 'foo.pdf',
									submissionId: mockSubmissionId
								},
								contentType: 'application/json'
							}
						]);
					});

					it('returns successful api response with submissionId', async () => {
						expect(response.status).toEqual(201);
						expect(response.body.submissionId).toEqual(mockSubmissionId);
					});
				});
			});
		});
	});

	describe('POST /:submissionId/complete', () => {
		describe('Back Office case reference', () => {
			const submissionId = '123';

			afterEach(() => {
				mockFindUnique.mockReset();
				notifyBuilder.sendEmail.mockReset();
			});

			it('sends email and returns success response', async () => {
				mockFindUnique.mockResolvedValueOnce({
					...APPLICATION_DB,
					caseReference: BACK_OFFICE_CASE_REFERENCE
				});

				const response = await request.post(`/api/v1/submissions/${submissionId}/complete`).send({
					email: 'person@example.org',
					caseReference: BACK_OFFICE_CASE_REFERENCE
				});

				expect(response.status).toEqual(204);

				expect(notifyBuilder.reset).toHaveBeenCalled();
				expect(notifyBuilder.setDestinationEmailAddress).toHaveBeenCalledWith('person@example.org');
				expect(notifyBuilder.setTemplateVariablesFromObject).toHaveBeenCalledWith({
					'email address': 'person@example.org',
					submission_id: submissionId,
					project_name: 'North Lincolnshire Green Energy Park',
					project_email: 'webteam@planninginspectorate.gov.uk'
				});
				expect(notifyBuilder.setReference).toHaveBeenCalledWith(`Submission ${submissionId}`);
				expect(notifyBuilder.sendEmail).toHaveBeenCalledTimes(1);
			});

			it('sends email and returns success response - Welsh region, no Welsh project name', async () => {
				mockFindUnique.mockResolvedValueOnce({
					...{ ...APPLICATION_DB, regions: 'wales' },
					caseReference: BACK_OFFICE_CASE_REFERENCE
				});

				const response = await request.post(`/api/v1/submissions/${submissionId}/complete`).send({
					email: 'person@example.org',
					caseReference: BACK_OFFICE_CASE_REFERENCE
				});

				expect(response.status).toEqual(204);

				expect(notifyBuilder.reset).toHaveBeenCalled();
				expect(notifyBuilder.setDestinationEmailAddress).toHaveBeenCalledWith('person@example.org');
				expect(notifyBuilder.setTemplateVariablesFromObject).toHaveBeenCalledWith({
					'email address': 'person@example.org',
					submission_id: submissionId,
					project_name: 'North Lincolnshire Green Energy Park',
					project_name_welsh: 'North Lincolnshire Green Energy Park',
					project_email: 'webteam@planninginspectorate.gov.uk'
				});
				expect(notifyBuilder.setReference).toHaveBeenCalledWith(`Submission ${submissionId}`);
				expect(notifyBuilder.sendEmail).toHaveBeenCalledTimes(1);
			});

			it('sends email and returns success response - Welsh region, Welsh project name', async () => {
				mockFindUnique.mockResolvedValueOnce({
					...{ ...APPLICATION_DB, regions: 'wales', projectNameWelsh: 'A Welsh project name' },
					caseReference: BACK_OFFICE_CASE_REFERENCE
				});

				const response = await request.post(`/api/v1/submissions/${submissionId}/complete`).send({
					email: 'person@example.org',
					caseReference: BACK_OFFICE_CASE_REFERENCE
				});

				expect(response.status).toEqual(204);

				expect(notifyBuilder.reset).toHaveBeenCalled();
				expect(notifyBuilder.setDestinationEmailAddress).toHaveBeenCalledWith('person@example.org');
				expect(notifyBuilder.setTemplateVariablesFromObject).toHaveBeenCalledWith({
					'email address': 'person@example.org',
					submission_id: submissionId,
					project_name: 'North Lincolnshire Green Energy Park',
					project_name_welsh: 'A Welsh project name',
					project_email: 'webteam@planninginspectorate.gov.uk'
				});
				expect(notifyBuilder.setReference).toHaveBeenCalledWith(`Submission ${submissionId}`);
				expect(notifyBuilder.sendEmail).toHaveBeenCalledTimes(1);
			});

			it('returns 400 error if email is provided but caseReference is missing', async () => {
				const response = await request.post(`/api/v1/submissions/${submissionId}/complete`).send({
					email: 'person@example.org'
				});

				expect(response.status).toEqual(400);
			});

			it('returns 400 error if caseReference is provided but email is missing', async () => {
				const response = await request.post(`/api/v1/submissions/${submissionId}/complete`).send({
					caseReference: BACK_OFFICE_CASE_REFERENCE
				});

				expect(response.status).toEqual(400);
			});
		});
	});
});
