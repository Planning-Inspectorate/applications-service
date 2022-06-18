const getPreviousPagePath = require('../../../src/lib/get-previous-page-path');
const config = require('../../../src/config');

describe('lib/get-previous-page-path', () => {
	let req;
	let get;

	beforeEach(() => {
		get = jest.fn();

		req = {
			get
		};
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	const setupReqGetMock = ({ referer }) => {
		get.mockImplementation((arg) => {
			switch (arg.toLowerCase()) {
				case 'referer':
					return referer;
				default:
					throw new Error(`Invalid: ${arg}`);
			}
		});
	};

	[
		{
			title: 'referer undefined',
			host: 'https://example.org',
			referer: undefined
		},
		{
			title: 'host config undefined',
			host: undefined,
			referer: 'https://example.com/some/path/here'
		},
		{
			title: 'empty referer',
			host: 'https://example.com',
			referer: ''
		},
		{
			title: 'referer and host config do not match',
			host: 'http://example.org',
			referer: 'https://example.com/some/path/here'
		}
	].forEach(({ title, host, referer }) => {
		test(`unhappy path - should return root url - ${title}`, () => {
			config.server.host = host;
			setupReqGetMock({ referer });
			expect(getPreviousPagePath(req)).toEqual('/');
		});
	});

	[
		{
			host: 'https://example.com',
			referer: 'https://example.com/some',
			expected: '/some'
		},
		{
			host: 'http://example.org',
			referer: 'http://example.org/some/nested/path?and=stuff',
			expected: '/some/nested/path?and=stuff'
		}
	].forEach(({ host, referer, expected }) => {
		test(`happy path - should return the expected path - ${expected}`, () => {
			config.server.host = host;
			setupReqGetMock({ referer });
			expect(getPreviousPagePath(req)).toEqual(expected);
		});
	});
});
