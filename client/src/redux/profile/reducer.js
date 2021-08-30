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

const initialState = {
	isProfileInfoLoading: false,
	isAvatarLoading: false,
	isProfileInfoError: false,
	profileInfoErrorMessage: "",
	avatarErrorMessage: "",
	data: null,
};

const profileReducer = (state = initialState, action) => {
	switch (action.type) {
		case PROFILE__UPDATE_USER_INFO_REQUEST:
			return {
				...state,
				isProfileInfoLoading: true,
				profileInfoErrorMessage: "",
			};

		case PROFILE__UPDATE_USER_INFO_SUCCESS:
			return {
				...state,
				isProfileInfoLoading: false,
				profileInfoErrorMessage: "",
			};

		case PROFILE__UPDATE_USER_INFO_FAILURE:
			return {
				...state,
				isProfileInfoLoading: false,
				profileInfoErrorMessage: action.payload,
			};

		case PROFILE__CHANGE_USER_PASSWORD_REQUEST:
			return {
				...state,
				isPasswordDialogLoading: true,
				isPasswordDialogErrorMessage: false,
				passwordDialogErrorMessage: "",
			};

		case PROFILE__CHANGE_USER_PASSWORD_SUCCESS:
			return {
				...state,
				isPasswordDialogLoading: false,
				data: action.payload,
			};

		case PROFILE__CHANGE_USER_PASSWORD_FAILURE:
			return {
				...state,
				isPasswordDialogLoading: false,
				isPasswordDialogErrorMessage: true,
				passwordDialogErrorMessage: action.payload,
			};
		case PROFILE__CHANGE_USER_MOBILE_NUMBER_REQUEST:
			return {
				...state,
				isMobileDialogLoading: true,
				isMobileDialogErrorMessage: false,
				mobileDialogErrorMessage: "",
			};

		case PROFILE__CHANGE_USER_MOBILE_NUMBER_SUCCESS:
			return {
				...state,
				isMobileDialogLoading: false,
				data: action.payload,
			};

		case PROFILE__CHANGE_USER_MOBILE_NUMBER_FAILURE:
			return {
				...state,
				isMobileDialogLoading: false,
				isMobileDialogErrorMessage: true,
				mobileDialogErrorMessage: action.payload,
			};

		case PROFILE__UPDATE_USER_AVATAR_REQUEST:
			return {
				...state,
				isAvatarLoading: true,
			};

		case PROFILE__UPDATE_USER_AVATAR_SUCCESS:
			return {
				...state,
				isAvatarLoading: false,
			};

		case PROFILE__UPDATE_USER_AVATAR_FAILURE:
			return {
				...state,
				isAvatarLoading: false,
			};

		case PROFILE__CLEAR_DATA:
			return {
				...state,
				data: null,
			};

		default:
			return state;
	}
};

export default profileReducer;
