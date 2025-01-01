const jwt = require('jsonwebtoken');
const bycrypt = require('bcrypt');
const config = require('../config/config');

function generateToken(data, expiresMs, secret = config.jwt.secret) {
	// const token2 = req.headers['authorization']?.split(' ')[1];
	console.log(data, "newDataaaaaaaaa")
	const token = jwt.sign(
		{ exp: Math.floor(expiresMs / 1000), ...data },
		secret
	);
	console.log(token, "tokennnnnnnnnn")
	return token;
}

async function verifyToken(token) {
	try {
		const payload = jwt.verify(token, config.jwt.secret);
		console.log({payload})
		return payload;
	} catch (err) {
		throw new Error(`Invalid token: ${err}`);
	}
}

async function encryptData(string) {
	const salt = await bycrypt.genSalt(10);
	const hashedString = await bycrypt.hash(string, salt);
	return hashedString;
}

async function decryptData(string, hashedString) {
	const isValid = await bycrypt.compare(string, hashedString);
	return isValid;
}

function setCookie(res, cookieName, cookieValue, expiresMs) {
	res.cookie(cookieName, cookieValue, {
		httpOnly: true,
		expires: new Date(expiresMs),
	});
}

function generateExpires(hours) {
	const ms = Math.floor(Date.now() + hours * 60 * 60 * 1000);
	return ms;
}

module.exports = {
	generateToken,
	generateExpires,
	verifyToken,
	encryptData,
	decryptData,
	setCookie,
};
