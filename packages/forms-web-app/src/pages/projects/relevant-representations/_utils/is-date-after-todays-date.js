const isDateAfterTodaysDate = (dateToCheck) =>
	dateToCheck === null ? false : new Date() >= new Date(dateToCheck);

module.exports = {
	isDateAfterTodaysDate
};
