export class Page {
	//Selectors
	selectors = {
		footerLinks: '.govuk-footer__link',
		radioBoxes: 'govuk-radios__input',
		inputFields: 'govuk-input',
		link: '.govuk-link',
		select: '.govuk-select'
	};

	//Elements

	basePageElements = {
		footerLinks: () => cy.get(this.selectors.footerLinks),
		radioBoxes: () => cy.get(this.selectors.radioBoxes),
		inputFields: () => cy.get(this.selectors.inputFields),
		link: () => cy.get(this.selectors.link),
		select: () => cy.get(this.selectors.select),
		buttonByLabelText: (buttonText) =>
			cy.contains(this.selectors.radioBoxes, buttonText, { matchCase: false })
	};

	// Action

	clickRadioBoxesByText(bottonText) {
		this.basePageElements;
	}
}
