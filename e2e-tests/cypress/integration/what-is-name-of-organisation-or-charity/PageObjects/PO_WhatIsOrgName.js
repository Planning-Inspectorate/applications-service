class PO_WhatIsOrgName {

    enterTextIntoOrgNameField(inputData) {
        cy.get('[data-cy="organisation-name"]').type(inputData);
    }

}
export default PO_WhatIsOrgName