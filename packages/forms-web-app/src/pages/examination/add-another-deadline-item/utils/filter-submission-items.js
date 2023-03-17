const filterSubmissionItems = (submissionItems) =>
	submissionItems.filter((submissionItem) => submissionItem.submitted === true);

module.exports = { filterSubmissionItems };
