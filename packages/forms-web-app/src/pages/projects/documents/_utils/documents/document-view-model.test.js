const { mapDocumentsToViewModel } = require('./documents-view-model');

const { mockI18n } = require('../../../../../../src/pages/_mocks/i18n');

const projectsDocumentsTranslations__EN = require('../../_translations/en.json');

const i18n = mockI18n(projectsDocumentsTranslations__EN);

describe('#mapDocumentsToViewModel', () => {
	describe('When mapping the documents data to the view model', () => {
		const documents = [
			{
				datePublished: '2022-01-01',
				description: 'mock description',
				personalName: 'mock personal name',
				mime: 'mock mime',
				size: 'mock size',
				representative: 'mock representative',
				stage: 'mock stage',
				stageLabel: {
					cy: 'mock stage label welsh',
					en: 'mock stage label english'
				},
				filter1: 'mock filter',
				extra: 'i should be ignored'
			}
		];
		const response = mapDocumentsToViewModel(i18n, documents);
		it('should return the correct structure for all documents in the array', () => {
			expect(response).toEqual([
				{
					date_published: '1 January 2022',
					description: 'mock description',
					personal_name: 'mock personal name',
					mime: 'mock mime',
					size: 'mock size',
					representative: 'mock representative',
					Stage: 'mock stage',
					filter_1: 'mock filter',
					stageLabel: 'mock stage label english'
				}
			]);
		});
	});
});
