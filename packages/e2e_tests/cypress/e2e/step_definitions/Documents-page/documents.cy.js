import { And } from 'cypress-cucumber-preprocessor/steps';
import dayjs from 'dayjs';

And('The document type is displayed against the project stage', () => {
	cy.get('.section-results__result-meta-data > :nth-child(1) > [data-cy="published-date"]').should(
		'be.visible'
	);
});

And('The dates are displayed in a descending order', () => {
	cy.get('[data-cy="published-date"]')
		.eq(1)
		.then(($firstDate) => {
			const firstDate = dayjs($firstDate.text());
			cy.get('[data-cy="published-date"]')
				.eq(5)
				.then(($secondDate) => {
					const secondDate = dayjs($secondDate.text());
					cy.log($firstDate);
					expect(secondDate.isBefore(firstDate)).to.be.true;
				});
		});
});
