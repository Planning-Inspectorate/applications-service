class PO_StartPage {

    assertUseronTypeofPartyPage() {
        cy.url().should('include', '/register/type-of-party')
        cy.wait(Cypress.env('demoDelay'));
    }

    validatePageTitleandHeading() {
        cy.title().should('eq', "Start registration");
        cy.get('h1').invoke('text').then((text) => {
            expect(text).to.contain('Register to have your say');
        })
    }

}
export default PO_StartPage;