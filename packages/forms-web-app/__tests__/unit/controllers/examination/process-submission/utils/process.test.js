const {
	handleProcessSubmission
} = require('../../../../../../src/controllers/examination/process-submission/utils/process');
const {
	sendData
} = require('../../../../../../src/controllers/examination/process-submission/utils/service');
const {
	mapSessionToFormData,
	getCommentAndFiles
} = require('../../../../../../src/controllers/examination/process-submission/utils/map-session-to-form-data');
const FormData = require('form-data');

jest.mock('../../../../../../src/controllers/examination/process-submission/utils/service', () => ({
	sendData: jest.fn()
}));

jest.mock(
	'../../../../../../src/controllers/examination/process-submission/utils/map-session-to-form-data',
	() => ({
		mapSessionToFormData: jest.fn(),
		getCommentAndFiles: jest.fn()
	})
);
describe('#process', () => {
	describe('When processing a submission', () => {
		const session = {
			examination: {
				caseRef: 'mock-case-ref',
				submissionItems: ['mock submission item', 'another mock submission item']
			}
		};
		const expectedUrl = 'http://applications-service-api:3000/api/v1/submission/mock-case-ref';
		const form = new FormData();
		const form2 = new FormData();
		const form3 = new FormData();
		const form4 = new FormData();
		form.append('form 1', 'form');
		form2.append('form 2', 'form');
		form3.append('form 3', 'form');
		form4.append('form 4', 'form');

		describe('and there are n+ submission items', () => {
			beforeEach(async () => {
				mapSessionToFormData.mockReturnValue('mapped form data');
				getCommentAndFiles.mockReturnValueOnce([form, form2]).mockReturnValueOnce([form3, form4]);
				sendData.mockReturnValue({
					json: () => ({
						submissionId: '1234'
					})
				});
				await handleProcessSubmission(session);
			});
			it('should set the uploading flag to true in session', () => {
				expect(session.examination.uploading).toBe(true);
			});
			it('should map the session data to form data', () => {
				expect(mapSessionToFormData).toHaveBeenCalledWith(
					session.examination,
					'mock submission item'
				);
			});
			it('should submit the first submission item without a submission id', () => {
				expect(sendData).toHaveBeenNthCalledWith(
					1,
					'http://applications-service-api:3000/api/v1/submission/mock-case-ref',
					form
				);
				expect(form._streams[3]).toBeUndefined();
				expect(form._streams[4]).toBeUndefined();
			});

			test.each([
				{ n: 2, expected: form2 },
				{ n: 3, expected: form3 },
				{ n: 4, expected: form4 }
			])('should submit subsequent forms with the submission id', ({ n, expected }) => {
				expect(sendData).toHaveBeenNthCalledWith(n, expectedUrl, expected);
				expect(expected._streams[3]).toContain('submissionId');
				expect(expected._streams[4]).toContain('1234');
			});
			it('should call send data for every submission item ', () => {
				expect(sendData).toHaveBeenCalledTimes(4);
			});
		});
	});
});
