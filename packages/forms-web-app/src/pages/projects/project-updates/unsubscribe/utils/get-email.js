const getEmail = ({ email }) => {
	if (!email) throw new Error('Email not found');

	return email;
};

module.exports = { getEmail };
