import PageObject from '../../../../PageObject';

class PO_FullName extends PageObject {
	identifiers = {
		...this.identifiers,
		fullNameField: '[data-cy="full-name"]'
	};

	enterTextIntoFullNameField(inputData) {
		super.enterTextIntoField(inputData, this.identifiers.fullNameField);
	}
}
export default PO_FullName;
