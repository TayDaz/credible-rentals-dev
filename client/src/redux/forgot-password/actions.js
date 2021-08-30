import url from "../../config/url";
import { SUCCESS } from "../../constants";
import apiCall from "../../helpers/apiCall";
import {
	FORGOT_PASSWORD__CHECK_EMAIL_ID_REQUEST,
	FORGOT_PASSWORD__CHECK_EMAIL_ID_SUCCESS,
	FORGOT_PASSWORD__CHECK_EMAIL_ID_FAILURE,
	FORGOT_PASSWORD__CHECK_CHALLENGE_CODE_REQUEST,
	FORGOT_PASSWORD__CHECK_CHALLENGE_CODE_SUCCESS,
	FORGOT_PASSWORD__CHECK_CHALLENGE_CODE_FAILURE,
	FORGOT_PASSWORD__UPDATE_PASSWORD_REQUEST,
	FORGOT_PASSWORD__UPDATE_PASSWORD_SUCCESS,
	FORGOT_PASSWORD__UPDATE_PASSWORD_FAILURE,
	FORGOT_PASSWORD__CLEAR_DATA,
} from "./types";

/**Check if the user email exists */
const forgotPasswordCheckEmailIdRequest = () => ({
	type: FORGOT_PASSWORD__CHECK_EMAIL_ID_REQUEST,
});

const forgotPasswordCheckEmailIdSuccess = (payload) => ({
	type: FORGOT_PASSWORD__CHECK_EMAIL_ID_SUCCESS,
	payload,
});

const forgotPasswordCheckEmailIdFailure = (payload) => ({
	type: FORGOT_PASSWORD__CHECK_EMAIL_ID_FAILURE,
	payload,
});

export const forgotPasswordCheckEmailId = (email) => async (dispatch) => {
	dispatch(forgotPasswordCheckEmailIdRequest());

	const response = await apiCall
		.post(url.forgotPassword, {}, email)
		.then((response) => response.json())
		.catch((err) => {
			console.log(
				"[redux/forgot-password-page/actions.js] forgotPasswordCheckEmailId ERROR",
				err
			);
			dispatch(forgotPasswordCheckEmailIdFailure("Unexpected Error"));
		});

	if (response.status !== SUCCESS) {
		dispatch(forgotPasswordCheckEmailIdFailure(response.message));
	} else {
		dispatch(forgotPasswordCheckEmailIdSuccess(response.data));
	}
};

/**Check if the challenge code is correct */
const forgotPasswordCheckChallengeCodeRequest = () => ({
	type: FORGOT_PASSWORD__CHECK_CHALLENGE_CODE_REQUEST,
});

const forgotPasswordCheckChallengeCodeSuccess = (payload) => ({
	type: FORGOT_PASSWORD__CHECK_CHALLENGE_CODE_SUCCESS,
	payload,
});

const forgotPasswordCheckChallengeCodeFailure = (payload) => ({
	type: FORGOT_PASSWORD__CHECK_CHALLENGE_CODE_FAILURE,
	payload,
});

export const forgotPasswordCheckChallengeCode =
	(challengeCode, token) => async (dispatch) => {
		dispatch(forgotPasswordCheckChallengeCodeRequest());

		const response = await apiCall
			.post(url.forgotPassword, { token }, challengeCode)
			.then((response) => response.json())
			.catch((err) => {
				console.log(
					"[redux/forgot-password-page/actions.js] forgotPasswordCheckChallengeCode ERROR",
					err
				);
				dispatch(
					forgotPasswordCheckChallengeCodeFailure(
						"Unexpected error occurred"
					)
				);
			});

		if (response.status !== SUCCESS) {
			dispatch(forgotPasswordCheckChallengeCodeFailure(response.message));
		} else {
			dispatch(forgotPasswordCheckChallengeCodeSuccess(response.data));
		}
	};

/**Update user profile with new password */
const forgotPasswordUpdatePasswordRequest = () => ({
	type: FORGOT_PASSWORD__UPDATE_PASSWORD_REQUEST,
});

const forgotPasswordUpdatePasswordSuccess = (payload) => ({
	type: FORGOT_PASSWORD__UPDATE_PASSWORD_SUCCESS,
	payload,
});

const forgotPasswordUpdatePasswordFailure = (payload) => ({
	type: FORGOT_PASSWORD__UPDATE_PASSWORD_FAILURE,
	payload,
});

export const forgotPasswordUpdatePassword =
	(passwords, token) => async (dispatch) => {
		dispatch(forgotPasswordUpdatePasswordRequest());

		const response = await apiCall
			.post(url.forgotPassword, { token }, passwords)
			.then((response) => response.json())
			.catch((err) => {
				console.log(
					"[redux/forgot-password-page/actions.js] forgotPasswordUpdatePassword ERROR",
					err
				);
				dispatch(
					forgotPasswordUpdatePasswordFailure(
						"Unexpected error occurred"
					)
				);
			});

		if (response.status === SUCCESS) {
			dispatch(forgotPasswordUpdatePasswordSuccess(response.data));
		} else {
			dispatch(forgotPasswordUpdatePasswordFailure(response.message));
		}
	};

/**
 * To clear the data in forgotPassword store
 */
export const forgotPasswordClearData = () => ({
	type: FORGOT_PASSWORD__CLEAR_DATA,
});
