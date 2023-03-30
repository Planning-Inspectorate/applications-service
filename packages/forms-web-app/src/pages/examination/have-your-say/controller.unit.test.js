const { getHaveYourSay } = require('./controller');
const { setupExaminationJourney } = require('./utils/setup/setup-examination-journey');

jest.mock('./utils/setup/setup-examination-journey', () => ({
	setupExaminationJourney: jest.fn()
}));
describe('pages examination have-your-say', () => {
	const req = { session: {}, params: { case_ref: 'mock case ref' }, get: () => 'mock ref' };
	const res = { render: jest.fn(), redirect: jest.fn() };
	const next = jest.fn();
	describe('When rendering the have your say page', () => {
		beforeEach(async () => {
			setupExaminationJourney.mockResolvedValue();
			await getHaveYourSay(req, res, next);
		});
		it('should setup the examination journey', () => {
			expect(setupExaminationJourney).toHaveBeenCalledWith({}, 'mock case ref');
		});
		it('should render the correct data for the view', () => {
			expect(res.render).toHaveBeenCalledWith('examination/have-your-say/view.njk', {
				startNowUrl: 'have-an-interested-party-number'
			});
		});
	});
	describe('When an error has occurred', () => {
		describe('and the error is for no open deadlines', () => {
			beforeEach(async () => {
				setupExaminationJourney.mockRejectedValue(new Error('NO_OPEN_DEADLINES'));
				await getHaveYourSay(req, res, next);
			});
			it('should redirect to the  no open deadline page', () => {
				expect(res.render).toHaveBeenCalledWith('examination/have-your-say/no-deadlines-view.njk');
			});
		});
		describe('and there is an error', () => {
			const error = new Error('BAD ERROR');
			beforeEach(async () => {
				setupExaminationJourney.mockRejectedValue(error);
				await getHaveYourSay(req, res, next);
			});
			it('should redirect to the  no open deadline page', () => {
				expect(next).toHaveBeenCalledWith(error);
			});
		});
	});
});
