import apiCall from "../../helpers/apiCall";
import { url } from "../../config";
import {
  HOME_PAGE__GET_LATEST_ADDS_REQUEST,
  HOME_PAGE__GET_LATEST_ADDS_SUCCESS,
  HOME_PAGE__GET_LATEST_ADDS_FAILURE,
  HOME_PAGE__GET_LATEST_CATEGORY_ADDS_REQUEST,
  HOME_PAGE__GET_LATEST_CATEGORY_ADDS_SUCCESS,
  HOME_PAGE__GET_LATEST_CATEGORY_ADDS_FAILURE,
  HOME_PAGE__SEND_MESSAGE_TO_OWNER_REQUEST,
  HOME_PAGE__SEND_MESSAGE_TO_OWNER_SUCCESS,
  HOME_PAGE__SEND_MESSAGE_TO_OWNER_FAILURE,
  HOME_PAGE__DELETE_MESSAGE_NOTIFICATION,
} from "./types";
import { FAILURE, SUCCESS } from "../../constants";

/**gets the latest adds  */
const getLatestAddsRequest = () => ({
  type: HOME_PAGE__GET_LATEST_ADDS_REQUEST,
});

const getLatestAddsSuccess = (payload) => ({
  type: HOME_PAGE__GET_LATEST_ADDS_SUCCESS,
  payload,
});

const getLatestAddsFailure = (payload) => ({
  type: HOME_PAGE__GET_LATEST_ADDS_FAILURE,
  payload,
});

export const homePageGetLatestAdds = () => async (dispatch) => {
  dispatch(getLatestAddsRequest());

  const response = await apiCall
    .get(url.homePageLatestAdds, {})
    .then((response) => response.json())
    .catch((err) => {
      console.error(
        "[redux/home/actions/.js] homePageGetLatestAdds ERROR while fetching data",
        err
      );
      dispatch(getLatestAddsFailure("Server error"));
    });

  if (response?.status === SUCCESS) {
    dispatch(getLatestAddsSuccess(response.data));
  } else {
    dispatch(getLatestAddsFailure(response?.message));
  }
};

/** Category adds */

const getLatestCategoryAddsRequest = () => ({
  type: HOME_PAGE__GET_LATEST_CATEGORY_ADDS_REQUEST,
});

const getLatestCategoryAddsSuccess = (payload) => ({
  type: HOME_PAGE__GET_LATEST_CATEGORY_ADDS_SUCCESS,
  payload,
});

const getLatestCategoryAddsFailure = (payload) => ({
  type: HOME_PAGE__GET_LATEST_CATEGORY_ADDS_FAILURE,
  payload,
});

export const getLatestCategoryAdds = (category, token) => async (dispatch) => {
  dispatch(getLatestCategoryAddsRequest());

  const response = await apiCall
    .get(url.categoryLatestAdds(category), token ? { token } : {})
    .then((response) => response.json())
    .catch((err) => {
      console.error(
        "[redux/home/actions/.js] homePageGetLatestAdds ERROR while fetching data",
        err
      );
      dispatch(getLatestCategoryAddsFailure("Server error"));
    });

  if (response?.status === SUCCESS) {
    dispatch(getLatestCategoryAddsSuccess({ adds: response.data, category }));
  } else {
    dispatch(getLatestCategoryAddsFailure(response?.message));
  }
};

/**Send message to owner */
const sendMessageToOwnerRequest = (payload) => ({
  type: HOME_PAGE__SEND_MESSAGE_TO_OWNER_REQUEST,
  payload,
});

const sendMessageToOwnerSuccess = (payload) => ({
  type: HOME_PAGE__SEND_MESSAGE_TO_OWNER_SUCCESS,
  payload,
});

const sendMessageToOwnerFailure = (payload) => ({
  type: HOME_PAGE__SEND_MESSAGE_TO_OWNER_FAILURE,
  payload,
});

export const sendMessageToOwner =
  (token, product, message) => async (dispatch) => {
    dispatch(sendMessageToOwnerRequest(product));

    try {
      const response = await apiCall
        .post(url.sendMessageToOwner, { token }, { product, message })
        .then((response) => response.json());

      if (response?.status === SUCCESS) {
        dispatch(sendMessageToOwnerSuccess(product));
      } else if (response?.status === FAILURE) {
        dispatch(sendMessageToOwnerFailure(product));
      } else {
        dispatch(sendMessageToOwnerFailure("Server error"));
      }
    } catch (err) {
      console.error("[home/actions.js] sendMessageToOwner() ", err);
      dispatch(sendMessageToOwnerFailure("Server error"));
    }
  };

export const deleteMessageNotification = (payload) => ({
  type: HOME_PAGE__DELETE_MESSAGE_NOTIFICATION,
  payload,
});
