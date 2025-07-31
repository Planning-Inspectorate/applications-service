const { getLocaleSelectorLinks } = require('./get-locale-selector-links');

describe('pages/_utils/get-links/get-locale-selector-links', () => {
	describe('#getLocaleSelectorLinks', () => {
		describe('When getting the locale selector links', () => {
			describe('and the selected locale is in the query string', () => {
				describe('and the selected locale is English', () => {
					const cookies = {};
					const path = '/mock-path';
					const query = {
						lang: 'en'
					};

					const localeSelectorLinks = getLocaleSelectorLinks(cookies, path, query);
					it('should return the locale selector links with English active value set to true', () => {
						expect(localeSelectorLinks).toEqual({
							cy: { active: false, name: 'Cymraeg', url: '/mock-path?lang=cy' },
							en: { active: true, name: 'English', url: '/mock-path?lang=en' }
						});
					});
				});

				describe('and the selected locale is Welsh', () => {
					const cookies = {};
					const path = '/mock-path';
					const query = {
						lang: 'cy'
					};

					const localeSelectorLinks = getLocaleSelectorLinks(cookies, path, query);
					it('should return the locale selector links with Welsh active value set to true', () => {
						expect(localeSelectorLinks).toEqual({
							cy: { active: true, name: 'Cymraeg', url: '/mock-path?lang=cy' },
							en: { active: false, name: 'English', url: '/mock-path?lang=en' }
						});
					});
				});
			});

			describe('and the selected locale is in the cookie', () => {
				describe('and the selected locale is English', () => {
					const cookies = { lang: 'en' };
					const path = '/mock-path';
					const query = {};

					const localeSelectorLinks = getLocaleSelectorLinks(cookies, path, query);
					it('should return the locale selector links with English active value set to true', () => {
						expect(localeSelectorLinks).toEqual({
							cy: { active: false, name: 'Cymraeg', url: '/mock-path?lang=cy' },
							en: { active: true, name: 'English', url: '/mock-path?lang=en' }
						});
					});
				});

				describe('and the selected locale is Welsh', () => {
					const cookies = {
						lang: 'cy'
					};
					const path = '/mock-path';
					const query = {};

					const localeSelectorLinks = getLocaleSelectorLinks(cookies, path, query);
					it('should return the locale selector links with Welsh active value set to true', () => {
						expect(localeSelectorLinks).toEqual({
							cy: { active: true, name: 'Cymraeg', url: '/mock-path?lang=cy' },
							en: { active: false, name: 'English', url: '/mock-path?lang=en' }
						});
					});
				});
			});

			describe('and there is not a selected locale', () => {
				const cookies = {};
				const path = '/mock-path';
				const query = {};

				const localeSelectorLinks = getLocaleSelectorLinks(cookies, path, query);
				it('should return the locale selector links with the default locale active value set to true', () => {
					expect(localeSelectorLinks).toEqual({
						cy: { active: false, name: 'Cymraeg', url: '/mock-path?lang=cy' },
						en: { active: true, name: 'English', url: '/mock-path?lang=en' }
					});
				});
			});
		});
	});
});
