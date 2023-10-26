const {
	examinationRoute,
	examinationURL,
	examinationTitle,
	examinationContent,
	examinationLinkText
} = require('./config');

describe('pages/process-guide/examination/config', () => {
	it('should return the examination stage config', () => {
		expect(examinationRoute).toEqual('examination-of-the-application');
		expect(examinationURL).toEqual('/decision-making-process-guide/examination-of-the-application');
		expect(examinationTitle).toEqual('Examination');
		expect(examinationContent).toEqual(
			'The examining authority will ask questions about the proposed development. The applicant and anyone who has registered to have their say can get involved and submit comments at each deadline in the timetable. You can also attend hearings that may take place. This stage takes up to 6 months.'
		);
		expect(examinationLinkText).toEqual('What happens at the examination stage');
	});
});
