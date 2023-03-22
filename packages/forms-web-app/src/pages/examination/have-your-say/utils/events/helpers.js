const findEventFromId = ({ timetables }, idToFind) =>
	timetables.find(({ uniqueId }) => `${uniqueId}` === `${idToFind}`);

module.exports = {
	findEventFromId
};
