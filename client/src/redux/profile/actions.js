import url from "../../config/url";
import { SUCCESS } from "../../constants";
import apiCall from "../../helpers/apiCall";
import {
	PROFILE__UPDATE_USER_INFO_REQUEST,
	PROFILE__UPDATE_USER_INFO_SUCCESS,
	PROFILE__UPDATE_USER_INFO_FAILURE,
	PROFILE__CHANGE_USER_PASSWORD_REQUEST,
	PROFILE__CHANGE_USER_PASSWORD_SUCCESS,
	PROFILE__CHANGE_USER_PASSWORD_FAILURE,
	PROFILE__CHANGE_USER_MOBILE_NUMBER_REQUEST,
	PROFILE__CHANGE_USER_MOBILE_NUMBER_SUCCESS,
	PROFILE__CHANGE_USER_MOBILE_NUMBER_FAILURE,
	PROFILE__UPDATE_USER_AVATAR_REQUEST,
	PROFILE__UPDATE_USER_AVATAR_SUCCESS,
	PROFILE__UPDATE_USER_AVATAR_FAILURE,
	PROFILE__CLEAR_DATA,
} from "./types";

const profileUpdateUserInfoRequest = () => ({
	type: PROFILE__UPDATE_USER_INFO_REQUEST,
});

const profileUpdateUserInfoSuccess = (payload) => ({
	type: PROFILE__UPDATE_USER_INFO_SUCCESS,
	payload,
});

const profileUpdateUserInfoFailure = (payload) => ({
	type: PROFILE__UPDATE_USER_INFO_FAILURE,
	payload,
});

export const profileUpdateUserInfo = (userInfo, token) => async (dispatch) => {
	dispatch(profileUpdateUserInfoRequest());

	const response = await apiCall
		.post(url.updateUserNonAuthInfo, { token }, userInfo)
		.then((response) => response.json())
		.catch((err) => {
			console.error(
				"[profile/actions.js] profileUpdateUserInfo ERROR",
				err
			);
			dispatch(profileUpdateUserInfoFailure("Unexpected error occurred"));
		});

	if (response.status === SUCCESS) {
		dispatch(profileUpdateUserInfoSuccess(response.data));
	} else {
		dispatch(profileUpdateUserInfoFailure(response.message));
	}
};

/**
 * For updating the user's password
 */

const profileChangeUserPasswordRequest = () => ({
	type: PROFILE__CHANGE_USER_PASSWORD_REQUEST,
});

const profileChangeUserPasswordSuccess = (payload) => ({
	type: PROFILE__CHANGE_USER_PASSWORD_SUCCESS,
	payload,
});

const profileChangeUserPasswordFailure = (payload) => ({
	type: PROFILE__CHANGE_USER_PASSWORD_FAILURE,
	payload,
});

export const profileChangeUserPassword = (data, token) => async (dispatch) => {
	dispatch(profileChangeUserPasswordRequest());

	const response = await apiCall
		.post(url.updatePassword, { token }, data)
		.then((response) => response.json())
		.catch((err) => {
			console.error(
				"[profile/actions.js] profileUpdateUserInfo ERROR",
				err
			);
			dispatch(profileUpdateUserInfoFailure("Unexpected error occurred"));
		});

	if (response?.status === SUCCESS) {
		dispatch(profileChangeUserPasswordSuccess(response.data));
	} else {
		dispatch(profileChangeUserPasswordFailure(response.message));
	}
};

/**
 * Clearing data
 */

export const profileClearData = () => ({
	type: PROFILE__CLEAR_DATA,
});

/**For changing the mobile number */
const profileChangeUserMobileNumberRequest = () => ({
	type: PROFILE__CHANGE_USER_MOBILE_NUMBER_REQUEST,
});

const profileChangeUserMobileNumberSuccess = (payload) => ({
	type: PROFILE__CHANGE_USER_MOBILE_NUMBER_SUCCESS,
	payload,
});

const profileChangeUserMobileNumberFailure = (payload) => ({
	type: PROFILE__CHANGE_USER_MOBILE_NUMBER_FAILURE,
	payload,
});

export const profileChangeUserMobileNumber =
	(data, token) => async (dispatch) => {
		dispatch(profileChangeUserMobileNumberRequest());

		const response = await apiCall
			.post(url.updateMobileNumber, { token }, data)
			.then((response) => response.json())
			.catch((err) => {
				console.error(
					"[profile/actions.js] profileUpdateUserInfo ERROR",
					err
				);
				dispatch(
					profileChangeUserMobileNumberFailure(
						"Unexpected error occurred"
					)
				);
			});

		if (response?.status === SUCCESS) {
			dispatch(profileChangeUserMobileNumberSuccess(response.data));
		} else {
			dispatch(profileChangeUserPasswordFailure(response.message));
		}
	};

/**For updating avatar */
const profileUpdateAvatarRequest = () => ({
	type: PROFILE__UPDATE_USER_AVATAR_REQUEST,
});

const profileUpdateAvatarSuccess = (payload) => ({
	type: PROFILE__UPDATE_USER_AVATAR_SUCCESS,
	payload,
});

const profileUpdateAvatarFailure = (payload) => ({
	type: PROFILE__UPDATE_USER_AVATAR_FAILURE,
	payload,
});

export const profileUpdateAvatar = (data, token) => async (dispatch) => {
	dispatch(profileUpdateAvatarRequest());

	const response = await apiCall
		.postFormData(url.updateAvatar, { token }, data)
		.then((response) => response.json())
		.catch((err) => {
			console.error(
				"[profile/actions.js] profileUpdateUserInfo ERROR",
				err
			);
			dispatch(profileUpdateAvatarFailure("Unexpected error occurred"));
		});

	if (response?.status === SUCCESS) {
		dispatch(profileUpdateAvatarSuccess(response.data));
	} else {
		dispatch(profileUpdateAvatarFailure(response.message));
	}
};
