import PageObject from '../../../../PageObject';

class PO_TellAboutProject extends PageObject {
	enterTextIntoCommentsField(dataInput) {
		super.enterTextIntoField(dataInput, '#comment');
	}

	enterTextIntoCommentsFieldDirectly(dataInput) {
		super.enterTextIntoFieldDirectly(dataInput, '#comment');
	}

	enterTextIntoTopicField(dataInput) {
		super.enterTextIntoField(dataInput, '#topic');
	}

	assertDoNotIncludePersonalDetailsPresent() {
		cy.get('.govuk-details__summary-text').should(
			'contain.text',
			'Do not include any personal details.'
		);
	}
}
export default PO_TellAboutProject;
