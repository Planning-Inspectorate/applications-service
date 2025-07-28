const section51Translations__EN = require('./en.json');

describe('pages/projects/section-51/_translations/en', () => {
	it('should return the english projects translations', () => {
		expect(section51Translations__EN).toEqual({
			heading: 'Section 51 advice',
			adviceTo: 'Advice to',
			anonymous: 'Anonymous',
			dateAdviceGiven: 'Date advice given',
			dateOfMeeting: 'Date of meeting',
			enquiryFrom: 'Enquiry from',
			enquiryType: 'Enquiry type',
			from: 'From',
			readMore: 'Read more',
			meetingWith: 'Meeting with',
			viewAdviceTo: 'View advice to',
			viewMeetingWith: 'View meeting with',
			details: {
				adviceInDetail: 'Advice in detail',
				backToList: 'Back to list',
				enquiry: 'Enquiry',
				adviceGiven: 'Advice given',
				attachments: 'Attachments',
				viewAdvice: 'View advice'
			}
		});
	});
});
