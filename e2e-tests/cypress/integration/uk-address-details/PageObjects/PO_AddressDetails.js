import PageObject from "../../PageObject";

class PO_AddressDetails extends PageObject{

    enterTextIntoAddressFields(table) {
        const addressFields = table.hashes()
        if (!!addressFields[0].AddressLine1) {
            cy.get('#address-line-1').type(addressFields[0].AddressLine1);
        }
        if (!!addressFields[0].AddressLine2) {
            cy.get('#address-line-2').type(addressFields[0].AddressLine2);
        }
        if (!!addressFields[0].AddressLine3) {
            cy.get('#address-line-3').type(addressFields[0].AddressLine3);
        }
        if (!!addressFields[0].PostCode) {
            cy.get('#address-postcode').type(addressFields[0].PostCode);
        }
        if (!!addressFields[0].Country) {
            cy.get('#address-country').type(addressFields[0].Country);
        }
    }

}
export default PO_AddressDetails;
