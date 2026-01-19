const {
	addProjectsMapTranslationsMiddleware
} = require('./add-projects-map-translations-middleware');

jest.mock('../../_utils/get-translations', () => ({
	getTranslations: jest.fn()
}));

jest.mock('../_translations/en.json', () => ({
	'projectsMap.heading': 'Projects Map'
}));

jest.mock('../_translations/cy.json', () => ({
	'projectsMap.heading': 'Map Prosiectau'
}));

jest.mock('../config', () => ({
	projectsMapI18nNamespace: 'projectsMap'
}));

describe('addProjectsMapTranslationsMiddleware', () => {
	let mockReq;
	let mockRes;
	let mockNext;
	let mockGetTranslations;

	beforeEach(() => {
		jest.clearAllMocks();
		mockGetTranslations = require('../../_utils/get-translations').getTranslations;
		mockRes = {};
		mockNext = jest.fn();
	});

	it('should add resource bundle and call next', () => {
		const mockTranslations = {
			en: { 'projectsMap.heading': 'Projects Map' },
			cy: { 'projectsMap.heading': 'Map Prosiectau' }
		};
		mockGetTranslations.mockReturnValue(mockTranslations);
		mockReq = { i18n: { language: 'en', addResourceBundle: jest.fn() } };

		addProjectsMapTranslationsMiddleware(mockReq, mockRes, mockNext);

		expect(mockGetTranslations).toHaveBeenCalledWith(
			require('../_translations/en.json'),
			require('../_translations/cy.json')
		);
		expect(mockReq.i18n.addResourceBundle).toHaveBeenCalledWith(
			'en',
			'projectsMap',
			mockTranslations.en
		);
		expect(mockNext).toHaveBeenCalled();
	});

	it('should add correct translations for each language', () => {
		const mockTranslations = {
			en: { 'projectsMap.heading': 'Projects Map' },
			cy: { 'projectsMap.heading': 'Map Prosiectau' }
		};
		mockGetTranslations.mockReturnValue(mockTranslations);

		// Test English
		mockReq = { i18n: { language: 'en', addResourceBundle: jest.fn() } };
		addProjectsMapTranslationsMiddleware(mockReq, mockRes, mockNext);
		expect(mockReq.i18n.addResourceBundle).toHaveBeenCalledWith(
			'en',
			'projectsMap',
			mockTranslations.en
		);

		// Test Welsh
		mockReq = { i18n: { language: 'cy', addResourceBundle: jest.fn() } };
		addProjectsMapTranslationsMiddleware(mockReq, mockRes, mockNext);
		expect(mockReq.i18n.addResourceBundle).toHaveBeenCalledWith(
			'cy',
			'projectsMap',
			mockTranslations.cy
		);
	});
});
