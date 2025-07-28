const {
	formatAddAnotherDeadlineItemOptions
} = require('./format-add-another-deadline-item-options');

const { getAddAnotherDeadlineOptions } = require('../config');
const { mockI18n } = require('../../../_mocks/i18n');
const commonTranslationsEN = require('../../../../locales/en/common.json');

describe('pages/examination/add-another-deadline-item/utils/format-add-another-deadline-item-options', () => {
	const addAnotherDeadlineOptions = getAddAnotherDeadlineOptions(
		mockI18n({ common: commonTranslationsEN })
	);

	describe('#formatAddAnotherDeadlineItemOptions', () => {
		it('should return the formatted add another deadline item options', () => {
			expect(formatAddAnotherDeadlineItemOptions(addAnotherDeadlineOptions)).toEqual([
				{ text: 'Yes', value: 'yes' },
				{ text: 'No', value: 'no' }
			]);
		});
	});
});
