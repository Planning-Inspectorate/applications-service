module.exports = (projectName) => {
	cy.get('td:nth-child(1)').each(($e1, index) => {
		const text = $e1.text().trim();
		if (text.includes(projectName)) {
			cy.get('td:nth-child(1)').eq(index).click(15, 20);
		}
	});
};
