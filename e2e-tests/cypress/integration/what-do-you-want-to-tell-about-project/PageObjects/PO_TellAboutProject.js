class PO_TellAboutProject {

    enterTextIntoCommentsField(dataInput) {
        cy.get('#comment').type(dataInput);
    }

    enterTextIntoTopicField(dataInput) {
        cy.get('#topic').type(dataInput);
    }

}
export default PO_TellAboutProject;