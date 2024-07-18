const {
	featureFlag: { allowProjectInformation }
} = require('../../../../config');
const featureToggles = () => ({
	allowProjectInformation
});

module.exports = {
	featureToggles
};
