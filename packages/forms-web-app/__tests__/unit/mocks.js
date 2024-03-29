jest.mock('../../src/lib/logger');

const logger = require('../../src/lib/logger');
const { APPLICATION_DOCUMENT } = require('../../src/lib/empty-application');

const { empty: emptyApplication } = APPLICATION_DOCUMENT;

const mockReq = (application = emptyApplication) => ({
	cookies: {},
	log: logger,
	params: {},
	session: {
		application
	}
});

const mockRes = () => ({
	clearCookie: jest.fn(),
	cookie: jest.fn(),
	locals: { baseUrl: '/mock-base-url/mock-case-ref' },
	redirect: jest.fn(),
	render: jest.fn(),
	sendStatus: jest.fn(),
	status: jest.fn()
});

// Handles undefined res.render function error
const mockResponse = () => {
	const res = {};
	res.status = jest.fn().mockReturnValue(res);
	res.json = jest.fn().mockReturnValue(res);
	res.render = jest.fn().mockReturnValue(res);
	res.redirect = jest.fn().mockReturnValue(res);
	return res;
};

const falsyAndEmptyValues = [undefined, null, NaN, 0, '', false, [], {}];

module.exports = {
	falsyAndEmptyValues,
	mockReq,
	mockRes,
	mockResponse
};
