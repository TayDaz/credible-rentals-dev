import {
	USER_TOKEN_LOGIN_REQUEST,
	USER_TOKEN_LOGIN_SUCCESS,
	USER_TOKEN_LOGIN_FAILURE,
	USER_TOKEN_LOGIN_SUCCESS_SIGNUP_PENDING,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_SUCCESS_SIGNUP_PENDING,
	USER_LOGIN_FAILURE,
} from "./types";

export const userTokenLoginRequest = () => ({ type: USER_TOKEN_LOGIN_REQUEST });
export const userTokenLoginSuccess = (payload) => ({
	type: USER_TOKEN_LOGIN_SUCCESS,
	payload,
});
export const userTokenLoginFailure = (payload) => ({
	type: USER_TOKEN_LOGIN_FAILURE,
	payload,
});
export const userTokenLoginSuccessSignupPending = (payload) => ({
	type: USER_TOKEN_LOGIN_SUCCESS_SIGNUP_PENDING,
	payload,
});

export const userLoginRequest = () => ({ type: USER_LOGIN_REQUEST });
export const userLoginSuccess = (payload) => ({
	type: USER_LOGIN_SUCCESS,
	payload,
});
export const userLoginSuccessSignupPending = (payload) => ({
	type: USER_LOGIN_SUCCESS_SIGNUP_PENDING,
	payload,
});
export const userLoginFailure = (payload) => ({
	type: USER_LOGIN_FAILURE,
	payload,
});
