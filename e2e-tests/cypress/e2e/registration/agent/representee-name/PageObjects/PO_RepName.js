import PageObject from '../../../../PageObject';

class PO_RepName extends PageObject {
	identifiers = {
		...this.identifiers,
		representeeNameField: '[data-cy="full-name"]'
	};

	enterTextIntoRepNameField(inputData) {
		super.enterTextIntoField(inputData, this.identifiers.representeeNameField);
	}
}
export default PO_RepName;
