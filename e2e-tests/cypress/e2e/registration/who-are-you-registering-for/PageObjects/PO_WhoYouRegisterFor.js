import PageObject from '../../../PageObject';

class PO_WhoYouRegisterFor extends PageObject {
	identifiers = {
		...this.identifiers,
		typeOfPartyFieldset: () => cy.get('#type-of-party')
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

	selectPartyAndContinue(radioChoice) {
		cy.selectRadioOption(radioChoice);
		this.clickSaveAndContinue();
	}
}
export default PO_WhoYouRegisterFor;
