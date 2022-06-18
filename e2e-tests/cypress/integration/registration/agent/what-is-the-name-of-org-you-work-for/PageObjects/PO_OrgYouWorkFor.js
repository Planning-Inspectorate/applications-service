import PageObject from '../../../../PageObject';

class PO_OrgYouWorkFor extends PageObject {
	enterTextIntoOrgNameField(inputData) {
		super.enterTextIntoField(inputData, '[data-cy="organisation-name"]');
	}
}
export default PO_OrgYouWorkFor;
