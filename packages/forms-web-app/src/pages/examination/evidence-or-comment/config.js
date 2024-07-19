const evidenceOrCommentValues = {
	1: 'comment',
	2: 'upload',
	3: 'both'
};

const getEvidenceOrCommentOptions = (i18n) => ({
	1: {
		value: evidenceOrCommentValues[1],
		text: i18n.t('examination.evidenceOrComment.options.comment')
	},
	2: {
		value: evidenceOrCommentValues[2],
		text: i18n.t('examination.evidenceOrComment.options.upload')
	},
	3: {
		value: evidenceOrCommentValues[3],
		text: i18n.t('examination.evidenceOrComment.options.both')
	}
});

module.exports = { evidenceOrCommentValues, getEvidenceOrCommentOptions };
