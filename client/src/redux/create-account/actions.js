import {
	CREATE_ACCOUNT_USER_SUBMIT_FORM_REQUEST,
	CREATE_ACCOUNT_USER_SUBMIT_FORM_SUCCESS,
	CREATE_ACCOUNT_USER_SUBMIT_FORM_FAILURE,
	CREATE_ACCOUNT_USER_SUBMIT_SMS_OTP_REQUEST,
	CREATE_ACCOUNT_USER_SUBMIT_SMS_OTP_SUCCESS,
	CREATE_ACCOUNT_USER_SUBMIT_SMS_OTP_FAILURE,
	CREATE_ACCOUNT_USER_SUBMIT_EMAIL_OTP_REQUEST,
	CREATE_ACCOUNT_USER_SUBMIT_EMAIL_OTP_SUCCESS,
	CREATE_ACCOUNT_USER_SUBMIT_EMAIL_OTP_FAILURE,
} from "./types";

export const createAccountUserSubmitFormRequest = () => ({
	type: CREATE_ACCOUNT_USER_SUBMIT_FORM_REQUEST,
});
export const createAccountUserSubmitFormSuccess = (payload) => ({
	type: CREATE_ACCOUNT_USER_SUBMIT_FORM_SUCCESS,
	payload,
});
export const createAccountUserSubmitFormFailure = (payload) => ({
	type: CREATE_ACCOUNT_USER_SUBMIT_FORM_FAILURE,
	payload,
});

export const createAccountUserSubmitSmsOtpRequest = () => ({
	type: CREATE_ACCOUNT_USER_SUBMIT_SMS_OTP_REQUEST,
});
export const createAccountUserSubmitSmsOtpSuccess = (payload) => ({
	type: CREATE_ACCOUNT_USER_SUBMIT_SMS_OTP_SUCCESS,
	payload,
});
export const createAccountUserSubmitSmsOtpFailure = (payload) => ({
	type: CREATE_ACCOUNT_USER_SUBMIT_SMS_OTP_FAILURE,
	payload,
});

export const createAccountUserSubmitEmailOtpRequest = () => ({
	type: CREATE_ACCOUNT_USER_SUBMIT_EMAIL_OTP_REQUEST,
});
export const createAccountUserSubmitEmailOtpSuccess = (payload) => ({
	type: CREATE_ACCOUNT_USER_SUBMIT_EMAIL_OTP_SUCCESS,
	payload,
});
export const createAccountUserSubmitEmailOtpFailure = (payload) => ({
	type: CREATE_ACCOUNT_USER_SUBMIT_EMAIL_OTP_FAILURE,
	payload,
});
