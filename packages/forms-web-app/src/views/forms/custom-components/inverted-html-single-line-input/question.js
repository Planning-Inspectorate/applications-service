import SingleLineInputQuestion from '@planning-inspectorate/dynamic-forms/src/components/single-line-input/question.js';

export default class InvertedHtmlSingleLineInputQuestion extends SingleLineInputQuestion {
	constructor(params) {
		super(params);
		this.viewFolder = 'forms/custom-components/inverted-html-single-line-input';
	}
}
