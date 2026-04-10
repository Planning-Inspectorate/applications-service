export function buildGetUpdatesHomePage() {
	//can be used to perform any setup required before the user starts the journey, such as prepopulating the questions with data from the database, or clearing out old answers from the session
	return async (req, res) => res.redirect(`${req.baseUrl}/details/email`);
}
