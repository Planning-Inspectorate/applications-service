import PageObject from '../../../../PageObject';

class PO_AddressDetails extends PageObject {
	identifiers = {
		...this.identifiers,
		addressFields: {
			line1: () => cy.get('#line1'),
			line2: () => cy.get('#line2'),
			line3: () => cy.get('#line3'),
			postcode: () => cy.get('#postcode'),
			country: () => cy.get('#country')
		}
	};

	enterTextFromObjectIntoAddressFields(addressObject) {
		super.enterAddressIntoFields(addressObject, this.identifiers.addressFields);
	}

	enterTextIntoAddressFields(table) {
		this.enterTextFromObjectIntoAddressFields(table.hashes()[0]);
	}
}
export default PO_AddressDetails;
