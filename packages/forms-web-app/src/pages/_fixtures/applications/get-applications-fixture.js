const getApplicationsFixture = {
	resp_code: 200,
	data: {
		applications: [
			{
				AnticipatedGridRefEasting: 594934,
				AnticipatedGridRefNorthing: 5636170,
				AnticipatedSubmissionDateNonSpecific: '',
				ApplicantEmailAddress: '',
				ApplicantPhoneNumber: '',
				CaseReference: 'TR010001',
				ConfirmedDateOfDecision: null,
				ConfirmedStartOfExamination: null,
				DateOfDCOAcceptance_NonAcceptance: '2019-06-06',
				DateOfDCOSubmission: '2018-01-01',
				dateOfNonAcceptance: '2019-06-06T00:00:00.000Z',
				DateOfPreliminaryMeeting: '2020-01-01',
				DateOfRecommendations: null,
				DateOfRelevantRepresentationClose: '2019-05-06',
				DateOfRepresentationPeriodOpen: '2019-05-06',
				DateProjectWithdrawn: null,
				DateRRepAppearOnWebsite: '2019-06-06',
				DateTimeExaminationEnds: '2021-07-07T00:00:00.000Z',
				MapZoomLevel: 7,
				ProjectEmailAddress: '',
				ProjectLocation: 'Somerset - Monday PM 23/12',
				ProjectLocationWelsh: 'Somerset - Monday PM 23/12 Welsh',
				ProjectName: 'Accessibility Test',
				ProjectNameWelsh: 'Accessibility Test Welsh',
				PromoterFirstName: null,
				PromoterLastName: 'lastname',
				PromoterName: 'EDF',
				Proposal: 'EN01 - Generating Stations',
				Region: 'South West',
				sourceSystem: 'HORIZON',
				Stage: 4,
				Stage4ExtensiontoExamCloseDate: null,
				Stage5ExtensiontoDecisionDeadline: null,
				stage5ExtensionToRecommendationDeadline: null,
				Summary: 'MC 5 09-01-2019 part 3',
				WebAddress: 'wp-test',
				LongLat: ['-11.543792740342', '100.58954279911']
			},
			{
				AnticipatedGridRefEasting: 64756,
				AnticipatedGridRefNorthing: 745764,
				AnticipatedSubmissionDateNonSpecific: null,
				ApplicantEmailAddress: 'john.burke@planninginpsectorate.gov.uk',
				ApplicantPhoneNumber: '01179244548',
				CaseReference: 'TR023024',
				ConfirmedDateOfDecision: null,
				ConfirmedStartOfExamination: '2020-03-30',
				DateOfDCOAcceptance_NonAcceptance: null,
				DateOfDCOSubmission: null,
				dateOfNonAcceptance: '2022-11-30T00:00:00.000Z',
				DateOfPreliminaryMeeting: null,
				DateOfRecommendations: null,
				DateOfRelevantRepresentationClose: '2020-04-10',
				DateOfRepresentationPeriodOpen: '2020-03-30',
				DateProjectWithdrawn: null,
				DateRRepAppearOnWebsite: '2020-04-14',
				DateTimeExaminationEnds: '2020-04-14T12:00:00.000Z',
				MapZoomLevel: 9,
				ProjectEmailAddress: 'NIEnquiries@planninginspectorate.gov.uk',
				ProjectLocation: 'Bristol',
				ProjectLocationWelsh: 'Bristol Welsh',
				ProjectName: 'April 7 2020',
				ProjectNameWelsh: 'April 7 2020 Welsh',
				PromoterFirstName: null,
				PromoterLastName: 'John Agent Burke',
				PromoterName: 'John Agent Burke',
				Proposal: 'TR02 - Airports',
				Region: 'South West',
				sourceSystem: 'Picaso',
				Stage: 1,
				Stage4ExtensiontoExamCloseDate: null,
				Stage5ExtensiontoDecisionDeadline: null,
				stage5ExtensionToRecommendationDeadline: null,
				Summary: 'This is a RR related testing Case',
				WebAddress: 'google.com',
				LongLat: ['-7.4472854473807', '56.484360139339']
			},
			{
				AnticipatedGridRefEasting: 594934,
				AnticipatedGridRefNorthing: 5636170,
				AnticipatedSubmissionDateNonSpecific: '',
				ApplicantEmailAddress: '',
				ApplicantPhoneNumber: '',
				CaseReference: 'tr033005',
				ConfirmedDateOfDecision: null,
				ConfirmedStartOfExamination: null,
				DateOfDCOAcceptance_NonAcceptance: '2019-06-06',
				DateOfDCOSubmission: '2018-01-01',
				dateOfNonAcceptance: '2022-11-30T00:00:00.000Z',
				DateOfPreliminaryMeeting: null,
				DateOfRecommendations: null,
				DateOfRelevantRepresentationClose: null,
				DateOfRepresentationPeriodOpen: '2019-05-06',
				DateProjectWithdrawn: null,
				DateRRepAppearOnWebsite: null,
				DateTimeExaminationEnds: null,
				MapZoomLevel: 7,
				ProjectEmailAddress: '',
				ProjectLocation: 'Somerset - cache test 03-02 15:44',
				ProjectLocationWelsh: 'Somerset - cache test 03-02 15:44 Welsh',
				ProjectName: 'Azure Performance Test',
				ProjectNameWelsh: 'Azure Performance Test Welsh',
				PromoterFirstName: null,
				PromoterLastName: 'lastname',
				PromoterName: 'EDF',
				Proposal: 'EN01 - Generating Stations',
				Region: 'South West',
				sourceSystem: 'Picaso',
				Stage: 2,
				Stage4ExtensiontoExamCloseDate: null,
				Stage5ExtensiontoDecisionDeadline: null,
				stage5ExtensionToRecommendationDeadline: null,
				Summary: 'MC 5 09-01-2019 part 3 Jun 2021',
				WebAddress: 'wp-test',
				LongLat: ['-3.1382838893284', '57.656841271173']
			}
		],
		totalItems: 21,
		totalItemsWithoutFilters: 21,
		currentPage: 1,
		itemsPerPage: 3,
		totalPages: 7,
		filters: [
			{
				name: 'stage',
				value: 'pre_application',
				label: 'Pre-application',
				count: 2
			},
			{
				name: 'stage',
				value: 'acceptance',
				label: 'Acceptance',
				count: 1
			},
			{
				name: 'stage',
				value: 'pre_examination',
				label: 'Pre-examination',
				count: 5
			},
			{
				name: 'stage',
				value: 'examination',
				label: 'Examination',
				count: 11
			},
			{
				name: 'stage',
				value: 'post_decision',
				label: 'Post-decision',
				count: 2
			},
			{
				name: 'region',
				value: 'wales',
				label: 'Wales',
				count: 1
			},
			{
				name: 'region',
				value: 'eastern',
				label: 'Eastern',
				count: 1
			},
			{
				name: 'region',
				value: 'south_east',
				label: 'South East',
				count: 3
			},
			{
				name: 'region',
				value: 'south_west',
				label: 'South West',
				count: 11
			},
			{
				name: 'region',
				value: 'yorkshire_and_the_humber',
				label: 'Yorkshire and the Humber',
				count: 1
			},
			{
				name: 'region',
				value: 'west_midlands',
				label: 'West Midlands',
				count: 1
			},
			{
				name: 'region',
				value: 'east_midlands',
				label: 'East Midlands',
				count: 1
			},
			{
				name: 'region',
				value: 'north_east',
				label: 'North East',
				count: 1
			},
			{
				name: 'region',
				value: 'london',
				label: 'London',
				count: 1
			},
			{
				name: 'sector',
				value: 'energy',
				label: 'Energy',
				count: 16
			},
			{
				name: 'sector',
				value: 'transport',
				label: 'Transport',
				count: 5
			}
		]
	}
};

module.exports = {
	getApplicationsFixture
};
