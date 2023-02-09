class PO_RegisterFor {
	mySelfCheckBox() {
		return cy.get('[data-cy="answer-mySay"]').click(); //Myself
	}

	organizationCheckBox() {
		return cy.get('[data-cy="answer-organisation"]').click(); //An organisation I work or volunteer for
	}

	onBehalfCheckBox() {
		return cy.get('[data-cy="answer-behalf"]').click(); //On behalf of another person
	}

	yesCheckBox() {
		return cy.get('[data-cy="answer-yes"]').click(); // Are you 18 or over? Yes
	}

	noCheckBox() {
		return cy.get('[data-cy="answer-no"]').click(); // Are you 18 or over? No
	}

	//Checkbox On behalf of another person, a family group or an organisation I do not work for

	aPersonCheckBox() {
		return cy.get('[data-cy="answer-person"]').click(); // A person
	}

	anOrganisationCheckBox() {
		return cy.get('[data-cy="answer-organisation"]').click(); // An organisation or charity I do not work for
	}

	aFamilyGroupCheckBox() {
		return cy.get('[data-cy="answer-family"]').click(); // A family group
	}
}

export default PO_RegisterFor;
