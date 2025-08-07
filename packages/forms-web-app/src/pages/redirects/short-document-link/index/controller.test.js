const { getDocumentShortLinkController } = require('./controller');
const { getShortDocLink } = require('../../../services');

const logger = require('../../../../lib/logger');

jest.mock('../../../services', () => ({
	getShortDocLink: jest.fn()
}));

jest.mock('../../../../lib/logger', () => ({
	error: jest.fn()
}));

describe('getDocumentShortLinkController', () => {
	const req = {
		params: {
			docRef: 'mock-doc-ref'
		}
	};
	const res = {
		redirect: jest.fn()
	};
	const next = jest.fn();
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should redirect to the document path from the service', async () => {
		const mockPath = 'https://example.com/mock.pdf';
		getShortDocLink.mockResolvedValue({ path: mockPath });

		await getDocumentShortLinkController(req, res, next);

		expect(getShortDocLink).toHaveBeenCalledWith('mock-doc-ref');
		expect(res.redirect).toHaveBeenCalledWith(mockPath);
		expect(next).not.toHaveBeenCalled();
	});

	it('should call next with error if service throws', async () => {
		const mockError = new Error('Failed to get doc link');

		getShortDocLink.mockRejectedValue(mockError);

		await getDocumentShortLinkController(req, res, next);

		expect(getShortDocLink).toHaveBeenCalledWith('mock-doc-ref');
		expect(logger.error).toHaveBeenCalledWith(mockError);
		expect(next).toHaveBeenCalledWith(mockError);
		expect(res.redirect).not.toHaveBeenCalled();
	});
});
