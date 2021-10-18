class PO_TypeOfParty {
    navigatetoTypeOfPartyPageURL() {
      cy.visit('/register/type-of-party');
    }
  
    validatePageTitle() {
      cy.title().should('eq', "Type of interested party - Register to have your say");
    }
    
    validateText() {
      const radioOptions = cy.get('#type-of-party');
      assert.exists(radioOptions, 'An person interested in having my say');
      assert.exists(radioOptions, 'Someone registering for an organisation I work or volunteer for');
      assert.exists(radioOptions, 'Someone registering on behalf of anothet person or organisation');
    }
}
export default PO_TypeOfParty;