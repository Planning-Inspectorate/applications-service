const section51Translations__CY = require('./cy.json');

describe('pages/projects/section-51/_translations/cy', () => {
	it('should return the welsh projects translations', () => {
		expect(section51Translations__CY).toEqual({
			adviceTo: 'Cyngor i',
			anonymous: 'Dienw',
			dateAdviceGiven: 'Y dyddiad y rhoddwyd y cyngor',
			dateOfMeeting: 'Dyddiad y cyfarfod',
			enquiryFrom: 'Ymholiad gan',
			enquiryType: 'Math o ymholiad',
			from: 'Oddiwrth',
			meetingWith: 'Cyfarfod gyda',
			viewAdviceTo: 'Gweld cyngor i',
			viewMeetingWith: 'Gweld cyfarfod gyda'
		});
	});
});
