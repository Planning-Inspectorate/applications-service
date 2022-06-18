import PageObject from '../../../../PageObject';

class PO_FullName extends PageObject {
	enterTextIntoFullNameField(inputData) {
		super.enterTextIntoField(inputData, '[data-cy="full-name"]');
	}
}
export default PO_FullName;
