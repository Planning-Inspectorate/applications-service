class PO_WhoYouRegisterFor {

    navigatetoTypeOfPartyPage() {
        cy.visit('/project-search', { failOnStatusCode: false });
        cy.clickProjectLink('North Lincolnshire Green Energy Park');
        cy.clickOnHref("/register/start");
        cy.clickOnHref('/register/type-of-party');
    }

    validateRadioOptionContent() {
        const radioOptions = cy.get('#type-of-party');
        assert.exists(radioOptions, 'An person interested in having my say');
        assert.exists(radioOptions, 'Someone registering for an organisation I work or volunteer for');
        assert.exists(radioOptions, 'Someone registering on behalf of anothet person or organisation');
    }

}
export default PO_WhoYouRegisterFor;