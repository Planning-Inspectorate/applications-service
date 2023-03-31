const findTimetableFromId = (timetables, idToFind) =>
	timetables.find(({ uniqueId }) => `${uniqueId}` === `${idToFind}`);

module.exports = {
	findTimetableFromId
};
