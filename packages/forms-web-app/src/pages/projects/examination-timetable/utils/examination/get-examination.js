const { formatExaminationToViewModel } = require('./format-examination-to-view-model');

const getExamination = (appData) => formatExaminationToViewModel(appData);

module.exports = { getExamination };
