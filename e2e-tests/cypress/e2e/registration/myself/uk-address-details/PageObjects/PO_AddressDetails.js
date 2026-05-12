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

	enterTextIntoAddressFields(table) {
		super.enterAddressIntoFields(table.hashes()[0], this.identifiers.addressFields);
	}
}
export default PO_AddressDetails;
