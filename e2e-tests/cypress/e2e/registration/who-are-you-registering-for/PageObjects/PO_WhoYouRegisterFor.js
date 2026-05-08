import PageObject from '../../../PageObject';

class PO_WhoYouRegisterFor extends PageObject {
	identifiers = {
		...this.identifiers,
		typeOfPartyFieldset: () => cy.get('#type-of-party'),
		myselfRadio: () => cy.get('[data-cy="answer-mySay"]'),
		organisationRadio: () => cy.get('[data-cy="answer-organisation"]'),
		agentRadio: () => cy.get('[data-cy="answer-behalf"]')
	};

	navigatetoTypeOfPartyPage() {
		cy.visit('/project-search');
		this.clickProjectLink('North Lincolnshire Green Energy Park');
		this.clickLinkByHref('register-have-your-say');
		this.clickLinkByHref('who-registering-for');
	}

	validateRadioOptionContent() {
		this.identifiers.typeOfPartyFieldset();
	}

	selectParty(radioChoice) {
		switch (radioChoice) {
			case 'Myself':
				this.identifiers.myselfRadio().click();
				break;
			case 'Organisation':
				this.identifiers.organisationRadio().click();
				break;
			case 'Agent':
				this.identifiers.agentRadio().click();
				break;
			default:
				throw new Error(`unable to find specified radio option: ${radioChoice}`);
		}

		cy.waitForDemoDelay();
	}

	selectPartyAndContinue(radioChoice) {
		this.selectParty(radioChoice);
		this.clickSaveAndContinue();
	}
}
export default PO_WhoYouRegisterFor;
