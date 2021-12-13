class PO_WhatIsJobTitle {

    enterTextIntoJobTitleField(inputData) {
        cy.get('[data-cy="role"]').type(inputData);
    }

}
export default PO_WhatIsJobTitle