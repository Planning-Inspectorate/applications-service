import PageObject from '../../../../PageObject';

class OrganisationNamePage extends PageObject {
	identifiers = {
		...this.identifiers,
		organisationNameField: '[data-cy="organisation-name"]'
	};

	enterTextIntoOrganisationNameField(inputData) {
		super.enterTextIntoField(inputData, this.identifiers.organisationNameField);
	}
}
export default OrganisationNamePage;
