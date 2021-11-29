module.exports = (radioChoice) => {
    switch (radioChoice) {
        case "Yes":
            cy.get('[data-cy="answer-yes"]').click();
            break;
        case "No":
            cy.get('[data-cy="answer-no"]').click();
            break;
        default: throw console.error('uanble to find specified radio option: ' + radioChoice);
    }

    cy.wait(Cypress.env('demoDelay'));
};