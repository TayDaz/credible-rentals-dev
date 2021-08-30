import {
	USER_TOKEN_LOGIN_REQUEST,
	USER_TOKEN_LOGIN_SUCCESS,
	USER_TOKEN_LOGIN_SUCCESS_SIGNUP_PENDING,
	USER_TOKEN_LOGIN_FAILURE,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_SUCCESS_SIGNUP_PENDING,
	USER_LOGIN_FAILURE,
} from "./types";

import { USER_LOGOUT } from "../user/userTypes";

const initialState = {
	hasCredentialsError: false,
	credentialsErrorMessage: "",
	hasHeadingError: false,
	headingErrorMessage: "",
	isPageLoading: false,
	isCredentialsSubmitLoading: false,
};

const loginReducer = (state = initialState, action) => {
	switch (action.type) {
		case USER_TOKEN_LOGIN_REQUEST:
			return {
				...state,
				isPageLoading: true,
			};
		case USER_TOKEN_LOGIN_SUCCESS:
			return {
				...state,
				isPageLoading: false,
			};
		case USER_TOKEN_LOGIN_SUCCESS_SIGNUP_PENDING:
			return {
				...state,
				isPageLoading: false,
				hasHeadingError: false,
				headingErrorMessage: "",
			};
		case USER_TOKEN_LOGIN_FAILURE:
			return {
				...state,
				isPageLoading: false,
				hasHeadingError: true,
				headingErrorMessage: action.payload,
			};
		case USER_LOGIN_REQUEST:
			return {
				...state,
				isCredentialsSubmitLoading: true,
			};
		case USER_LOGIN_SUCCESS:
			return {
				...state,
				isCredentialsSubmitLoading: false,
			};
		case USER_LOGIN_SUCCESS_SIGNUP_PENDING:
			return {
				...state,
				hasHeadingError: false,
				headingErrorMessage: "",
				hasCredentialsError: false,
				credentialsErrorMessage: "",
			};
		case USER_LOGIN_FAILURE:
			return {
				...state,
				hasCredentialsError: true,
				credentialsErrorMessage: action.payload,
				isCredentialsSubmitLoading: false,
			};
		case USER_LOGOUT:
			return {
				...state,
				hasCredentialsError: false,
				credentialsErrorMessage: "",
				hasHeadingError: false,
				headingErrorMessage: "",
				isPageLoading: false,
				isCredentialsSubmitLoading: false,
			};

		default:
			return state;
	}
};

export default loginReducer;
