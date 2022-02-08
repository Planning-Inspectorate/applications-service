class PO_NameofOrgYouWorkFor {

    enterNameOfOrgYouWorkFor(dataInput) {
        cy.get('#organisation-name').type(dataInput);
    }

}
export default PO_NameofOrgYouWorkFor;