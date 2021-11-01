class PO_FullName{

    validatePageTitleandHeading() {
        cy.title().should('eq', "Your full name - Register to have your say");
        cy.get('h1').invoke('text').then((text) => {
            expect(text).to.contain('What is your full name?');
        })
    }

    assertUseronTypeofInterestedPartyPage() {
        cy.url().should('include', '/register/type-of-party')
        cy.wait(Cypress.env('demoDelay'));
    }

}
export default PO_FullName;