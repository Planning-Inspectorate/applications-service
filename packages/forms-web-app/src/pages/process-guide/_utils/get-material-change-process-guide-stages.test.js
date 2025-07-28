const { mockI18n } = require('../../_mocks/i18n');

const processGuideTranslations_EN = require('../_translations/en.json');
const {
	getMaterialChangeProcessGuideStages
} = require('./get-material-change-process-guide-stages');

const i18n = mockI18n({ processGuide: processGuideTranslations_EN });

describe('pages/process-guide/_utils/get-material-change-process-guide-stages', () => {
	describe('#getMaterialChangeProcessGuideStages', () => {
		const materialChangeProcessGuideStages = getMaterialChangeProcessGuideStages(i18n);

		it('should return the material change process guide stages', () => {
			expect(materialChangeProcessGuideStages).toMatchSnapshot();
		});
	});
});
