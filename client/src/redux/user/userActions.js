import {
	USER_REGISTRATION_REQUEST,
	USER_REGISTRATION_SUCCESS,
	USER_REGISTRATION_FAILURE,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAILURE,
	USER_DELETE_ERROR_VALUE,
	USER_LOGOUT,
	USER_PROFILE_UPDATE_REQUEST,
	USER_PROFILE_UPDATE_SUCCESS,
	USER_PROFILE_UPDATE_FAILURE,
	USER_PROFILE_DATA_UPDATE_REQUEST,
	USER_PROFILE_DATA_UPDATE_SUCCESS,
	USER_PROFILE_DATA_UPDATE_FAILURE,
	USER_SIGNUP_STATUS_UPDATE,
	USER_SMS_OTP_SENT,
	USER_UPDATE_TOKEN,
	FORGOT_PASSWORD_INITIATED_SUCCESS,
	USER_PROFILE_UPDATE_MOBILE_NUMBER,
	USER_PROFILE_UPDATE,
	USER_PROFILE_CLEAR_DATA_AFTER_SUCCESSFULL_SIGNUP_VERIFICATION,
	USER_LOGIN,
	USER_DATA_SET_REQUEST,
	USER_DATA_SET_SUCCESS,
	USER_DATA_SET_FAILURE,
	USER_DATA_UPDATE_REQUEST,
	USER_DATA_UPDATE_SUCCESS,
	USER_DATA_UPDATE_FAILURE,
} from "./userTypes";

import { url } from "../../config";
import makeApiCall from "../../helpers/makeApiCall";
import { SUCCESS } from "../../constants";

const userRegistrationRequest = () => {
	return {
		type: USER_REGISTRATION_REQUEST,
	};
};

const userRegistrationSuccess = (user) => {
	return {
		type: USER_REGISTRATION_SUCCESS,
		payload: user,
	};
};

const userRegistrationFailure = (error) => {
	return {
		type: USER_REGISTRATION_FAILURE,
		payload: error,
	};
};

const userLoginRequest = () => {
	return {
		type: USER_LOGIN_REQUEST,
	};
};

const userLoginSuccess = (user) => {
	return {
		type: USER_LOGIN_SUCCESS,
		payload: user,
	};
};

const userLoginFailure = (error) => {
	return {
		type: USER_LOGIN_FAILURE,
		payload: error.error,
	};
};

const userDeleteError = () => {
	return {
		type: USER_DELETE_ERROR_VALUE,
	};
};

const userLogout = () => {
	return {
		type: USER_LOGOUT,
	};
};

export const userTokenUpdate = (token) => ({
	type: USER_UPDATE_TOKEN,
	payload: token,
});

export const userSignupProfileUpdateSuccess = (user) => {
	// if (!token) {
	// 	return {
	// 		type: USER_PROFILE_UPDATE_SUCCESS,
	// 		payload: { user },
	// 	};
	// }

	return {
		type: USER_PROFILE_UPDATE_SUCCESS,
		payload: user,
	};
};

export const forgotPasswordInitiatedSuccess = (maskedDataIdentifier) => ({
	type: FORGOT_PASSWORD_INITIATED_SUCCESS,
	payload: maskedDataIdentifier,
});

export const loginUser = (user) => ({
	type: USER_LOGIN_SUCCESS,
	payload: user,
});

// export const userProfileUpdateFailure = (err) => ({
// 	type: USER_PROFILE_UPDATE_FAILURE,
// 	payload: err,
// });

export const updateUserSignupStatus = (signupStatus) => ({
	type: USER_SIGNUP_STATUS_UPDATE,
	payload: signupStatus,
});

export const smsOtpSent = (data) => ({
	type: USER_SMS_OTP_SENT,
	payload: data,
});

// export const loginUser = (user) => {
// 	return async (dispatch) => {
// 		dispatch(userLoginRequest());
// 		console.log("Login User", user);
// 		try {
// 			let response = await fetch("/api/authentication/login", {
// 				method: "POST", // *GET, POST, PUT, DELETE, etc.
// 				mode: "cors", // no-cors, *cors, same-origin
// 				cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
// 				credentials: "same-origin", // include, *same-origin, omit
// 				headers: {
// 					"Content-Type": "application/json",
// 					// 'Content-Type': 'application/x-www-form-urlencoded',
// 				},
// 				redirect: "follow", // manual, *follow, error
// 				referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
// 				body: JSON.stringify(user), // body data type must match "Content-Type" header
// 			});

// 			//converting the response to json
// 			const responseJson = await response.json();

// 			if (response.status === 200) {
// 				dispatch(userLoginSuccess(responseJson));
// 			} else {
// 				dispatch(userLoginFailure(responseJson));
// 			}
// 		} catch (err) {
// 			dispatch(
// 				userLoginFailure({
// 					error: {
// 						message: err.message,
// 					},
// 				})
// 			);
// 		}
// 	};
// };

