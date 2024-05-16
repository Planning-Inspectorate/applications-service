const { formatExaminationToViewModel } = require('./format-examination-to-view-model');

const getExamination = (appData, i18n) => formatExaminationToViewModel(appData, i18n);

module.exports = { getExamination };
