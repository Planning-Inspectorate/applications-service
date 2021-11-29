class PO_TellAboutProject {

    enterTextIntoCommentsField(dataInput) {
        cy.get('#comments').type(dataInput);
    }

}
export default PO_TellAboutProject;