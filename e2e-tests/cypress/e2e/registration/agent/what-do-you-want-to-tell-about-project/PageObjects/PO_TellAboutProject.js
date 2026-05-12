import PageObject from '../../../../PageObject';

class PO_TellAboutProject extends PageObject {
	identifiers = {
		...this.identifiers,
		commentsField: '#comment',
		topicField: '#topic',
		personalDetailsSummary: () => cy.get('.govuk-details__summary-text')
	};

	enterTextIntoCommentsField(dataInput) {
		super.enterTextIntoField(dataInput, this.identifiers.commentsField);
	}

	enterTextIntoCommentsFieldDirectly(dataInput) {
		super.enterTextIntoFieldDirectly(dataInput, this.identifiers.commentsField);
	}

	enterTextIntoTopicField(dataInput) {
		super.enterTextIntoField(dataInput, this.identifiers.topicField);
	}

	assertDoNotIncludePersonalDetailsPresent() {
		this.identifiers
			.personalDetailsSummary()
			.should('contain.text', 'Do not include these details.');
	}
}
export default PO_TellAboutProject;
