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
	locals: jest.fn(),
	redirect: jest.fn(),
	render: jest.fn(),
	sendStatus: jest.fn(),
	status: jest.fn()
});

const falsyValues = [0, false, [], {}, '', undefined, null];

module.exports = {
	mockReq,
	mockRes,
	falsyValues
};
