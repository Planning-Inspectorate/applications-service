const { isProjectStatusPostDecision } = require('./is-project-status-post-decision');

describe('pages/projects/get-updates/index/utils/is-project-status-post-decision.js', () => {
	describe('#isProjectStatusPostDecision', () => {
		it('returns true if passed a project status equal or higer to 7', () => {
			expect(isProjectStatusPostDecision(7)).toEqual(true);
		});

		it('returns false if passed project status less than 7', () => {
			expect(isProjectStatusPostDecision(6)).toEqual(false);
			expect(isProjectStatusPostDecision('test')).toEqual(false);
			expect(isProjectStatusPostDecision(null)).toEqual(false);
			expect(isProjectStatusPostDecision(true)).toEqual(false);
		});
	});
});
