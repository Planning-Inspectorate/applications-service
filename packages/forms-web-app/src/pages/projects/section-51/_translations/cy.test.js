const section51Translations__CY = require('./cy.json');

describe('pages/projects/section-51/_translations/cy', () => {
	it('should return the welsh projects translations', () => {
		expect(section51Translations__CY).toEqual({
			heading: 'Cyngor Adran 51',
			adviceTo: 'Cyngor i',
			anonymous: 'Dienw',
			dateAdviceGiven: 'Y dyddiad y rhoddwyd y cyngor',
			dateOfMeeting: 'Dyddiad y cyfarfod',
			enquiryFrom: 'Ymholiad gan',
			enquiryType: 'Math o ymholiad',
			from: 'Oddiwrth',
			readMore: 'Darllen mwy',
			meetingWith: 'Cyfarfod gyda',
			viewAdviceTo: 'Gweld cyngor i',
			viewMeetingWith: 'Gweld cyfarfod gyda',
			details: {
				adviceInDetail: 'Cyngor mewn manylder',
				backToList: "Yn ôl i'r rhestr",
				enquiry: 'Ymholiad',
				adviceGiven: 'Cyngor a roddwyd',
				attachments: 'Atodiadau',
				viewAdvice: 'Gweld y cyngor'
			}
		});
	});
});
