const { getShortDocLinkURL } = require('./index/_utils/get-short-doc-link-url');
const { getDocumentShortLinkController } = require('./index/controller');

jest.mock('./index/_utils/get-short-doc-link-url', () => ({
	getShortDocLinkURL: jest.fn()
}));

jest.mock('./index/controller', () => ({
	getDocumentShortLinkController: jest.fn()
}));

describe('pages/redirects/short-document-link/router', () => {
	describe('#redirectRouter', () => {
		const get = jest.fn();
		jest.doMock('express', () => ({
			Router: () => ({
				get
			})
		}));

		beforeEach(() => {
			getShortDocLinkURL.mockReturnValue('/document/:docRef');
			require('./router');
		});

		it('should register GET route using getShortDocLinkURL and getDocumentShortLinkController', () => {
			expect(get).toHaveBeenCalledWith('/document/:docRef', getDocumentShortLinkController);
			expect(get).toHaveBeenCalledTimes(1);
		});
	});
});
