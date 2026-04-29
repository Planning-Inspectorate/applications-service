import PageObject from '../../../PageObject';

class PO_WhoYouRegisterFor extends PageObject {
	identifiers = {
		...this.identifiers,
		typeOfPartyFieldset: () => cy.get('#type-of-party')
	};

	navigatetoTypeOfPartyPage() {
		cy.visit('/project-search');
		cy.clickProjectLink('North Lincolnshire Green Energy Park');
		cy.clickOnHref('register-have-your-say');
		cy.clickOnHref('who-registering-for');
	}

	validateRadioOptionContent() {
		this.identifiers.typeOfPartyFieldset();
	}
}
export default PO_WhoYouRegisterFor;
