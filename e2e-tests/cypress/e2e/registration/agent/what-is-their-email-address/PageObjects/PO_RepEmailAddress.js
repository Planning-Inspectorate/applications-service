import PageObject from '../../../../PageObject';

class PO_RepEmailAddress extends PageObject {
	enterTextIntoRepEmailField(dataInput) {
		super.enterTextIntoField(dataInput, '#email');
	}
}
export default PO_RepEmailAddress;
