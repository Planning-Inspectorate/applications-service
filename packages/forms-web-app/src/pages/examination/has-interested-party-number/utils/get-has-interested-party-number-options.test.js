const { getHasInterestedPartyNumberOptions } = require('./get-has-interested-party-number-options');
const { mockI18n } = require('../../../_mocks/i18n');
const commonTranslations_EN = require('../../../../locales/en/common.json');

const i18n = mockI18n({
	common: commonTranslations_EN
});

describe('examination/has-interested-party-number/utils/get-has-interested-party-number-options', () => {
	describe('#getHasInterestedPartyNumberOptions', () => {
		describe('When getting the data for the radio buttons on the has interested party number page', () => {
			const req = { i18n };
			const result = getHasInterestedPartyNumberOptions(req.i18n);
			it('should return the correct data', () => {
				expect(result).toEqual({
					1: {
						value: 'yes',
						text: 'Yes'
					},
					2: {
						value: 'no',
						text: 'No'
					}
				});
			});
		});
	});
});
