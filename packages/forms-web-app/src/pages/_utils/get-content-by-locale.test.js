const { getContentByLocale } = require('./get-content-by-locale');

const { mockI18n } = require('../_mocks/i18n');

const mockContentEN = 'mock content EN';
const mockContentCY = 'mock content CY';

describe('pages/_utils/get-content-by-locale', () => {
	describe('#getContentByLocale', () => {
		describe('When the selected locale is English', () => {
			const contentByLocale = getContentByLocale(mockI18n({}), mockContentEN, mockContentCY);

			it('should return the English content', () => {
				expect(contentByLocale).toEqual('mock content EN');
			});
		});

		describe('When the selected locale is Welsh', () => {
			const contentByLocale = getContentByLocale(mockI18n({}, 'cy'), mockContentEN, mockContentCY);

			it('should return the Welsh content', () => {
				expect(contentByLocale).toEqual('mock content CY');
			});
		});
	});
});
