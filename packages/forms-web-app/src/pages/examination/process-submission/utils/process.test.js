const { handleProcessSubmission } = require('./process');
const {
	postSubmission,
	postSubmissionComplete
} = require('../../../../services/submission.service');
const { getListOfFormData } = require('./fromDataMappers');
const FormData = require('form-data');
const { expectFormDataKeyValue, expectFormDataToBeUndefined } = require('./testHelper');
const {
	getExaminationSession,
	setExaminationSubmissionComplete,
	setExaminationSubmissionId
} = require('../../_session/examination-session');

jest.mock('../../../../services/submission.service', () => ({
	postSubmission: jest.fn(),
	postSubmissionComplete: jest.fn()
}));

jest.mock('../../_session/examination-session', () => ({
	getExaminationSession: jest.fn(),
	setExaminationSubmissionComplete: jest.fn(),
	setExaminationSubmissionId: jest.fn()
}));

jest.mock('./fromDataMappers', () => ({
	getListOfFormData: jest.fn()
}));
describe('#process', () => {
	describe('When processing a submission', () => {
		const session = {
			examination: {
				caseRef: 'mock-case-ref',
				submissionItems: ['mock submission item', 'another mock submission item']
			}
		};
		const expectedUrl = 'mock-case-ref';
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
				getExaminationSession.mockReturnValue(session.examination);
				getListOfFormData.mockReturnValueOnce([form, form2]).mockReturnValueOnce([form3, form4]);
				postSubmission.mockReturnValue({ data: { submissionId: '1234' } });
				postSubmissionComplete.mockReturnValue({ resp_code: '204' });
				setExaminationSubmissionComplete.mockReturnValue('ok');
				setExaminationSubmissionId();
				await handleProcessSubmission(session);
			});

			it('should submit the first submission item without a submission id', () => {
				expect(postSubmission).toHaveBeenNthCalledWith(1, expectedUrl, form);
				expectFormDataToBeUndefined(form, 3);
				expectFormDataToBeUndefined(form, 4);
			});

			it('should submit the second submission item with a submission id', () => {
				expect(postSubmission).toHaveBeenNthCalledWith(2, expectedUrl, form2);
				expectFormDataKeyValue(form2, 'submissionId', '1234', 3);
			});

			it('should submit the third submission item with a submission id', () => {
				expect(postSubmission).toHaveBeenNthCalledWith(3, expectedUrl, form3);
				expectFormDataKeyValue(form3, 'submissionId', '1234', 3);
			});

			it('should submit the forth submission item with a submission id', () => {
				expect(postSubmission).toHaveBeenNthCalledWith(4, expectedUrl, form4);
				expectFormDataKeyValue(form4, 'submissionId', '1234', 3);
			});

			it('should call send data for every submission item ', () => {
				expect(postSubmission).toHaveBeenCalledTimes(4);
			});

			it('should call submission complete with submission Id ', () => {
				expect(postSubmissionComplete).toHaveBeenNthCalledWith(1, '1234');
			});
		});
		describe('and there is an error', () => {
			beforeEach(async () => {
				getExaminationSession.mockImplementation(() => {
					throw new Error('an error');
				});
			});

			it('should throw an error', async () => {
				await expect(handleProcessSubmission(session)).rejects.toThrow('Process Submission failed');
			});
		});

		describe('and there is an error with submission complete', () => {
			beforeEach(async () => {
				getExaminationSession.mockReturnValue(session.examination);
				getListOfFormData.mockReturnValueOnce([form, form2]).mockReturnValueOnce([form3, form4]);
				postSubmission.mockReturnValue({ data: { submissionId: '1234' } });
				postSubmissionComplete.mockImplementation(() => {
					throw new Error('Submission Complete request failed');
				});
			});

			it('should throw an error', async () => {
				await expect(handleProcessSubmission(session)).rejects.toThrow('Process Submission failed');
			});
		});
	});
});
