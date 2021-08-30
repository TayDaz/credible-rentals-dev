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

const initialState = {
	isLoading: false,
	isError: false,
	errorMessage: "",
	data: null,
};

const forgotPasswordReducer = (state = initialState, action) => {
	switch (action.type) {
		case FORGOT_PASSWORD__CHECK_EMAIL_ID_REQUEST:
			return {
				...state,
				isLoading: true,
			};

		case FORGOT_PASSWORD__CHECK_EMAIL_ID_SUCCESS:
			return {
				...state,
				isLoading: false,
				isError: false,
				errorMessage: "",
				data: action.payload,
			};

		case FORGOT_PASSWORD__CHECK_EMAIL_ID_FAILURE:
			return {
				...state,
				isLoading: false,
				isError: true,
				errorMessage: action.payload,
			};

		case FORGOT_PASSWORD__CHECK_CHALLENGE_CODE_REQUEST:
			return {
				...state,
				isLoading: true,
			};

		case FORGOT_PASSWORD__CHECK_CHALLENGE_CODE_SUCCESS:
			return {
				...state,
				isLoading: false,
				isError: false,
				errorMessage: "",
				data: { ...state.data, ...action.payload },
			};

		case FORGOT_PASSWORD__CHECK_CHALLENGE_CODE_FAILURE:
			return {
				...state,
				isLoading: false,
				isError: true,
				errorMessage: action.payload,
			};

		case FORGOT_PASSWORD__UPDATE_PASSWORD_REQUEST:
			return {
				...state,
				isLoading: true,
				isError: false,
				errorMessage: "",
			};

		case FORGOT_PASSWORD__UPDATE_PASSWORD_SUCCESS:
			return {
				...state,
				isLoading: false,
				isError: false,
				errorMessage: "",
				data: action.payload,
			};

		case FORGOT_PASSWORD__UPDATE_PASSWORD_FAILURE:
			return {
				...state,
				isLoading: false,
				isError: true,
				errorMessage: action.payload,
			};

		case FORGOT_PASSWORD__CLEAR_DATA:
			return {
				...state,
				data: null,
			};
		default:
			return state;
	}
};

export default forgotPasswordReducer;
