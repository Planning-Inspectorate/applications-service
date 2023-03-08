const {
	mapSessionToCommonFormData,
	markFormAsPersonalInfo
} = require('../../../../../../src/controllers/examination/process-submission/utils/helpers');

const {
	getDeadlineDetailsName
} = require('../../../../../../src/controllers/examination/session/deadline/details/name');
const {
	getExaminationSession
} = require('../../../../../../src/controllers/examination/session/examination-session');
const { getProjectPromoterName } = require('../../../../../../src/session');
const {
	isUserApplicant
} = require('../../../../../../src/controllers/examination/session/deadline/helpers');

jest.mock('../../../../../../src/controllers/examination/session/deadline/details/name', () => ({
	getDeadlineDetailsName: jest.fn()
}));
jest.mock('../../../../../../src/controllers/examination/session/examination-session', () => ({
	getExaminationSession: jest.fn()
}));
jest.mock('../../../../../../src/session', () => ({
	getProjectPromoterName: jest.fn()
}));
jest.mock('../../../../../../src/controllers/examination/session/deadline/helpers', () => ({
	isUserApplicant: jest.fn()
}));

const FormData = require('form-data');
const { expectFormDataKeyValue, expectFormDataToBeUndefined } = require('./testHelper');

describe('#mapSessionToCommonFormData', () => {
	describe('When creating the common form data', () => {
		const mockSession = {};
		const mockSubmissionItem = { submissionItem: 'mock deadline item' };
		beforeEach(() => {
			getExaminationSession.mockReturnValue({
				hasInterestedPartyNo: 'yes',
				email: 'mock email',
				title: 'remove me - mock title',
				interestedPartyNumber: '1234'
			});
		});
		describe('and the user is the applicant', () => {
			let result;
			beforeEach(() => {
				isUserApplicant.mockReturnValue(true);
				getProjectPromoterName.mockReturnValue('mock promoter name');
				result = mapSessionToCommonFormData(mockSession, mockSubmissionItem);
			});
			it('should add the promoter name to the name field', () => {
				expectFormDataKeyValue(result, 'name', 'mock promoter name', 0);
			});
		});
		describe('and the user is not the applicant', () => {
			let result;
			beforeEach(() => {
				isUserApplicant.mockReturnValue(false);
				getDeadlineDetailsName.mockReturnValue('mock name');
				result = mapSessionToCommonFormData(mockSession, mockSubmissionItem);
			});
			it('should add the name to the name field', () => {
				expectFormDataKeyValue(result, 'name', 'mock name', 0);
			});
		});
		describe('and all the key values are available', () => {
			let result;
			beforeEach(() => {
				result = mapSessionToCommonFormData(mockSession, mockSubmissionItem);
			});

			it('should add email to the form', () => {
				expectFormDataKeyValue(result, 'email', 'mock email', 3);
			});

			it('should add interestedParty to the form', () => {
				expectFormDataKeyValue(result, 'interestedParty', 'true', 6);
			});

			it('should add deadline to the form', () => {
				expectFormDataKeyValue(result, 'deadline', 'mock title', 9);
			});

			it('should add submissionType to the form', () => {
				expectFormDataKeyValue(result, 'submissionType', 'mock deadline item', 12);
			});

			it('should add interestedPartyNumber to the form', () => {
				expectFormDataKeyValue(result, 'ipReference', '1234', 15);
			});
		});
		describe('and the interest party number is no', () => {
			let result;
			beforeEach(() => {
				getExaminationSession.mockReturnValue({
					hasInterestedPartyNo: 'no',
					email: 'mock email',
					title: 'remove me - mock title',
					interestedPartyNumber: '1234'
				});
				result = mapSessionToCommonFormData(mockSession, mockSubmissionItem);
			});
			it('should add interestedParty to the form', () => {
				expectFormDataKeyValue(result, 'interestedParty', 'false', 6);
			});
		});
	});
	describe('#markFormAsPersonalInfo', () => {
		describe('When marking a from as personal information', () => {
			describe('and the item has the personal item flag', () => {
				const item = { personalInformation: 'yes' };
				const form = new FormData();
				markFormAsPersonalInfo(form, item);

				it('should add sensitive data flag to the form', () => {
					expectFormDataKeyValue(form, 'sensitiveData', 'true', 0);
				});
			});
			describe('and the does NOT item has the personal item flag', () => {
				const item = {};
				const form = new FormData();
				markFormAsPersonalInfo(form, item);

				it('should add sensitive data flag to the form', () => {
					expectFormDataToBeUndefined(form);
				});
			});
		});
	});
});
