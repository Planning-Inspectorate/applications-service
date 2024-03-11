import { getProjectRedirect } from './projects';

describe('projects', () => {
	describe('getProjectRedirect', () => {
		const tests = [
			{
				name: 'empty',
				path: '',
				env: {},
				want: null
			},
			{
				name: 'invalid path',
				path: '/do-not-redirect/this-url',
				env: {},
				want: null
			},
			{
				name: 'valid project',
				path: '/projects/east-midlands/some-project-here',
				env: {
					frontOfficeUrl: 'https://front-office.com',
					projectRedirects: {
						'east-midlands/some-project-here': 'EN0101013'
					}
				},
				want: 'https://front-office.com/projects/EN0101013'
			},
			{
				name: 'trailing slash',
				path: '/projects/yorkshire-and-the-humber/drax-bioenergy-with-carbon-capture-and-storage-project/',
				env: {
					frontOfficeUrl: 'https://front-office.com',
					projectRedirects: {
						'yorkshire-and-the-humber/drax-bioenergy-with-carbon-capture-and-storage-project':
							'EN010120'
					}
				},
				want: 'https://front-office.com/projects/EN010120'
			},
			{
				name: 'project not enabled',
				path: '/projects/east-midlands/some-project-here',
				env: {
					frontOfficeUrl: 'https://front-office.com',
					projectRedirects: {
						'east-midlands/some-project2-here': 'EN0101013'
					}
				},
				want: null
			}
		];

		for (const test of tests) {
			it(test.name, () => {
				const got = getProjectRedirect(test.path, test.env);
				expect(got).toEqual(test.want);
			});
		}
	});
});
