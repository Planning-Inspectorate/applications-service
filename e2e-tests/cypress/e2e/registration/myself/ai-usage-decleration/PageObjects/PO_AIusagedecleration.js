import PageObject from '../../../../PageObject';

class PO_AIusagedecleration extends PageObject {
	identifiers = {
		...this.identifiers
	};

	get functions() {
		return new Proxy(
			{},
			{
				get: (_, prop) => this[prop].bind(this)
			}
		);
	}

	clickOnChangeLink(linkType) {
		switch (linkType) {
			case 'Who are you registering for?':
				this.identifiers.whoAreYouChangeLink().click();
				break;
			case 'Full name':
				this.identifiers.fullNameChangeLink().click();
				break;
			case 'Are you 18 or over?':
				this.identifiers.over18ChangeLink().click();
				break;
			case 'Address':
				this.identifiers.addressChangeLink().click();
				break;
			case 'Email address':
				this.identifiers.emailChangeLink().click();
				break;
			case 'Telephone number':
				this.identifiers.telephoneChangeLink().click();
				break;
			case 'Your comments change':
				this.identifiers.commentChangeLink().click();
				break;
		}
	}

	clickDeclarationLink(linkType) {
		switch (linkType) {
			case 'myself':
				this.clickLinkByHref('/register/myself/declaration');
				break;
			case 'organisation':
				this.clickLinkByHref('/register/organisation/declaration');
				break;
			default:
				throw new Error(`No declaration link found for ${linkType}`);
		}
	}

	selectRadioOption(option) {
		switch (option) {
			case 'Yes':
				cy.get('.govuk-radios > :nth-child(1) > input').check();
				break;
			case 'No':
				cy.get(':nth-child(2) > [name="ai-declaration"]').check();
				break;
			default:
				throw new Error(`No radio option found for ${option}`);
		}
	}

	clickAISaveAndContinue() {
		cy.contains('Continue').click();
	}
}

export default PO_AIusagedecleration;
