const {
	postDecisionRoute,
	postDecisionURL,
	postDecisionTitle,
	postDecisionContent,
	postDecisionLinkText
} = require('./config');

describe('pages/process-guide/post-decision/config', () => {
	it('should return the post-decision stage config', () => {
		expect(postDecisionRoute).toEqual('what-happens-after-the-decision-is-made');
		expect(postDecisionURL).toEqual(
			'/decision-making-process-guide/what-happens-after-the-decision-is-made'
		);
		expect(postDecisionTitle).toEqual('What happens after the decision is made');
		expect(postDecisionContent).toEqual(
			'Once the Secretary of State has made a decision, there is a 6-week period where people can challenge the decision in the high court. This is called a judicial review.'
		);
		expect(postDecisionLinkText).toEqual('What you can do after the decision has been made');
	});
});
