const section51Translations__EN = require('./en.json');

describe('pages/projects/section-51/_translations/en', () => {
	it('should return the english projects translations', () => {
		expect(section51Translations__EN).toEqual({
			adviceTo: 'Advice to',
			anonymous: 'Anonymous',
			dateAdviceGiven: 'Date advice given',
			dateOfMeeting: 'Date of meeting',
			enquiryFrom: 'Enquiry from',
			enquiryType: 'Enquiry type',
			from: 'From',
			meetingWith: 'Meeting with',
			viewAdviceTo: 'View advice to',
			viewMeetingWith: 'View meeting with'
		});
	});
});
