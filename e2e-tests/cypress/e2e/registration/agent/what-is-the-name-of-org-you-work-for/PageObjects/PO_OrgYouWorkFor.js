import PageObject from '../../../../PageObject';

class PO_OrgYouWorkFor extends PageObject {
	identifiers = {
		...this.identifiers,
		organisationNameField: '[data-cy="organisation-name"]'
	};

	enterTextIntoOrgNameField(inputData) {
		super.enterTextIntoField(inputData, this.identifiers.organisationNameField);
	}
}
export default PO_OrgYouWorkFor;
