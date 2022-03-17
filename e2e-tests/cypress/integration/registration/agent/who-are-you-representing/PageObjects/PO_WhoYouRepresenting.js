class PO_WhoYouRepresenting {

    selectRadioOption(radioOption) {
        switch (radioOption) {
            case "A person": cy.get('[data-cy="answer-person"]').click();
                break;
            case "An organisation or charity": cy.get('[data-cy="answer-organisation"]').click();
                break;
            case "A family group": cy.get('[data-cy="answer-family"]').click();
                break;
        }
    }

}
export default PO_WhoYouRepresenting;