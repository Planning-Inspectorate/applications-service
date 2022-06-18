import PageObject from '../../../../PageObject';

class PO_RepAddressDetails extends PageObject {
  enterTextFromObjectIntoAddressFields(addressObject) {
    if (addressObject.AddressLine1) {
      cy.get('#line1').type(addressObject.AddressLine1);
    }
    if (addressObject.AddressLine2) {
      cy.get('#line2').type(addressObject.AddressLine2);
    }
    if (addressObject.AddressLine3) {
      cy.get('#line3').type(addressObject.AddressLine3);
    }
    if (addressObject.PostCode) {
      cy.get('#postcode').type(addressObject.PostCode);
    }
    if (addressObject.Country) {
      cy.get('#country').type(addressObject.Country);
    }
  }

  enterTextIntoAddressFields(table) {
    this.enterTextFromObjectIntoAddressFields(table.hashes()[0]);
  }
}
export default PO_RepAddressDetails;
