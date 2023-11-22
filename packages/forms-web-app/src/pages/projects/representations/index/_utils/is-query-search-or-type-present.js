const isQuerySearchOrTypePresent = ({ searchTerm, type }) => !!(searchTerm || type);

module.exports = { isQuerySearchOrTypePresent };
