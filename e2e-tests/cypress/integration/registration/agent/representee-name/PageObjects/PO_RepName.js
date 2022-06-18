import PageObject from '../../../../PageObject';

class PO_RepName extends PageObject {
	enterTextIntoRepNameField(inputData) {
		super.enterTextIntoField(inputData, '[data-cy="full-name"]');
	}
}
export default PO_RepName;
