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

const initialState = {
	isRequestLoading: false,
	hasErrorResponse: false,
	responseErrorMessage: "",
};

const createAccountReducer = (state = initialState, action) => {
	switch (action.type) {
		case CREATE_ACCOUNT_USER_SUBMIT_FORM_REQUEST:
			return {
				...state,
				isRequestLoading: true,
				hasErrorResponse: false,
				responseErrorMessage: "",
			};
		case CREATE_ACCOUNT_USER_SUBMIT_FORM_SUCCESS:
			return {
				...state,
				isRequestLoading: false,
				hasErrorResponse: false,
				responseErrorMessage: "",
			};
		case CREATE_ACCOUNT_USER_SUBMIT_FORM_FAILURE:
			return {
				...state,
				isRequestLoading: false,
				hasErrorResponse: false,
				responseErrorMessage: action.payload,
			};
		case CREATE_ACCOUNT_USER_SUBMIT_SMS_OTP_REQUEST:
			return {
				...state,
				isRequestLoading: true,
				hasErrorResponse: false,
				responseErrorMessage: "",
			};
		case CREATE_ACCOUNT_USER_SUBMIT_SMS_OTP_SUCCESS:
			return {
				...state,
				isRequestLoading: false,
				hasErrorResponse: false,
				responseErrorMessage: "",
			};
		case CREATE_ACCOUNT_USER_SUBMIT_SMS_OTP_FAILURE:
			return {
				...state,
				isRequestLoading: false,
				hasErrorResponse: true,
				responseErrorMessage: action.payload,
			};
		case CREATE_ACCOUNT_USER_SUBMIT_EMAIL_OTP_REQUEST:
			return {
				...state,
				hasErrorResponse: false,
				responseErrorMessage: "",
			};
		case CREATE_ACCOUNT_USER_SUBMIT_EMAIL_OTP_SUCCESS:
			return {
				...state,
				hasErrorResponse: false,
				responseErrorMessage: "",
			};
		case CREATE_ACCOUNT_USER_SUBMIT_EMAIL_OTP_FAILURE:
			return {
				...state,
				hasErrorResponse: true,
				responseErrorMessage: action.payload,
			};
		default:
			return state;
	}
};

export default createAccountReducer;
