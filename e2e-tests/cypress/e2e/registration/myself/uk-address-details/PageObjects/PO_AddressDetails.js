import PageObject from '../../../../PageObject';

class PO_AddressDetails extends PageObject {
	enterTextIntoAddressFields(table) {
		const addressFields = table.hashes();
		if (addressFields[0].AddressLine1) {
			cy.get('#line1').type(addressFields[0].AddressLine1);
		}
		if (addressFields[0].AddressLine2) {
			cy.get('#line2').type(addressFields[0].AddressLine2);
		}
		if (addressFields[0].AddressLine3) {
			cy.get('#line3').type(addressFields[0].AddressLine3);
		}
		if (addressFields[0].PostCode) {
			cy.get('#postcode').type(addressFields[0].PostCode);
		}
		if (addressFields[0].Country) {
			cy.get('#country').type(addressFields[0].Country);
		}
	}
}
export default PO_AddressDetails;
