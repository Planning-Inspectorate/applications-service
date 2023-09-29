module.exports = (pageName) => {
	switch (pageName.toLowerCase()) {
		case 'taking part in the pre-application stage':
			cy.clickOnHref('/having-your-say-guide/taking-part-pre-application');
			break;
		case 'having your say at pre-application stage':
			cy.clickOnHref('/having-your-say-guide/have-say-pre-application');
			break;
		case 'registering to have your say about a national infrastructure project':
			cy.clickOnHref('/having-your-say-guide/registering-have-your-say');
			break;
		case 'get involved in the preliminary meeting':
			cy.clickOnHref('/having-your-say-guide/get-involved-preliminary-meeting');
			break;
		case 'have your say during the examination of the project':
			cy.clickOnHref('/having-your-say-guide/have-your-say-examination');
			break;
		case 'what you can do after the decision has been made':
			cy.clickOnHref('/having-your-say-guide/what-happens-after-decision');
			break;
		case 'the nationally significant infrastructure planning process step by step':
			cy.clickOnHref('/having-your-say-guide');
			break;
		case 'find out more about the decision making process for national infrastructure projects':
			cy.clickOnHref('/decision-making-process-guide');
			break;
		case 'find out what you can do at this stage and check our detailed guides':
			cy.clickOnHref('pre-application');
			break;
		case 'how the review works and what happens next':
			cy.clickOnHref('review-of-the-application');
			break;
		case 'what happens during the preparation for the examination':
			cy.clickOnHref('pre-examination');
			break;
		case 'what happens at the examination of the application':
			cy.clickOnHref('examination-of-the-application');
			break;
		case 'making a recommendation and who makes the final decision':
			cy.clickOnHref('recommendation-and-decision');
			break;
		case 'what happens after the decision is made':
			cy.clickOnHref('what-happens-after-the-decision-is-made');
			break;
		default:
			throw new Error('Cannot find Page Name: ' + pageName);
	}
};
