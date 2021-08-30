import { url } from "../../config";
import { SUCCESS, FAILURE } from "../../constants";
import apiCall from "../../helpers/apiCall";
import {
  UPLOADS_PAGE__FETCH_ALL_ADDS_REQUEST,
  UPLOADS_PAGE__FETCH_ALL_ADDS_SUCCESS,
  UPLOADS_PAGE__FETCH_ALL_ADDS_FAILURE,
  UPLOADS_PAGE__CHANGE_PRODUCT_RENT_STATUS_REQUEST,
  UPLOADS_PAGE__CHANGE_PRODUCT_RENT_STATUS_SUCCESS,
  UPLOADS_PAGE__CHANGE_PRODUCT_RENT_STATUS_FAILURE,
  UPLOADS_PAGE__UPLOAD_ADD_REQUEST,
  UPLOADS_PAGE__UPLOAD_ADD_SUCCESS,
  UPLOADS_PAGE__UPLOAD_ADD_FAILURE,
  UPLOADS_PAGE__RESET_NEW_ADD_UPLOAD_STATUS,
  UPLOADS_PAGE__GET_PRODUCT_RENTEE_USER_INFO_REQUEST,
  UPLOADS_PAGE__GET_PRODUCT_RENTEE_USER_INFO_SUCCESS,
  UPLOADS_PAGE__GET_PRODUCT_RENTEE_USER_INFO_FAILURE,
} from "./types";

export const uploadsPageFetchAllAddsRequest = () => ({
  type: UPLOADS_PAGE__FETCH_ALL_ADDS_REQUEST,
});

export const uploadsPageFetchAllAddsSuccess = (payload) => ({
  type: UPLOADS_PAGE__FETCH_ALL_ADDS_SUCCESS,
  payload,
});

export const uploadsPageFetchAllAddsFailure = (payload) => ({
  type: UPLOADS_PAGE__FETCH_ALL_ADDS_FAILURE,
  payload,
});

export const uploadsFetchAllAdds = (token) => async (dispatch) => {
  dispatch(uploadsPageFetchAllAddsRequest());

  try {
    const response = await apiCall
      .get(url.allUploadedAdds, { token })
      .then((response) => response.json());

    if (response?.status === SUCCESS) {
      dispatch(uploadsPageFetchAllAddsSuccess(response.data));
    } else if (response?.status === FAILURE) {
      dispatch(uploadsPageFetchAllAddsFailure(response.message));
    } else {
      dispatch(uploadsPageFetchAllAddsFailure("Server error"));
    }
  } catch (err) {
    console.error(
      "[redux/uploads/actions.js] uploadsFetchAllAdds() apiCall ",
      err
    );
    dispatch(uploadsPageFetchAllAddsFailure("Server error"));
  }
};

/**Change product status */

const uploadsPageChangeProductRentStatusRequest = () => ({
  type: UPLOADS_PAGE__CHANGE_PRODUCT_RENT_STATUS_REQUEST,
});

const uploadsPageChangeProductRentStatusSuccess = (payload) => ({
  type: UPLOADS_PAGE__CHANGE_PRODUCT_RENT_STATUS_SUCCESS,
  payload,
});

const uploadsPageChangeProductRentStatusFailure = (payload) => ({
  type: UPLOADS_PAGE__CHANGE_PRODUCT_RENT_STATUS_FAILURE,
  payload,
});

export const changeProductRentStatus =
  (token, product, currentRenteeUserId) => async (dispatch) => {
    dispatch(uploadsPageChangeProductRentStatusRequest());

    try {
      const response = await apiCall
        .post(
          "/api/user/upload/add/rent",
          { token },
          { product, currentRenteeUserId }
        )
        .then((response) => response.json());

      if (response?.status === SUCCESS) {
        dispatch(uploadsPageChangeProductRentStatusSuccess(response.data));
      } else if (response?.status === FAILURE) {
        dispatch(uploadsPageChangeProductRentStatusFailure(response.message));
      } else {
        dispatch(uploadsPageChangeProductRentStatusFailure("Server error"));
      }
    } catch (err) {
      console.error(
        "[redux/uploads/actions.js] changeProductRentStatus() apiCall ",
        err
      );
      dispatch(uploadsPageChangeProductRentStatusFailure("Server error"));
    }
  };

/**Upload add */

const uploadsPageUploadAddRequest = () => ({
  type: UPLOADS_PAGE__UPLOAD_ADD_REQUEST,
});

const uploadsPageUploadAddSuccess = (payload) => ({
  type: UPLOADS_PAGE__UPLOAD_ADD_SUCCESS,
  payload,
});

const uploadsPageUploadAddFailure = (payload) => ({
  type: UPLOADS_PAGE__UPLOAD_ADD_FAILURE,
  payload: payload,
});

export const uploadsPageUploadAdd = (token, data) => async (dispatch) => {
  dispatch(uploadsPageUploadAddRequest());

  try {
    const response = await apiCall
      .postFormData(url.uploadAdd, { token }, data)
      .then((response) => response.json());

    if (response?.status === SUCCESS) {
      dispatch(uploadsPageUploadAddSuccess(response.data));
    } else if (response?.status === FAILURE) {
      dispatch(uploadsPageUploadAddFailure(response.message));
    } else {
      dispatch(uploadsPageUploadAddFailure("Server error"));
    }
  } catch (err) {
    console.error(
      "[redux/uploads/actions.js] changeProductRentStatus() apiCall ",
      err
    );
    dispatch(uploadsPageUploadAddFailure("Server error"));
  }
};

export const resetNewAddUploadStatus = () => ({
  type: UPLOADS_PAGE__RESET_NEW_ADD_UPLOAD_STATUS,
});

/**handleGetProductRenteeUserInfo */

const getProductRenteeUserInfoSuccess = (payload) => ({
  type: UPLOADS_PAGE__GET_PRODUCT_RENTEE_USER_INFO_SUCCESS,
  payload,
});

export const getProductRenteeUserInfo =
  (product, token) => async (dispatch) => {
    try {
      const response = await apiCall
        .post(url.productRenteeUserInfo, { token }, { product })
        .then((response) => response.json());

      if (response?.status === SUCCESS) {
        const currentCheckedoutRenteeUserInformations = response.data;
        dispatch(
          getProductRenteeUserInfoSuccess({
            product,
            currentCheckedoutRenteeUserInformations,
          })
        );
      } else if (response?.status === FAILURE) {
        // dispatch(uploadsPageUploadAddFailure(response.message));
      } else {
        // dispatch(uploadsPageUploadAddFailure("Server error"));
      }
    } catch (err) {
      console.error(
        "[redux/uploads/actions.js] changeProductRentStatus() apiCall ",
        err
      );
      // dispatch(uploadsPageUploadAddFailure("Server error"));
    }
  };
