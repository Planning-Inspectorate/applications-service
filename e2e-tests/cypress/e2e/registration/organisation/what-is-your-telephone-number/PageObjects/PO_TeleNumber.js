import PageObject from '../../../../PageObject';

class PO_TeleNumber extends PageObject {
	enterTextIntoTelephoneNumberField(dataInput) {
		super.enterTextIntoField(dataInput, '#telephone');
	}
}
export default PO_TeleNumber;
