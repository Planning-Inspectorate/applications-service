module.exports = (radioChoice) => {
    switch (radioChoice) {
        case "An person interested in having my say":
            cy.get('[data-cy="answer-mySay"]').click();
            break;
        case "Someone registering for an organisation I work or volunteer for":
            cy.get('[data-cy="answer-organisation"]').click();
            break;
        case "Someone registering on behalf of anothet person or organisation":
            cy.get('[data-cy="answer-behalfOfOrganisation"]').click();
            break;
        default: throw console.error('uanble to find specified radio option: ' + radioChoice);
    }

    cy.wait(Cypress.env('demoDelay'));
};