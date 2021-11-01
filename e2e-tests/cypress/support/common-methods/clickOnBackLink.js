module.exports = () => {
    cy.get('[data-cy="back"]').first().click();
    cy.wait(Cypress.env('demoDelay'));
  };