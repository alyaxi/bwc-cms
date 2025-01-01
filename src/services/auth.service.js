const httpStatus = require('http-status');
const userService = require('./user.service');
const ApiError = require('../utils/ApiError');
const { decryptData } = require('../utils/auth');

async function loginUserWithEmailAndPassword(req) {
	const { email, password } = req.body;
	if (!email || !password) {
		throw new ApiError(
			httpStatus.BAD_REQUEST,
			'Please provide email and password'
		);
	}
	const user = await userService.getUserByEmail(email);

	if (!user) {
		throw new ApiError(
			httpStatus.UNAUTHORIZED,
			'User does not exist'
		);
	}

	const isPasswordMatch = await decryptData(password, user?.password);
	if (!isPasswordMatch) {
		throw new ApiError(
			httpStatus.UNAUTHORIZED,
			'Incorrect email or password'
		);
	}

	delete user.password;

	return user;
}

module.exports = {
	loginUserWithEmailAndPassword,
};
