class PO_FullName{

    validatePageTitleandHeading() {
        cy.title().should('eq', "Your full name - Register to have your say");
        cy.get('h1').invoke('text').then((text) => {
            expect(text).to.contain('What is your full name?');
        })
    }

}
export default PO_FullName;