const { getShortDocLinkPath } = require('./index/_utils/get-short-doc-link-path');
const { getDocumentShortLinkController } = require('./index/controller');

jest.mock('./index/_utils/get-short-doc-link-path', () => ({
	getShortDocLinkPath: jest.fn()
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
			getShortDocLinkPath.mockReturnValue('/document/:docRef');
			require('./router');
		});

		it('should register GET route using getShortDocLinkPath and getDocumentShortLinkController', () => {
			expect(get).toHaveBeenCalledWith('/document/:docRef', getDocumentShortLinkController);
			expect(get).toHaveBeenCalledTimes(1);
		});
	});
});
