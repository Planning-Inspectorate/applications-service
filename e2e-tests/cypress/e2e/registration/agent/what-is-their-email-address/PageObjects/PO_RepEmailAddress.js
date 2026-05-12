import PageObject from '../../../../PageObject';

class PO_RepEmailAddress extends PageObject {
	identifiers = {
		...this.identifiers,
		representeeEmailField: '#email'
	};

	enterTextIntoRepEmailField(dataInput) {
		super.enterTextIntoField(dataInput, this.identifiers.representeeEmailField);
	}
}
export default PO_RepEmailAddress;
