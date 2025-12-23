/**
 * OS Maps OAuth Routes
 * Handles OAuth token generation for map tile proxying
 */

const express = require('express');
const { getMapAccessToken } = require('../services/os-maps-token.service');

const router = express.Router();

/**
 * GET /api/v1/os-maps/token
 * Returns an OAuth Bearer token for use by map tile proxy
 */
router.get('/token', async (req, res) => {
	try {
		const token = await getMapAccessToken();

		res.json({
			access_token: token,
			token_type: 'Bearer',
			expires_in: 300 // 5 minutes (OS default)
		});
	} catch (error) {
		res.status(500).json({
			error: 'Failed to obtain OS Maps token',
			message: error.message
		});
	}
});

module.exports = router;
