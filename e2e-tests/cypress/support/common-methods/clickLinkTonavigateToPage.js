module.exports = (pageName) => {
	switch (pageName.toLowerCase()) {
		case 'the nationally significant infrastructure planning process step by step':
			cy.clickOnHref('/having-your-say-guide/index');
			break;
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
		case 'what happens after a decision has been made':
			cy.clickOnHref('/having-your-say-guide/what-happens-after-decision');
			break;
		case 'find out more about the decision making process for national infrastructure projects':
			cy.clickOnHref('/decision-making-process-guide');
			break;
		case 'find out what you can do at this stage and check our detailed guides':
			cy.clickOnHref('/decision-making-process-guide/pre-application');
			break;
		case 'how the acceptance stage works and what happens next':
			cy.clickOnHref('/decision-making-process-guide/review-of-the-application');
			break;
		case 'what happens during the pre-examination stage':
			cy.clickOnHref('/decision-making-process-guide/pre-examination');
			break;
		case 'what happens at the examination stage':
			cy.clickOnHref('/decision-making-process-guide/examination-of-the-application');
			break;
		case 'making a recommendation':
			cy.clickOnHref('/decision-making-process-guide/recommendation');
			break;
		case 'who makes the final decision':
			cy.clickOnHref('/decision-making-process-guide/decision');
			break;
		case 'what you can do after the decision has been made':
			cy.clickOnHref('/decision-making-process-guide/what-happens-after-the-decision-is-made');
			break;
		default:
			throw new Error('Cannot find Page Name: ' + pageName);
	}
};
