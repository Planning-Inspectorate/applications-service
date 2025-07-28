const { getSummaryListItemPersonalInformationWhich } = require('../index');

let { getPersonalInformationWhichName } = require('./get-name');
let { getPersonalInformationWhichUrl } = require('./get-url');
let { getPersonalInformationWhichValue } = require('./get-value');

const { mockI18n } = require('../../../../../_mocks/i18n');
const commonTranslations_EN = require('../../../../../../locales/en/common.json');
const examinationTranslations_EN = require('../../../../_translations/en.json');

const i18n = mockI18n({ common: commonTranslations_EN, examination: examinationTranslations_EN });

jest.mock('./get-name', () => ({
	getPersonalInformationWhichName: jest.fn()
}));
jest.mock('./get-url', () => ({
	getPersonalInformationWhichUrl: jest.fn()
}));
jest.mock('./get-value', () => ({
	getPersonalInformationWhichValue: jest.fn()
}));

const mockPersonalInformationWhichName = 'mock personal information which name';
const mockPersonalInformationWhichValue = 'mock personal information which';
const mockPersonalInformationWhichUrl = 'mock personal information which url';

describe('examination/check-submission-item/utils/summary-list-item/personal-information-which', () => {
	describe('#getSummaryListItemPersonalInformationWhich', () => {
		describe('When calling get summary list personal information which function', () => {
			let result;
			beforeEach(() => {
				getPersonalInformationWhichName.mockReturnValue(mockPersonalInformationWhichName);
				getPersonalInformationWhichValue.mockReturnValue(mockPersonalInformationWhichValue);
				getPersonalInformationWhichUrl.mockReturnValue(mockPersonalInformationWhichUrl);
				result = getSummaryListItemPersonalInformationWhich(i18n, {});
			});
			it('should return the summary list item', () => {
				expect(result).toEqual({
					actions: {
						items: [
							{
								href: mockPersonalInformationWhichUrl,
								text: 'Change',
								visuallyHiddenText: mockPersonalInformationWhichName
							}
						]
					},
					key: { text: mockPersonalInformationWhichName },
					value: { html: mockPersonalInformationWhichValue }
				});
			});
		});
	});
});
