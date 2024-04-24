const { getHeaderTitle } = require('./get-header-title');

const { mockI18n } = require('../../_mocks/i18n');

const globalTranslation_EN = require('../../../locales/en/global.json');

describe('pages/_utils/get-content/get-header-title', () => {
	describe('#getHeaderTitle', () => {
		describe('examination journey', () => {
			it('should retain the default header title for examination journey start page', () => {
				const path = '/projects/ABC123/examination/have-your-say-during-examination';

				const headerTitle = getHeaderTitle(path, mockI18n('global', globalTranslation_EN));

				expect(headerTitle).toEqual('Find a National Infrastructure Project');
			});

			it('should set header title for following pages of the examination journey', () => {
				const path = '/projects/ABC123/examination/any-page-except-index';

				const headerTitle = getHeaderTitle(path, mockI18n('global', globalTranslation_EN));

				expect(headerTitle).toEqual('Have your say on an application');
			});
		});

		describe('get updates journey', () => {
			it('should retain the default header title for get updates journey start page', () => {
				const path = '/projects/ABC123/get-updates/start';

				const headerTitle = getHeaderTitle(path, mockI18n('global', globalTranslation_EN));

				expect(headerTitle).toEqual('Find a National Infrastructure Project');
			});

			it('should set header title for following pages of the get updates journey', () => {
				const path = '/projects/ABC123/get-updates/any-page-except-index';

				const headerTitle = getHeaderTitle(path, mockI18n('global', globalTranslation_EN));

				expect(headerTitle).toEqual('Get updates about this project');
			});
		});

		describe('register journey', () => {
			it('should retain the default header title for register journey start page', () => {
				const path = '/projects/ABC123/register/register-have-your-say';

				const headerTitle = getHeaderTitle(path, mockI18n('global', globalTranslation_EN));

				expect(headerTitle).toEqual('Find a National Infrastructure Project');
			});

			it('should set header title for following pages of the register journey', () => {
				const path = '/projects/ABC123/register/who-registering-for';

				const headerTitle = getHeaderTitle(path, mockI18n('global', globalTranslation_EN));

				expect(headerTitle).toEqual('Register to have your say');
			});
		});
	});
});
