const {
	decisionRoute,
	decisionURL,
	decisionTitle,
	decisionContent,
	decisionLinkText
} = require('./config');

describe('pages/process-guide/decision/config', () => {
	it('should return the decision stage config', () => {
		expect(decisionRoute).toEqual('decision');
		expect(decisionURL).toEqual('/decision-making-process-guide/decision');
		expect(decisionTitle).toEqual('Decision');
		expect(decisionContent).toEqual(
			'The decision stage is when the relevant Secretary of State then reviews the report and makes the final decision. They have 3 months to make a decision.'
		);
		expect(decisionLinkText).toEqual('Who makes the final decision.');
	});
});
