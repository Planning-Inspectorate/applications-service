import PageObject from "../../../../PageObject";

class OrganisationNamePage extends PageObject {

    enterTextIntoOrganisationNameField(inputData) {
      super.enterTextIntoField(inputData, '[data-cy="organisation-name"]')
    }

}
export default OrganisationNamePage;
