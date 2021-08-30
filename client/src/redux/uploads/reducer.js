import { FAILURE, INITIATED, NOT_INITIATED, SUCCESS } from "../../constants";
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
  UPLOADS_PAGE__GET_PRODUCT_RENTEE_USER_INFO_SUCCESS,
} from "./types";

const initialState = {
  isLoading: false,
  isFetchingProducts: false,
  isError: false,
  errorMessage: "",
  adds: [],
  // isNewAddUploading: false,
  newAddUploadStatus: NOT_INITIATED,
  isErrorNewAddUpload: false,
  errorMessageNewAddUpload: "",
};

const uploadsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOADS_PAGE__FETCH_ALL_ADDS_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        errorMessage: false,
        isFetchingProducts: true,
      };

    case UPLOADS_PAGE__FETCH_ALL_ADDS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isFetchingProducts: false,
        adds: [...action.payload],
      };

    case UPLOADS_PAGE__FETCH_ALL_ADDS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isFetchingProducts: false,
        isError: true,
        errorMessage: action.payload,
      };

    case UPLOADS_PAGE__CHANGE_PRODUCT_RENT_STATUS_REQUEST:
      return {
        isLoading: true,
        isError: false,
        errorMessage: "",
        ...state,
      };

    case UPLOADS_PAGE__CHANGE_PRODUCT_RENT_STATUS_SUCCESS:
      // const updatedAdds = [...state.adds];
      const incomingAdd = action.payload;
      const updatedAdds = state.adds.map((add) => {
        if (add._id !== incomingAdd._id) {
          return add;
        } else {
          return incomingAdd;
        }
      });

      return {
        ...state,
        isLoading: false,
        adds: updatedAdds,
      };

    case UPLOADS_PAGE__CHANGE_PRODUCT_RENT_STATUS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };

    case UPLOADS_PAGE__UPLOAD_ADD_REQUEST:
      return {
        ...state,
        // isNewAddUploading: true,
        newAddUploadStatus: INITIATED,
        isErrorNewAddUpload: false,
        errorMessageNewAddUpload: "",
      };

    case UPLOADS_PAGE__UPLOAD_ADD_SUCCESS:
      return {
        ...state,
        // isNewAddUploading: false,
        newAddUploadStatus: SUCCESS,
        isErrorNewAddUpload: false,
        errorMessageNewAddUpload: "",
        adds: [...state.adds, action.payload],
      };

    case UPLOADS_PAGE__UPLOAD_ADD_FAILURE:
      return {
        ...state,
        // isNewAddUploading: false,
        newAddUploadStatus: FAILURE,
        isErrorNewAddUpload: true,
        errorMessageNewAddUpload: action.payload,
      };

    case UPLOADS_PAGE__RESET_NEW_ADD_UPLOAD_STATUS:
      return {
        ...state,
        newAddUploadStatus: NOT_INITIATED,
      };

    case UPLOADS_PAGE__GET_PRODUCT_RENTEE_USER_INFO_SUCCESS: {
      const {
        product: { _id },
        currentCheckedoutRenteeUserInformations,
      } = action.payload;
      const updateAddIndex = state.adds.findIndex((add) => add._id === _id);

      const updatedAdds = [...state.adds];

      if (updateAddIndex < 0) {
      }

      updatedAdds[updateAddIndex] = {
        ...updatedAdds[updateAddIndex],
        currentCheckedoutRenteeUserInformations,
      };

      return {
        ...state,
        adds: updatedAdds,
      };
    }

    default:
      return state;
  }
};

export default uploadsReducer;
