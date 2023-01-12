class PO_WhatAfterDecisionMade {
	assertLinksPresentOnPage(table) {
		const contents = table.hashes();
		cy.confirmTextOnPage(contents[0].Links);
		cy.confirmTextOnPage(contents[1].Links);
	}
}
export default PO_WhatAfterDecisionMade;
