import PO_TypeOfParty from "./register-type-of-party/PageObjects/PO_TypeOfParty";

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

    assertUseronThirdPartyPage(pageName) {
        switch (pageName) {
            case "planning inspectorate":
                cy.url().should('include', '/before-you-apply');
                cy.title().should('eq', "Lorem Ipsum");
                cy.wait(Cypress.env('demoDelay'));
                break;
            case "crown copyright":
                cy.url().should('include', '/information-management/re-using-public-sector-information/copyright-and-re-use/crown-copyright/');
                cy.title().should('eq', "Crown copyright - The National Archives");
                cy.wait(Cypress.env('demoDelay'));
                break;
            case "feedback":
                cy.url().should('include', '/Pages/ResponsePage.aspx?id=mN94WIhvq0iTIpmM5VcIjVqzqAxXAi1LghAWTH6Y3OJUOFg4UFdEUThGTlU3S0hFUTlERVYwMVRLTy4u');
                cy.title().should('eq', "Give feedback about submitting your Planning Appeal (Beta)");
                cy.wait(Cypress.env('demoDelay'));
                break;
            default: throw console.error('uanble to find specified page name: ' + pageName);
        }
    }

}
export default PageObject;