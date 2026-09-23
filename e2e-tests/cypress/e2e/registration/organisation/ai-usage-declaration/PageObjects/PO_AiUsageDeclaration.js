import PageObject from '../../../../PageObject';

class PO_AiUsageDeclaration extends PageObject {
	identifiers = {
		...this.identifiers,
		radioYes: () => cy.get('input[name="ai-declaration"][value="yes"]'),
		radioNo: () => cy.get('input[name="ai-declaration"][value="no"]'),
		continueButton: () => cy.contains('button', 'Continue'),
		welshContinueButton: () => cy.contains('button', 'Parhau')
	};

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
		cy.get('body').then(($body) => {
			if ($body.find('button:contains("Parhau")').length > 0) {
				this.identifiers.welshContinueButton().click();
			} else {
				this.identifiers.continueButton().click();
			}
		});
		cy.waitForDemoDelay();
	}

	assertPageContent() {
		cy.get('body').should(
			'contain.text',
			"Let us know if you've used AI to draft or substantially change your registration comments. This is so our Inspectors can understand the context of the information they are reviewing."
		);
		cy.get('body').should(
			'contain.text',
			"You do not need to tell us if you've used AI for checking spelling or grammar."
		);
		cy.get('body').should(
			'contain.text',
			"If you select yes, then you confirm you've checked your comments and agree they reflect your views."
		);
		cy.get('body').should(
			'contain.text',
			'Did you use AI to help produce your registration comments?'
		);
		this.identifiers.radioYes().parent().should('contain.text', 'Yes');
		this.identifiers.radioNo().parent().should('contain.text', 'No');
		this.identifiers.continueButton().should('be.visible');
	}

	assertWelshPageContent() {
		cy.get('body').should(
			'contain.text',
			"Rhowch wybod i ni os ydych wedi defnyddio AI i ddrafftio neu i newid eich sylwadau cofrestru yn sylweddol. Mae hyn er mwyn i'n Arolygwyr allu deall cyd-destun y wybodaeth maent yn ei hadolygu."
		);
		cy.get('body').should(
			'contain.text',
			'Nid oes angen i chi ddweud wrthym os ydych wedi defnyddio AI i wirio sillafu neu ramadeg.'
		);
		cy.get('body').should(
			'contain.text',
			'Os dewiswch ie, rydych yn cadarnhau eich bod wedi gwirio eich sylwadau ac yn cytuno eu bod yn adlewyrchu eich barn.'
		);
		cy.get('body').should(
			'contain.text',
			'A wnaethoch ddefnyddio AI i helpu i gynhyrchu eich sylwadau cofrestru?'
		);
		this.identifiers.radioYes().parent().should('contain.text', 'Ie');
		this.identifiers.radioNo().parent().should('contain.text', 'Na');
		this.identifiers.welshContinueButton().should('be.visible');
	}
}

export default PO_AiUsageDeclaration;
