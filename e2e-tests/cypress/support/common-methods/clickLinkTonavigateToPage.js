module.exports = (pageName) => {
    switch (pageName.toLowerCase()) {
        case "taking part in the pre-application stage":
            cy.clickOnHref('/interested-party-guide/have-say-pre-application');
            break;
        case "registering to have your say about a national infrastructure project":
            cy.clickOnHref('/interested-party-guide/register-to-have-your-say');
            break;
        case "get involved in the preliminary meeting":
            cy.clickOnHref('/interested-party-guide/get-involved-preliminary-meetings');
            break;
        case "have your say during the examination of the project":
            cy.clickOnHref('/interested-party-guide/have-say-during-project-examination');
            break;
        case "what you can do after the decision has been made":
            cy.clickOnHref('/interested-party-guide/after-making-the-decision');
            break;
        case "the nationally significant infrastructure planning process step by step":
            cy.clickOnHref('/interested-party-guide/index');
            break;
    }
};