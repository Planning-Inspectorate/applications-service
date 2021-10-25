module.exports = (table) => {
    cy.title().should('include', 'Error: ');
    const expectedErrorMsg = table.hashes()
    cy.confirmTextOnPage(expectedErrorMsg[0].ErrorMsg);
}