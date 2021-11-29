class PO_FullName{

    enterTextIntoFullNameField(inputData) {
        cy.get('[data-cy="full-name"]').type(inputData);
    }

}
export default PO_FullName;