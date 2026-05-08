import PageObject from '../PageObject';

class PO_WhatAfterDecisionMade extends PageObject {
	identifiers = {};

	get functions() {
		return new Proxy(
			{},
			{
				get: (_, prop) => this[prop].bind(this)
			}
		);
	}
}
export default PO_WhatAfterDecisionMade;
