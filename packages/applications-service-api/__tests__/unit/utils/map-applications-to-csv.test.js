describe('mapApplicationsToCSV', () => {
	beforeEach(() => {
		jest.mock('../../../src/lib/config', () => ({
			backOfficeIntegration: {
				blobStorage: {
					docsURL: 'https://nsip-documents.planninginspectorate.gov.uk/'
				}
			}
		}));
		jest.resetModules();
	});

	describe('mapApplicationsToCsv', () => {
		it('returns a csv string', () => {
			const { mapApplicationsToCSV } = require('../../../src/utils/map-applications-to-csv');
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
					Stage: 1,
					Summary: 'Test Summary',
					AnticipatedDateOfSubmission: 'Test Date Of Submission',
					AnticipatedSubmissionDateNonSpecific: 'Test Submission Date Non Specific',
					DateOfDCOSubmission: 'Test Date Of DCO Submission',
					DateOfDCOAcceptance_NonAcceptance: 'Test Date Of DCO Acceptance Non Acceptance',
					ConfirmedStartOfExamination: 'Test Confirmed Start Of Examination',
					DateTimeExaminationEnds: '2024-01-01 00:00:00',
					DateOfRecommendations: 'Test Date Of Recommendations',
					ConfirmedDateOfDecision: 'Test Confirmed Date Of Decision',
					DateProjectWithdrawn: 'Test Date Project Withdrawn'
				},
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
					Stage: 2,
					sourceSystem: 'back-office-applications',
					Summary: 'Test Summary',
					AnticipatedDateOfSubmission: 'Test Date Of Submission',
					AnticipatedSubmissionDateNonSpecific: 'Test Submission Date Non Specific',
					DateOfDCOSubmission: 'Test Date Of DCO Submission',
					DateOfDCOAcceptance_NonAcceptance: 'Test Date Of DCO Acceptance Non Acceptance',
					ConfirmedStartOfExamination: 'Test Confirmed Start Of Examination',
					DateTimeExaminationEnds: '2024-01-01 00:00:00',
					DateOfRecommendations: 'Test Date Of Recommendations',
					ConfirmedDateOfDecision: 'Test Confirmed Date Of Decision',
					DateProjectWithdrawn: 'Test Date Project Withdrawn',
					isMaterialChange: true
				},
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
					Stage: 3,
					sourceSystem: 'back-office-applications',
					Summary: 'Test Summary',
					AnticipatedDateOfSubmission: 'Test Date Of Submission',
					AnticipatedSubmissionDateNonSpecific: 'Test Submission Date Non Specific',
					DateOfDCOSubmission: 'Test Date Of DCO Submission',
					DateOfDCOAcceptance_NonAcceptance: 'Test Date Of DCO Acceptance Non Acceptance',
					ConfirmedStartOfExamination: 'Test Confirmed Start Of Examination',
					DateTimeExaminationEnds: '2024-01-01 00:00:00',
					DateOfRecommendations: 'Test Date Of Recommendations',
					ConfirmedDateOfDecision: 'Test Confirmed Date Of Decision',
					DateProjectWithdrawn: 'Test Date Project Withdrawn',
					isMaterialChange: true
				}
			];

			const result = mapApplicationsToCSV(applications);

			const lines = result.split('\n');
			expect(lines.length).toEqual(8);
			expect(lines[0]).toMatchInlineSnapshot(
				`""Project reference","Project name","Applicant name","Application type","Region","Location","Grid reference - Easting","Grid reference - Northing:","GPS co-ordinates","Stage","Description","Anticipated submission period","Date of application","Date application accepted","Date Examination started","Date Examination closed","Date of recommendation","Date of decision","Date withdrawn""`
			); // headers
			expect(lines[1]).toMatchInlineSnapshot(
				`""EN000001","Test Project","Test Promoter","Test Proposal","Test Region","Test Location","Test Easting","Test Northing","Test Long, Test Lat","Pre-application","Test Summary","Test Submission Date Non Specific","Test Date Of DCO Submission","Test Date Of DCO Acceptance Non Acceptance","Test Confirmed Start Of Examination","2024-01-01 00:00:00","Test Date Of Recommendations","Test Confirmed Date Of Decision","Test Date Project Withdrawn""`
			); // first value
			expect(lines[2]).toMatchInlineSnapshot(
				`""EN000001","Test Project","Test Promoter","Test Proposal","Test Region","Test Location","Test Easting","Test Northing","Test Long, Test Lat","Application received","Test Summary","Test Submission Date Non Specific","Test Date Of DCO Submission","Test Date Of DCO Acceptance Non Acceptance","Test Confirmed Start Of Examination","2024-01-01 00:00:00","Test Date Of Recommendations","Test Confirmed Date Of Decision","Test Date Project Withdrawn""`
			);
			expect(lines[3]).toMatchInlineSnapshot(
				`""EN000001","Test Project","Test Promoter","Test Proposal","Test Region","Test Location","Test Easting","Test Northing","Test Long, Test Lat","Application published","Test Summary","Test Submission Date Non Specific","Test Date Of DCO Submission","Test Date Of DCO Acceptance Non Acceptance","Test Confirmed Start Of Examination","2024-01-01 00:00:00","Test Date Of Recommendations","Test Confirmed Date Of Decision","Test Date Project Withdrawn""`
			);
			expect(lines[4]).toEqual(',,,,,,,,,,,,,,,,,,'); // empty row
			expect(lines[5]).toEqual(',,,,,,,,,,,,,,,,,,'); // empty row
			expect(lines[6]).toContain(
				'To view the quality guide for this data paste this url into your browser:'
			);
			expect(lines[6]).toContain(
				'https://nsip-documents.planninginspectorate.gov.uk/published-documents/NSIP%20projects%20data%20quality%20guide.xlsx'
			);
		});
	});

	describe('getUrlForBlobStoreDocs', () => {
		it('returns the correct URL for production environment', () => {
			const getUrlForBlobStoreDocsTest = require('../../../src/utils/get-url-for-blob-store-docs');
			expect(getUrlForBlobStoreDocsTest()).toBe(
				'https://nsip-documents.planninginspectorate.gov.uk/'
			);
		});

		it('throws an error if AZURE_BLOB_STORE_HOST is not set', () => {
			jest.unmock('../../../src/lib/config');
			const getUrlForBlobStoreDocsTest = require('../../../src/utils/get-url-for-blob-store-docs');
			expect(() => getUrlForBlobStoreDocsTest()).toThrow(
				'AZURE_BLOB_STORE_HOST environment variable is not set'
			);
		});
	});

	describe('getUrlForQualityDataGuide', () => {
		it('returns the correct URL for quality data guide', () => {
			const { getUrlForQualityDataGuide } = require('../../../src/utils/map-applications-to-csv');
			expect(getUrlForQualityDataGuide()).toBe(
				'https://nsip-documents.planninginspectorate.gov.uk/published-documents/NSIP%20projects%20data%20quality%20guide.xlsx'
			);
		});
	});
});
