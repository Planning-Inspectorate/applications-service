class PO_OverviewPage {

    validatePageTitleandHeading() {
        cy.title().should('eq', "A404 Dewsbury project overview");
        cy.get('h1').invoke('text').then((text) => {
            expect(text).to.contain('A404 Dewsbury project information');
        })
    }

    assertUseronStartPage() {
        cy.url().should('include', '/register/start')
        cy.wait(Cypress.env('demoDelay'));
    }

}
export default PO_OverviewPage;