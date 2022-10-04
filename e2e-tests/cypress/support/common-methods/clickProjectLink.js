module.exports = (projectName) => {
	cy.get('td:nth-child(1)').contains(projectName).click();
};
