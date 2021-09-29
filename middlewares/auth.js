const config = require('../config.json')
const delay =0
const checkMobileAuth = async (req, res, next) => {
	const { api_key } = req.headers;
	if (!api_key) return res.status(403).send({ auth: false, message: 'No API key provided.' });

	if (config.api_key !== api_key)
		return res.status(403).send({ auth: false, message: 'No authentication' });

	await sleep(delay);
	next();
}

const checkAuthToken = async (req, res, next) => {
	const { mobile, api_key } = req.headers;
	if (!api_key) return res.status(403).send({ auth: false, message: 'No API key provided.' });

	if (config.api_key !== api_key)
		return res.status(403).send({ auth: false, message: 'No authentication' });

	if (!mobile) return res.status(403).send({ auth: false, message: 'No mobile provided.' });

	const user = await dbUser.find({ mobile: mobile});
	if (user.length === 1) {
		return res.status(403).send({ auth: false, message: 'No authentication' });
	}
	else {
		return res.status(403).send({ auth: false, message: 'No mobile provided.' });
	}
	await sleep(delay);
	next();
}

function sleep(ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}
module.exports = {
	checkMobileAuth,
	checkAuthToken
}