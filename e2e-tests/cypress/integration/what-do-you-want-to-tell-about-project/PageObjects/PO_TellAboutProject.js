class PO_TellAboutProject {

    enterTextIntoCommentsField(dataInput) {
        cy.get('#comment').type(dataInput);
    }

    enterTextIntoTopicField(dataInput) {
        cy.get('#topic').type(dataInput);
    }

    assertDoNotIncludePersonalDetailsPresent() {
        cy.get('.govuk-details__summary-text').should('contain.text', 'Do not include any personal details.')
    }

}
export default PO_TellAboutProject;