class PageObject { 
    validateHeaderLogo() {
      const headerLogo = cy.get('.govuk-header__logotype');
      assert.exists(headerLogo, 'GOV UK Logo exists');
    }
  
    pageHeaderlink() {
      const headerLink = cy.get('.govuk-header__content > .govuk-header__link')
      assert.exists(headerLink, 'Application Service')
      headerLink.should('have.attr', 'href').and('eq', '/');
    }
}
export default PageObject;