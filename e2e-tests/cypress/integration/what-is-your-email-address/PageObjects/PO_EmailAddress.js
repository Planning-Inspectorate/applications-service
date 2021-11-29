class PO_EmailAddress {

    enterTextIntoEmailField(dataInput) {
        cy.get('#email').type(dataInput);
    }

}
export default PO_EmailAddress;