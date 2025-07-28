const { examinationMiddleware } = require('./examination.middleware');

describe('pages/examination/_middleware/examination.middleware', () => {
	describe('#examinationMiddleware', () => {
		describe('When the user is viewing the have your say page', () => {
			const req = {
				path: '/have-your-say-during-examination',
				params: {
					case_ref: 'ABC-123'
				}
			};
			const res = {};
			const next = jest.fn();

			beforeEach(() => {
				examinationMiddleware(req, res, next);
			});

			it('should go to the next middleware', () => {
				expect(next).toHaveBeenCalled();
			});
		});

		describe('When the user does not have an examination session', () => {
			describe('and there is no query values present', () => {
				const req = {
					path: '/have-an-interested-party-number',
					params: {
						case_ref: 'ABC-123'
					},
					query: {},
					session: {}
				};
				const res = {
					redirect: jest.fn()
				};
				const next = jest.fn();

				beforeEach(() => {
					examinationMiddleware(req, res, next);
				});

				it('should redirect to the have your say page', () => {
					expect(res.redirect).toHaveBeenCalledWith(
						'/projects/ABC-123/examination/have-your-say-during-examination'
					);
				});
			});

			describe('and there are query values present', () => {
				const req = {
					path: '/have-an-interested-party-number',
					params: {
						case_ref: 'ABC-123'
					},
					query: {
						mockQueryOne: 'mock-value-1',
						mockQueryTwo: 'mock-value-2'
					},
					session: {}
				};
				const res = {
					redirect: jest.fn()
				};
				const next = jest.fn();

				beforeEach(() => {
					examinationMiddleware(req, res, next);
				});

				it('should redirect to the have your say page and maintain the query string', () => {
					expect(res.redirect).toHaveBeenCalledWith(
						'/projects/ABC-123/examination/have-your-say-during-examination?mockQueryOne=mock-value-1&mockQueryTwo=mock-value-2'
					);
				});
			});
		});

		describe('When the user is viewing a examination journey page and does have an examination session', () => {
			const req = {
				path: '/have-an-interested-party-number',
				params: {
					case_ref: 'ABC-123'
				},
				query: {},
				session: {
					examination: {}
				}
			};
			const res = {
				redirect: jest.fn()
			};
			const next = jest.fn();

			beforeEach(() => {
				examinationMiddleware(req, res, next);
			});

			it('should go to the next middleware', () => {
				expect(next).toHaveBeenCalled();
			});
		});
	});
});
