import PageObject from '../../../../PageObject';

class PO_TelNumber extends PageObject {
	identifiers = {
		...this.identifiers,
		telephoneField: '#telephone'
	};

	enterTextIntoTelephoneNumberField(dataInput) {
		super.enterTextIntoField(dataInput, this.identifiers.telephoneField);
	}
}
export default PO_TelNumber;
