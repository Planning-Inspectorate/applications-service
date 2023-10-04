const mapApplicationsToCsv = require('../../../src/utils/map-applications-to-csv');

describe('mapApplicationsToCsv', () => {
	it('returns a csv string', () => {
		const applications = [
			{
				CaseReference: 'EN000001',
				ProjectName: 'Test Project',
				PromoterName: 'Test Promoter',
				Proposal: 'Test Proposal',
				Region: 'Test Region',
				ProjectLocation: 'Test Location',
				AnticipatedGridRefEasting: 'Test Easting',
				AnticipatedGridRefNorthing: 'Test Northing',
				LongLat: ['Test Long', 'Test Lat'],
				Stage: 'Test Stage',
				Summary: 'Test Summary',
				AnticipatedDateOfSubmission: 'Test Date Of Submission',
				AnticipatedSubmissionDateNonSpecific: 'Test Submission Date Non Specific',
				DateOfDCOSubmission: 'Test Date Of DCO Submission',
				DateOfDCOAcceptance_NonAcceptance: 'Test Date Of DCO Acceptance Non Acceptance',
				ConfirmedStartOfExamination: 'Test Confirmed Start Of Examination',
				DateTimeExaminationEnds: 'Test Date Time Examination Ends',
				DateOfRecommendations: 'Test Date Of Recommendations',
				ConfirmedDateOfDecision: 'Test Confirmed Date Of Decision',
				DateProjectWithdrawn: 'Test Date Project Withdrawn'
			}
		];

		const result = mapApplicationsToCsv(applications);

		const lines = result.split('\n');
		expect(lines.length).toEqual(3);
		expect(lines[0]).toMatchInlineSnapshot(
			`""Project reference","Project name","Applicant name","Application type","Region","Location","Grid reference - Easting","Grid reference - Northing:","GPS co-ordinates","Stage","Description","Anticipated submission date","Anticipated submission period","Date of application","Date application accepted","Date Examination started","Date Examination closed","Date of recommendation","Date of decision","Date withdrawn""`
		); // headers
		expect(lines[1]).toMatchInlineSnapshot(
			`""EN000001","Test Project","Test Promoter","Test Proposal","Test Region","Test Location","Test Easting","Test Northing","Test Long, Test Lat","Test Stage","Test Summary","Test Date Of Submission","Test Submission Date Non Specific","Test Date Of DCO Submission","Test Date Of DCO Acceptance Non Acceptance","Test Confirmed Start Of Examination","Test Date Time Examination Ends","Test Date Of Recommendations","Test Confirmed Date Of Decision","Test Date Project Withdrawn""`
		); // first value
		expect(lines[2]).toEqual(''); // last line is empty
	});
});
