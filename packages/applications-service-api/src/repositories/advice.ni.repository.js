const db = require('../models');
const { Op } = require('sequelize');
const { english: stopWordList } = require('../utils/stopwords');
const { isGeneralAdviceCaseReference } = require('../utils/is-general-advice-case-reference');
const { featureFlag } = require('../lib/config');

const getAllAdviceByCaseReference = async (caseReference, offset, size, searchTerm) => {
	const terms = searchTerm?.split(' ').filter((term) => !stopWordList.includes(term.toLowerCase()));
	const generalAdviceCaseReference = isGeneralAdviceCaseReference(caseReference);

	const where = {
		[Op.and]: []
	};

	if (featureFlag.displaySpecificAndGeneralAdvice && !generalAdviceCaseReference) {
		where[Op.and].push({
			caseReference
		});
	}

	if (!featureFlag.displaySpecificAndGeneralAdvice) {
		where[Op.and].push({
			caseReference
		});
	}

	if (terms?.length > 0) {
		where[Op.and].push({
			[Op.or]: ['firstName', 'lastName', 'organisation', 'enquiryDetail', 'adviceGiven'].map(
				(field) => ({
					[Op.and]: terms.map((term) => ({
						[field]: { [Op.like]: `%${term}%` }
					}))
				})
			)
		});
	}

	const dbQuery = {
		where,
		order: [['dateAdviceGiven', 'DESC'], ['adviceID']],
		offset,
		limit: size,
		raw: true
	};

	const { count, rows } = await db.Advice.findAndCountAll(dbQuery);

	return {
		count,
		advice: rows
	};
};

const getAdviceById = async (adviceID) => {
	return db.Advice.findOne({
		where: {
			adviceID
		},
		raw: true
	});
};

module.exports = {
	getAllAdviceByCaseReference,
	getAdviceById
};
