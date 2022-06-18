import PageObject from '../../../PageObject';

class PO_WhoYouRegisterFor extends PageObject {
  navigatetoTypeOfPartyPage() {
    cy.visit('/project-search', { failOnStatusCode: false });
    cy.clickProjectLink('North Lincolnshire Green Energy Park');
    cy.clickOnHref('/register-have-your-say');
    cy.clickOnHref('/register/who-registering-for');
  }

  validateRadioOptionContent() {
    cy.get('#type-of-party');
  }
}
export default PO_WhoYouRegisterFor;
