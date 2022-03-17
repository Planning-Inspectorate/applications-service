import PageObject from "../../../../PageObject";

class PO_AddressDetails extends PageObject{

    enterTextFromObjectIntoAddressFields(addressObject) {
      if (!!addressObject.AddressLine1) {
        cy.get('#address-line-1').type(addressObject.AddressLine1);
      }
      if (!!addressObject.AddressLine2) {
        cy.get('#address-line-2').type(addressObject.AddressLine2);
      }
      if (!!addressObject.AddressLine3) {
        cy.get('#address-line-3').type(addressObject.AddressLine3);
      }
      if (!!addressObject.PostCode) {
        cy.get('#address-postcode').type(addressObject.PostCode);
      }
      if (!!addressObject.Country) {
        cy.get('#address-country').type(addressObject.Country);
      }
    }

  enterTextIntoAddressFields(table) {
    this.enterTextFromObjectIntoAddressFields(table.hashes()[0])
  }

}
export default PO_AddressDetails;