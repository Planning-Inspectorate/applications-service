const logger = require('../../../lib/logger');
const {
	routesConfig: {
		examination: {
			pages: { selectFile }
		}
	}
} = require('../../../routes/config');

const { uploadHandler } = require('./utils/upload-handler');
const { getRenderView, postRenderView } = require('./utils/render-view');
const { continueHandler } = require('./utils/continue-handler');
const { deleteHandler } = require('./utils/delete-handler');

const getSelectFile = (req, res) => {
	try {
		getRenderView(req, res);
	} catch (error) {
		logger.error(error);
		return res.status(500).render('error/unhandled-exception');
	}
};

const postSelectFile = async (req, res) => {
	try {
		const { body, i18n, session, files } = req;

		if ('delete' in body) {
			await deleteHandler(session, body.delete);
			return res.redirect(`${selectFile.route}`);
		}

		if ('continue' in body) return continueHandler(req, res);

		if ('upload' in body) {
			const errors = await uploadHandler(i18n, session, files);
			return postRenderView(req, res, session, errors);
		}
	} catch (error) {
		logger.error(error);
		res.status(500).render('error/unhandled-exception');
	}
};

module.exports = {
	getSelectFile,
	postSelectFile
};
