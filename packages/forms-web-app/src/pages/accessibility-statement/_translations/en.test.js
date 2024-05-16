const enAccessibilityStatementTranslations = require('./en.json');

describe('pages/accessibility-statement/_translations/en', () => {
	it('should return the english accessibility statement page translations', () => {
		expect(enAccessibilityStatementTranslations).toEqual({
			heading1: 'Accessibility statement for national infrastructure projects',
			paragraph1: 'This accessibility statement applies to',
			heading2: 'Using this service',
			paragraph2:
				'This website is run by the Planning Inspectorate. We want as many people as possible to be able to use this website. For example, that means you should be able to:',
			listItem1: 'change colours, contrast levels and fonts',
			listItem2: 'zoom in up to 300% without the text spilling off the screen',
			listItem3: 'navigate most of the website using just a keyboard',
			listItem4: 'navigate most of the website using speech recognition software',
			listItem5:
				'listen to most of the website using a screen reader (including the most recent versions of JAWS, NVDA and VoiceOver)',
			paragraph3: "We've also made the text as simple as possible to understand.",
			paragraph4:
				'{{-link}} has advice on making your device easier to use if you have a disability.',
			paragraph4LinkText: 'AbilityNet',
			heading3: 'How accessible this website is',
			paragraph5: 'This service is partially compliant with the {{-link}} AA standard.',
			paragraph5LinkText: 'Web Content Accessibility Guidelines version 2.1',
			paragraph6: 'We know some parts of this website are not fully accessible:',
			listItem6: 'some pages and document attachments are not written in plain English',
			listItem7: 'many documents are in PDF format and are not accessible',
			listItem8: 'there may be some links which do not provide enough context',
			listItem9:
				'people using assistive technology may find some parts of the site difficult to navigate',
			paragraph7:
				'The compliance status section below gives more detail on the areas of the site that are not fully accessible.',
			heading4: 'Feedback and contact information',
			paragraph8:
				'If you need information on this website in a different format like accessible PDF, large print, easy read, audio recording or braille:',
			listItem10: 'Email:',
			listItem11: 'Call:',
			paragraph9: "We'll consider your request and get back to you in 10 working days.",
			heading5: 'Reporting accessibility problems with this service',
			paragraph10:
				"We're always looking to improve the accessibility of this website. If you find any problems not listed on this page or think we're not meeting accessibility requirements, email us at: ",
			heading6: 'Enforcement procedure',
			paragraph11:
				"If you contact us with a complaint and you're not happy with our response {{-link}}.",
			paragraph11LinkText: 'contact the Equality Advisory and Support Service (EASS)',
			paragraph12:
				"The Equality and Human Rights Commission (EHRC) is responsible for enforcing the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018 (the ‘accessibility regulations').",
			heading7: "Technical information about this website's accessibility",
			paragraph13:
				'The Planning Inspectorate is committed to making its websites accessible, in accordance with the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018.',
			heading8: 'Compliance status',
			paragraph14:
				'This website is partially compliant with the Web Content Accessibility Guidelines version 2.1 AA standard. The non-compliances are listed below.',
			heading9: 'Non-accessible content',
			paragraph15: 'The content listed below is non-accessible for the following reasons.',
			heading10: 'Non-compliance with the accessibility regulations',
			listItem12:
				'It has been observed that if a user is navigating the page with Dragon Naturally Speaking enabled, they are unable to expand the additional information on the Project Information details components. This does not comply with WCAG Level A 2.1: 4.1.2 Name, Role, Value. This issue requires a fix in Dragon Naturally Speaking. As an alternative, users can use MouseGrid, a feature in the Windows Speech Recognition app.',
			listItem13:
				'If a user is navigating the page with iOS VoiceOver enabled, the user is not notified that there is additional information which has not been expanded on the screen. Because of this, the user would not know that there is more information within the Project Information components to be heard. If the user does click on the section to expand it, there is also no announcement to say this has happened. This does not comply with WCAG Level A 2.1: Name, Role, Value.',
			listItem14:
				'For users of assistive technology the ability to upload files with Dragon Naturally Speaking software fails. This does not comply with WCAG Level A 2.1: 4.1.2 Name, Role, Value.',
			heading11: 'PDFs and non-HTML documents',
			paragraph16:
				"Many documents are not accessible in a number of ways including missing text alternatives and missing document structure. For example, they may not be structured so they're accessible to a screen reader. This does not meet WCAG 2.1 success criterion 4.1.2. Some of our PDFs and Word documents are essential to providing our services. For example, we have PDFs with information on how users can access our services, and forms published as Word documents.",
			listItem15: 'some of our PDFs are not accessible as they are not tagged properly',
			listItem16:
				'some PDFs, Word and Excel documents fail on the perceivable and operable WCAG2 criteria',
			listItem17:
				'a few of our documents have diagrams. These images do not have a text alternative.',
			listItem18:
				'some of the documents we publish are produced by third parties. We are not always able to make these fully compliant',
			paragraph17:
				'View the {{-link}} of the organisation that published the document to report any problems or request documents in an alternative format. If more than one organisation is listed, view the accessible document policy of the first.',
			paragraph17LinkText: 'accessible document policy',
			paragraph18: 'Where possible, we try to fix these as soon as we can.',
			heading12: "Content that's not within the scope of the accessibility regulations",
			heading13: 'PDFs and other documents',
			paragraph19:
				'Some of our PDFs and Word documents are essential to providing our services. For example, we have PDFs with information on how users can access our services, and forms published as Word documents.',
			paragraph20:
				"The accessibility regulations {{-link}} if they're not essential to providing our services.",
			paragraph20LinkText:
				'do not require us to fix PDFs or other documents published before 23 September 2018',
			heading14: 'Preparation of this accessibility statement ',
			paragraph21:
				'An accessibility report of the service took place in October 2023. This statement was prepared and last reviewed on the 8th of November 2023. This service is tested at least monthly by the team that maintains it, and periodically by external bodies.'
		});
	});
});