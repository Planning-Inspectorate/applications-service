module.exports = (pageName) => {
    switch (pageName.toLowerCase()) {
        case "taking part in the pre-application stage":
            cy.clickOnHref('/having-your-say-guide/taking-part-pre-application');
            break;
        case "having your say at pre-application stage":
            cy.clickOnHref('/having-your-say-guide/have-say-pre-application');
            break;
        case "registering to have your say about a national infrastructure project":
            cy.clickOnHref('/having-your-say-guide/registering-have-your-say');
            break;
        case "get involved in the preliminary meeting":
            cy.clickOnHref('/having-your-say-guide/get-involved-preliminary-meeting');
            break;
        case "have your say during the examination of the project":
            cy.clickOnHref('/having-your-say-guide/have-your-say-examination');
            break;
        case "what you can do after the decision has been made":
            cy.clickOnHref('/having-your-say-guide/what-happens-after-decision');
            break;
        case "the nationally significant infrastructure planning process step by step":
            cy.clickOnHref('/having-your-say-guide/index');
            break;
    }
};