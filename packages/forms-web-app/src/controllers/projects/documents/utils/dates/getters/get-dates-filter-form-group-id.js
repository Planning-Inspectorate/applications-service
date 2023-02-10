const getDatesFilterFormGroupId = (dateFilterFormGroupName) =>
	`docments-page-${dateFilterFormGroupName}-form-group`;

const getDatesFilterFormGroupErrorId = (dateFilterFormGroupName) =>
	`${getDatesFilterFormGroupId(dateFilterFormGroupName)}-error`;

module.exports = { getDatesFilterFormGroupId, getDatesFilterFormGroupErrorId };
