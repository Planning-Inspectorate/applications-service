import { getDocumentRedirect } from './documents';

describe('documents', () => {
	describe('getDocumentRedirect', () => {
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
				name: 'valid doc',
				path: '/wp-content/ipc/uploads/projects/EN020002/EN020002-000674-doc.pdf',
				env: {
					blobStoreUrl: 'https://blob-url.com',
					documentRedirectCaseReferences: ['EN020002']
				},
				want: 'https://blob-url.com/EN020002-000674-doc.pdf'
			},
			{
				name: 'case not enabled doc',
				path: '/wp-content/ipc/uploads/projects/EN020002/EN020002-000674-doc.pdf',
				env: {
					blobStoreUrl: 'https://blob-url.com',
					documentRedirectCaseReferences: ['EN020001']
				},
				want: null
			}
		];

		for (const test of tests) {
			it(test.name, () => {
				const got = getDocumentRedirect(test.path, test.env);
				expect(got).toEqual(test.want);
			});
		}
	});
});