export const registerUser = (user) => {
	return async (dispatch) => {
		dispatch(userRegistrationRequest());
		console.log("Register User", user);
		try {
			let response = await fetch("/api/authentication/register", {
				method: "POST", // *GET, POST, PUT, DELETE, etc.
				mode: "cors", // no-cors, *cors, same-origin
				cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
				credentials: "same-origin", // include, *same-origin, omit
				headers: {
					"Content-Type": "application/json",
					// 'Content-Type': 'application/x-www-form-urlencoded',
				},
				redirect: "follow", // manual, *follow, error
				referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
				body: JSON.stringify(user), // body data type must match "Content-Type" header
			});

			//converting the response to json
			const responseJson = await response.json();

			if (response.status === 200) {
				dispatch(userRegistrationSuccess(responseJson));
			} else {
				dispatch(userRegistrationFailure(responseJson));
			}
		} catch (err) {
			dispatch(
				userRegistrationFailure({
					error: {
						message: err.message,
					},
				})
			);
		}
	};
};

export const deleteError = () => {
	return (dispatch) => {
		dispatch(userDeleteError());
	};
};

export const updateUserToken = (token) => (dispatch) =>
	dispatch(userTokenUpdate(token));

// export const getUserProfile = (token) => async (dispatch) => {
// 	try {
// 		const res = await fetch("/api/user/profile", {
// 			method: "GET", // *GET, POST, PUT, DELETE, etc.
// 			mode: "cors", // no-cors, *cors, same-origin
// 			cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
// 			credentials: "same-origin", // include, *same-origin, omit,
// 			headers: {
// 				"Content-Type": "application/json",
// 				token,
// 			},
// 			redirect: "follow", // manual, *follow, error
// 			referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
// 		});
// 		const resJSON = await res.json();

// 		if (res.status === 200) {
// 			dispatch(userSignupProfileUpdateSuccess(resJSON));
// 		} else {
// 			dispatch(userProfileUpdateFailure(res));
// 		}
// 	} catch (err) {
// 		// dispatch(userProfileUpdateFailure(err));
// 	}
// };

// export const makeApiCall = (token) => async (dispatch) => {
// 	const res = await fetch("/api/user/profile", {
// 		method: "GET", // *GET, POST, PUT, DELETE, etc.
// 		mode: "cors", // no-cors, *cors, same-origin
// 		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
// 		credentials: "same-origin", // include, *same-origin, omit,
// 		headers: {
// 			"Content-Type": "application/json",
// 			token,
// 		},
// 		redirect: "follow", // manual, *follow, error
// 		referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
// 	});

// 	const resJSON = await res.json();
// 	if (res.status === 200) {
// 		console.log("[Authentication.js] useEffect ", resJSON);
// 		dispatch(userSignupProfileUpdateSuccess(resJSON));
// 		// dispatch(userSignupProfileUpdateSuccess(resJSON));
// 	} else {
// 		dispatch(userProfileUpdateFailure(resJSON));
// 	}
// };

///////////////////////////////////////////////////////////////////////////////
/////////////////////////       NEW       /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
export const userProfileUpdate = (info) => ({
	type: USER_PROFILE_UPDATE,
	payload: info,
});

export const userProfileUpdateRequest = () => ({
	type: USER_PROFILE_UPDATE_REQUEST,
});

export const userProfileUpdateSuccess = (payload) => ({
	type: USER_PROFILE_UPDATE_SUCCESS,
	payload,
});

export const userProfileUpdateFailure = (payload) => ({
	type: USER_PROFILE_UPDATE_FAILURE,
	payload,
});

export const userProfileDataUpdateRequest = () => ({
	type: USER_PROFILE_DATA_UPDATE_REQUEST,
});

export const userProfileDataUpdateSuccess = (payload) => ({
	type: USER_PROFILE_DATA_UPDATE_SUCCESS,
	payload,
});

export const userProfileDataUpdateFailure = () => ({
	type: USER_PROFILE_DATA_UPDATE_FAILURE,
});

export const userProfileClearDataAfterSuccessfullSignupVerification = () => ({
	type: USER_PROFILE_CLEAR_DATA_AFTER_SUCCESSFULL_SIGNUP_VERIFICATION,
});

export const userLogin = (payload) => {
	return {
		type: USER_LOGIN,
		payload,
	};
};

export const logoutUser = () => {
	return {
		type: USER_LOGOUT,
	};
};

const userDataSetRequest = () => ({
	type: USER_DATA_SET_REQUEST,
});
const userDataSetSuccess = (payload) => ({
	type: USER_DATA_SET_SUCCESS,
	payload,
});
const userDataSetFailure = (payload) => ({
	type: USER_DATA_SET_FAILURE,
	payload,
});

const userDataUpdateRequest = () => ({
	type: USER_DATA_UPDATE_REQUEST,
});
const userDataUpdateSuccess = (payload) => ({
	type: USER_DATA_UPDATE_SUCCESS,
	payload,
});
const userDataUpdateFailure = (payload) => ({
	type: USER_DATA_UPDATE_FAILURE,
	payload,
});

export {
	userDataSetRequest,
	userDataSetSuccess,
	userDataSetFailure,
	userDataUpdateRequest,
	userDataUpdateSuccess,
	userDataUpdateFailure,
};
