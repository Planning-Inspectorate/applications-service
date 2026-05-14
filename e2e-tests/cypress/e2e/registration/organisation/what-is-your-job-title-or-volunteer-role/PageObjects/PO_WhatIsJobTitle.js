import PageObject from '../../../../PageObject';

class PO_WhatIsJobTitle extends PageObject {
	identifiers = {
		...this.identifiers,
		jobTitleField: '[data-cy="role"]'
	};

	enterTextIntoJobTitleField(inputData) {
		super.enterTextIntoField(inputData, this.identifiers.jobTitleField);
	}
}
export default PO_WhatIsJobTitle;
