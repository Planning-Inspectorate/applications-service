class PO_TeleNumber {

    enterTextIntoTelephoneNumberField(dataInput) {
        cy.get('#telephone').type(dataInput);
    }

}
export default PO_TeleNumber;