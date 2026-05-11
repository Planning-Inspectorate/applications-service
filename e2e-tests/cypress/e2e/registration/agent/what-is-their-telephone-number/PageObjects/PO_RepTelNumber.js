import PageObject from '../../../../PageObject';

class PO_RepTelNumber extends PageObject {
	identifiers = {
		...this.identifiers,
		representeeTelephoneField: '#telephone'
	};

	enterTextIntoRepTelephoneNumberField(dataInput) {
		super.enterTextIntoField(dataInput, this.identifiers.representeeTelephoneField);
	}
}
export default PO_RepTelNumber;
