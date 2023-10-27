const { addSteps } = require('./_middleware/add-steps');
const { getDecisionMadeController } = require('./decision-made/controller');
const { getDuringExaminationController } = require('./during-examination/controller');
const { getInvolvedController } = require('./get-involved/controller');
const { getHaveYourSayGuideController } = require('./index/controller');
const { getRegisteringController } = require('./registering/controller');
const { getTakingPartController } = require('./taking-part/controller');

describe('pages/have-your-say-guide/router', () => {
	const get = jest.fn();

	jest.doMock('express', () => ({
		Router: () => ({
			get
		})
	}));

	beforeEach(() => {
		require('./router');
	});

	it('should call the process guide routes and controllers', () => {
		expect(get).toHaveBeenCalledWith(
			'/having-your-say-guide',
			addSteps,
			getHaveYourSayGuideController
		);
		expect(get).toHaveBeenCalledWith(
			'/having-your-say-guide/index',
			addSteps,
			getHaveYourSayGuideController
		);
		expect(get).toHaveBeenCalledWith(
			'/having-your-say-guide/taking-part-pre-application',
			addSteps,
			getTakingPartController
		);
		expect(get).toHaveBeenCalledWith(
			'/having-your-say-guide/registering-have-your-say',
			addSteps,
			getRegisteringController
		);
		expect(get).toHaveBeenCalledWith(
			'/having-your-say-guide/get-involved-preliminary-meeting',
			addSteps,
			getInvolvedController
		);
		expect(get).toHaveBeenCalledWith(
			'/having-your-say-guide/have-your-say-examination',
			addSteps,
			getDuringExaminationController
		);
		expect(get).toHaveBeenCalledWith(
			'/having-your-say-guide/what-happens-after-decision',
			addSteps,
			getDecisionMadeController
		);
		expect(get).toHaveBeenCalledTimes(7);
	});
});
