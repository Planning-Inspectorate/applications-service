import PageObject from '../../../../PageObject';

class PO_AIusagedecleration extends PageObject {
	identifiers = {
		...this.identifiers,
		radioYes: () => cy.get('input[name="ai-declaration"][value="yes"]'),
		radioNo: () => cy.get('input[name="ai-declaration"][value="no"]')
	};

	assertOnPage(pageName) {
		cy.title().should('include', pageName);
		cy.get('h1').should('contain.text', pageName);
		cy.url().should('include', '/ai-declaration');
	}

	selectRadioOption(option) {
		switch (option) {
			case 'Yes':
				this.identifiers.radioYes().check();
				break;
			case 'No':
				this.identifiers.radioNo().check();
				break;
			default:
				throw new Error(`No radio option found for ${option}`);
		}
	}

	clickAISaveAndContinue() {
		cy.contains('button', 'Continue').click();
		cy.waitForDemoDelay();
	}
}

export default PO_AIusagedecleration;
