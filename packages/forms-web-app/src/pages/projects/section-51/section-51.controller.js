const { searchAdviceDocuments } = require('../../../lib/application-api-wrapper');

async function getSection51(req, res) {
	try {
		const result = await searchAdviceDocuments(res.locals.caseRef);
		return res.render('projects/section-51/index.njk', {
			title: 'Section 51 Advice',
			advice: result.data.advice
		});
	} catch (e) {
		console.log(2);
		throw e;
	}
}

module.exports = {
	getSection51
};
