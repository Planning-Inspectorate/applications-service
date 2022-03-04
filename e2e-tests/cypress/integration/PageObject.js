class PageObject {
    validateHeaderLogo() {
        const headerLogo = cy.get('.govuk-header__logo');
        assert.exists(headerLogo, 'GOV UK Logo exists');
    }

    validateHeaderContent() {
        const headerLink = cy.get('a.govuk-header__link')
        assert.exists(headerLink, 'Application Service')
        headerLink.should('have.attr', 'href').and('eq', '/');
    }

    clickOnPlanningInspectorateLogo() {
        cy.get('#pins-header__logotype-crest').first().click();
        cy.wait(Cypress.env('demoDelay'));
    }

    clickOnCrownCopyRight() {
        cy.get('a.govuk-footer__link.govuk-footer__copyright-logo').first().click();
        cy.wait(Cypress.env('demoDelay'));
    }

    clickOnProvideFeedbackLink() {
        cy.get('[data-cy="Feedback"]').first().click();
        cy.wait(Cypress.env('demoDelay'));
    }

    enterTextIntoField(dataInput, fieldSelector) {
      if (dataInput.length > 0)
        cy.get(fieldSelector).type(dataInput);
    }

  enterTextIntoFieldDirectly(dataInput, fieldSelector) {
    if (dataInput.length > 0)
      cy.get(fieldSelector).invoke('val', dataInput)
  }

}
export default PageObject;
