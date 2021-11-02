class PO_TypeOfParty {
    
    navigatetoTypeOfPartyPage() {
        cy.visit('/register/start');
        cy.clickOnHref("/register/type-of-party");
    }

    validatePageTitleandHeading() {
        cy.title().should('eq', "Type of interested party - Register to have your say");
        cy.get('h1').invoke('text').then((text) => {
            expect(text).to.contain('What type of interested party are you?');
        })
    }

    validateRadioOptionContent() {
        const radioOptions = cy.get('#type-of-party');
        assert.exists(radioOptions, 'An person interested in having my say');
        assert.exists(radioOptions, 'Someone registering for an organisation I work or volunteer for');
        assert.exists(radioOptions, 'Someone registering on behalf of anothet person or organisation');
    }

    assertUseronFullNamePage() {
        cy.url().should('include', '/register/full-name')
        cy.wait(Cypress.env('demoDelay'));
    }

    assertUseronStartPage() {
        cy.url().should('include', '/register/start')
        cy.wait(Cypress.env('demoDelay'));
    }
}
export default PO_TypeOfParty;