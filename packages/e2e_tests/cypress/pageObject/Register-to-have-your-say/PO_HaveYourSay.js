export class PO_HaveYourSay {
	selectAgeOption(isOver18) {
		if (isOver18) {
			cy.get('[data-cy="answer-yes"]').check();
		} else {
			cy.get('[data-cy="answer-no"]').check();
		}
	}

	selectRepresentationOption(representation) {
		if (representation === 'Person') {
			cy.get('[data-cy="answer-person"]').check();
		} else if (representation === 'Organisation') {
			cy.get('[data-cy="answer-organisation"]').check();
		} else if (representation === 'Household') {
			cy.get('[data-cy="answer-family"]').check();
		}
	}

	assertYourEnteredData(option, value) {
		cy.get(`[data-cy="${option}"]`).contains(value);
	}

	clickChangeButton(option) {
		cy.get(`a[data-cy="${option}"]`).click();
	}
}
