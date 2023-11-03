const {
	preApplicationRoute,
	preApplicationURL,
	preApplicationTitle,
	preApplicationContent,
	preApplicationLinkText
} = require('./config');

describe('pages/process-guide/pre-application/config', () => {
	it('should return the pre-application stage config', () => {
		expect(preApplicationRoute).toEqual('pre-application');
		expect(preApplicationURL).toEqual('/decision-making-process-guide/pre-application');
		expect(preApplicationTitle).toEqual('Pre-application');
		expect(preApplicationContent).toEqual([
			'This is where the applicant starts to create their application. The applicant is required to run a consultation and engage with people and organisations in the area. They must also create detailed documents about the impact the project could have on the environment.',
			'It is important to get involved at this stage to influence the application before the applicant sends it to the Planning Inspectorate.'
		]);
		expect(preApplicationLinkText).toEqual(
			'Find out what you can do at this stage and check our detailed guides'
		);
	});
});
