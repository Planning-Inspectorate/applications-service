const {
	routesConfig: {
		examination: {
			pages: {
				haveYourSay: { view: examinationHaveYourSayView }
			}
		}
	}
} = require('../../routes/config');

const responsePayload = {
	backLinkUrl: `/projects/timetable`,
	title: 'Have your say during the Examination of the application',
	startNowUrl: '#'
};

const getHaveYourSay = async (req, res) => {
	// const { caseRef }
	// const backLinkUrl = ``

	console.log('examinationHaveYourSayView: ', examinationHaveYourSayView);
	res.render(examinationHaveYourSayView, responsePayload);
	// if (response && response.resp_code === 200) {
	// 	const appData = response?.data;
	// 	req.session.caseRef = req?.params?.case_ref;
	// 	req.session.projectName = appData?.ProjectName;
	// 	req.session.appData = appData;

	// 	responsePayload.projectName = req.session.projectName;

	// 	res.render(examinationHaveYourSayView, responsePayload);
	// } else {
	// 	logger.warn(`No project found with ID ${req.params.case_ref} for registration`);
	// 	res.status(404).render('error/not-found');
	// }
};

module.exports = {
	getHaveYourSay
};
