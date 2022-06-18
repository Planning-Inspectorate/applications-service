import PageObject from '../../../../PageObject';

class PO_WhatIsJobTitle extends PageObject {
	enterTextIntoJobTitleField(inputData) {
		super.enterTextIntoField(inputData, '[data-cy="role"]');
	}
}
export default PO_WhatIsJobTitle;
