import { PENDING } from "../../constants";
import {
  USER_REGISTRATION_REQUEST,
  USER_REGISTRATION_SUCCESS,
  USER_REGISTRATION_FAILURE,
  USER_REGISTRATION_CHECK_EMAIL_EXISTENCE_REQUEST,
  USER_REGISTRATION_CHECK_EMAIL_EXISTENCE_SUCCESS,
  USER_REGISTRATION_CHECK_EMAIL_EXISTENCE_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_DELETE_ERROR_VALUE,
  USER_LOGIN,
  USER_LOGOUT,
  USER_PROFILE_UPDATE_REQUEST,
  USER_PROFILE_UPDATE_SUCCESS,
  USER_PROFILE_UPDATE_FAILURE,
  USER_SIGNUP_STATUS_UPDATE,
  USER_SMS_OTP_SENT,
  USER_UPDATE_TOKEN,
  FORGOT_PASSWORD_INITIATED_SUCCESS,
  USER_PROFILE_UPDATE,
  USER_PROFILE_DATA_UPDATE_REQUEST,
  USER_PROFILE_DATA_UPDATE_SUCCESS,
  USER_PROFILE_DATA_UPDATE_FAILURE,
  USER_PROFILE_CLEAR_DATA_AFTER_SUCCESSFULL_SIGNUP_VERIFICATION,
} from "./userTypes";

import {
  USER_TOKEN_LOGIN_SUCCESS,
  USER_TOKEN_LOGIN_SUCCESS_SIGNUP_PENDING,
} from "../login/types";
import {
  CREATE_ACCOUNT_USER_SUBMIT_FORM_SUCCESS,
  CREATE_ACCOUNT_USER_SUBMIT_SMS_OTP_SUCCESS,
  CREATE_ACCOUNT_USER_SUBMIT_EMAIL_OTP_SUCCESS,
} from "../create-account/types";

import {
  PROFILE__CHANGE_USER_MOBILE_NUMBER_SUCCESS,
  PROFILE__UPDATE_USER_INFO_SUCCESS,
  PROFILE__UPDATE_USER_AVATAR_SUCCESS,
} from "../profile/types";

import {
  MY_ORDERS__CART__ADD_PRODUCT_SUCCESS,
  MY_ORDERS__CART__REMOVE_PRODUCT_SUCCESS,
  MY_ORDERS__WISHLIST__ADD_PRODUCT_SUCCESS,
  MY_ORDERS__WISHLIST__REMOVE_PRODUCT_SUCCESS,
} from "../my-orders/types";

const initialState = {
  loading: false,
  isProfileLoading: false,
  isProfileDataLoading: false,
  data: null,
  error: null,
  isLoggedIn: false,
  token: null,
};

const userReducer = (state = initialState, action) => {
  let signupStatus = state.data?.signupStatus,
    smsAuthStatus = state.data?.smsAuthStatus,
    emailAuthStatus = state.data?.emailAuthStatus;

  switch (action.type) {
    case USER_REGISTRATION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        isLoggedIn: false,
      };
    case USER_REGISTRATION_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
        isLoggedIn: true,
      };
    case USER_REGISTRATION_FAILURE:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload,
        isLoggedIn: false,
      };

    case USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        isLoggedIn: false,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
        isLoggedIn: true,
      };
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        data: {},
        error: action.payload,
        isLoggedIn: false,
      };

    case USER_REGISTRATION_CHECK_EMAIL_EXISTENCE_REQUEST:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: "",
      };
    case USER_REGISTRATION_CHECK_EMAIL_EXISTENCE_SUCCESS:
      return {
        ...state,
        loading: true,
      };
    case USER_REGISTRATION_CHECK_EMAIL_EXISTENCE_FAILURE:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload,
      };

    case USER_DELETE_ERROR_VALUE:
      return {
        ...state,
        error: null,
      };

    case USER_LOGIN:
      return {
        ...state,
        isLoggedIn: true,
      };
    case USER_LOGOUT:
      console.log("USER_REDUCER");
      return {
        loading: false,
        data: null,
        error: null,
        isLoggedIn: false,
        token: null,
      };

    case USER_PROFILE_UPDATE:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
      };

    case USER_PROFILE_UPDATE_REQUEST:
      return { ...state, profileLoading: true };
    case USER_PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        data: { ...action.payload },
        isProfileLoading: false,
      };
    case USER_PROFILE_UPDATE_FAILURE:
      return {
        ...state,
        data: null,
        isProfileLoading: false,
      };

    case USER_PROFILE_DATA_UPDATE_REQUEST:
      return {
        ...state,
        isProfileDataLoading: true,
      };
    case USER_PROFILE_DATA_UPDATE_SUCCESS:
      return {
        ...state,
        isProfileDataLoading: false,
        data: { ...state.data, ...action.payload },
      };
    case USER_PROFILE_DATA_UPDATE_FAILURE:
      return {
        ...state,
        isProfileDataLoading: false,
      };

    case USER_PROFILE_CLEAR_DATA_AFTER_SUCCESSFULL_SIGNUP_VERIFICATION:
      return {
        ...state,
        data: { signupStatus, smsAuthStatus, emailAuthStatus },
      };

    case FORGOT_PASSWORD_INITIATED_SUCCESS:
      return {
        ...state,
        data: {
          ...action.payload,
        },
      };

    case USER_SMS_OTP_SENT:
      return {
        ...state,
        smsOtpSent: action.payload,
      };

    case USER_UPDATE_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    ////////////////////////////////////////////////////////////
    case USER_TOKEN_LOGIN_SUCCESS:
      return {
        ...state,
        data: { ...action.payload },
        isLoggedIn: true,
      };

    case USER_TOKEN_LOGIN_SUCCESS_SIGNUP_PENDING:
      return {
        ...state,
        data: { ...action.payload },
      };

    case CREATE_ACCOUNT_USER_SUBMIT_FORM_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
        isLoggedIn: false,
      };
    case CREATE_ACCOUNT_USER_SUBMIT_SMS_OTP_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
        isLoggedIn: false,
      };
    case CREATE_ACCOUNT_USER_SUBMIT_EMAIL_OTP_SUCCESS:
      if (state.data.emailAuthStatus === PENDING) {
        return {
          ...state,
          data: { ...state.data, ...action.payload },
        };
      } else {
        const { signupStatus, smsAuthStatus, emailAuthStatus } = action.payload;
        return {
          ...state,
          data: { signupStatus, smsAuthStatus, emailAuthStatus },
          isLoggedIn: false,
        };
      }

    case PROFILE__UPDATE_USER_INFO_SUCCESS:
      return {
        ...state,
        data: { ...state.data, ...action.payload },
      };

    case PROFILE__CHANGE_USER_MOBILE_NUMBER_SUCCESS:
      const { mobileNumber } = action.payload;

      if (mobileNumber) {
        return {
          ...state,
          data: {
            ...state.data,
            mobileNumber,
          },
        };
      } else {
        return state;
      }

    case PROFILE__UPDATE_USER_AVATAR_SUCCESS:
      return {
        ...state,
        data: { ...state.data, ...action.payload },
      };

    /**my-orders*/

    case MY_ORDERS__CART__ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
      };

    case MY_ORDERS__CART__REMOVE_PRODUCT_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
      };

    case MY_ORDERS__WISHLIST__ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
      };

    case MY_ORDERS__WISHLIST__REMOVE_PRODUCT_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
      };

    default:
      return state;
  }
};

export default userReducer;
