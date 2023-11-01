const { plannedOutage } = require('../../../src/middleware/planned-outage');
const config = require('../../../src/config');

jest.mock('../../../src/config', () => {
	const originalConfig = jest.requireActual('../../../src/config');
	return {
		...originalConfig,
		plannedServiceOutage: {
			showOutagePage: true,
			outageResumeText: 'Mock resume text'
		}
	};
});

describe('middleware/planned-outage', () => {
	let req;
	let res;
	const next = jest.fn();

	beforeEach(() => {
		res = {
			set: jest.fn(),
			render: jest.fn()
		};
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should not render the error page if showOutagePage is false', () => {
		config.plannedServiceOutage.showOutagePage = false;

		plannedOutage(req, res, next);
		expect(res.render).not.toHaveBeenCalledWith('error/planned-outage.njk');
	});

	it('should render planned-outage.njk if showOutagePage is true with outageResumeText', () => {
		config.plannedServiceOutage.showOutagePage = true;

		plannedOutage(req, res, next);
		expect(next).not.toHaveBeenCalled();
		expect(res.render).toHaveBeenCalledWith('error/planned-outage.njk', {
			outageResumeText: 'Mock resume text'
		});
	});
});
