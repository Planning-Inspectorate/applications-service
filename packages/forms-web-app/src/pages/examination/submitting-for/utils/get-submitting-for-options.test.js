const { getSubmittingForOptions } = require('./get-submitting-for-options');

const { getUserIsSubmittingFor } = require('../../_session/deadline/helpers');

jest.mock('../../_session/deadline/helpers', () => ({
	getUserIsSubmittingFor: jest.fn()
}));

describe('examination/submitting-for/utils/get-back-link-url', () => {
	describe('#getSubmittingForOptions', () => {
		describe('When getting the options for the submitting for page', () => {
			describe('and the user has not previously selected an option', () => {
				let result;
				beforeEach(() => {
					result = getSubmittingForOptions();
				});
				it('should return the options for the submitting for page', () => {
					expect(result).toEqual([
						{
							text: 'Myself',
							value: 'myself'
						},
						{
							text: 'An organisation I work for',
							value: 'organisation'
						},
						{
							text: 'On behalf of another person, a family group or another organisation I do not work for',
							value: 'agent'
						}
					]);
				});
			});
			describe('and the user has previously selected an option', () => {
				let result;
				beforeEach(() => {
					getUserIsSubmittingFor.mockReturnValue('myself');
					result = getSubmittingForOptions();
				});
				it('should return the options for the submitting for page with the selected option checked', () => {
					expect(result).toEqual([
						{
							checked: 'checked',
							text: 'Myself',
							value: 'myself'
						},
						{
							text: 'An organisation I work for',
							value: 'organisation'
						},
						{
							text: 'On behalf of another person, a family group or another organisation I do not work for',
							value: 'agent'
						}
					]);
				});
			});
		});
	});
});
