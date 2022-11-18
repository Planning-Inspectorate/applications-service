const {
	mapSessionToCommonFormData,
	markFormAsPersonalInfo
} = require('../../../../../../src/controllers/examination/process-submission/utils/helpers');

const FormData = require('form-data');
const { expectFormDataKeyValue, expectFormDataToBeUndefined } = require('./testHelper');

describe('#mapSessionToCommonFormData', () => {
	describe('When creating the common form data', () => {
		describe('and all the key values are available', () => {
			const examination = {
				hasInterestedPartyNo: 'yes',
				name: 'mock name',
				email: 'mock email',
				title: 'remove me - mock title',
				interestedPartyNumber: '1234'
			};
			const item = { submissionItem: 'mock deadline item' };
			let result;
			beforeEach(() => {
				result = mapSessionToCommonFormData(examination, item);
			});

			it('should add name to the form', () => {
				expectFormDataKeyValue(result, 'name', 'mock name', 0);
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
			const examination = {
				hasInterestedPartyNo: 'no',
				name: 'mock name',
				email: 'mock email',
				title: 'remove me - mock title'
			};
			const item = { submissionItem: 'mock deadline item' };
			let result;
			beforeEach(() => {
				result = mapSessionToCommonFormData(examination, item);
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
