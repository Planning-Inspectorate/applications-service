import PageObject from '../../../../PageObject';

class PO_EmailAddress extends PageObject {
	identifiers = {
		...this.identifiers,
		emailField: '#email'
	};

	enterTextIntoEmailField(dataInput) {
		super.enterTextIntoField(dataInput, this.identifiers.emailField);
	}
}
export default PO_EmailAddress;
