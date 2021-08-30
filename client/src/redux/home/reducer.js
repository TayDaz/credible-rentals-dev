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

const initialState = {
  isLoading: false,
  data: null,
  isError: false,
  errorMessage: "",
  messages: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HOME_PAGE__GET_LATEST_ADDS_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        errorMessage: "",
      };

    case HOME_PAGE__GET_LATEST_ADDS_SUCCESS:
      return {
        ...state,
        isLoading: true,
        data: {
          ...state.data,
          latestAdds: action.payload,
        },
      };

    case HOME_PAGE__GET_LATEST_ADDS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };

    case HOME_PAGE__GET_LATEST_CATEGORY_ADDS_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        errorMessage: "",
      };

    case HOME_PAGE__GET_LATEST_CATEGORY_ADDS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: {
          ...state.data,
          [action.payload.category]: action.payload.adds,
        },
      };

    case HOME_PAGE__GET_LATEST_CATEGORY_ADDS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };

    case HOME_PAGE__SEND_MESSAGE_TO_OWNER_REQUEST: {
      const { _id } = action.payload;
      const { data } = state;

      for (const [category, adds] of Object.entries(data)) {
        const isAddIdPresent = adds.findIndex((add) => add._id === _id);
        console.log("isAddIdPresent", isAddIdPresent);
        /**if the addIs is present in the list of adds then update the add's properties */
        if (isAddIdPresent >= 0) {
          console.log("Add id is present");
          data[category][isAddIdPresent] = {
            ...data[category][isAddIdPresent],
            isSendingMessage: true,
          };
        }
      }

      return {
        ...state,
        data,
      };
    }
    case HOME_PAGE__SEND_MESSAGE_TO_OWNER_SUCCESS: {
      const { _id } = action.payload;
      const { data } = state;

      for (const [category, adds] of Object.entries(data)) {
        const isAddIdPresent = adds.findIndex((add) => add._id === _id);
        /**if the addIs is present in the list of adds then update the add's properties */
        if (isAddIdPresent >= 0) {
          data[category][isAddIdPresent] = {
            ...data[category][isAddIdPresent],
            isSendingMessage: false,
            isMessageSentSuccess: true,
          };
        }
      }

      return {
        ...state,
        data,
      };
    }
    case HOME_PAGE__SEND_MESSAGE_TO_OWNER_FAILURE: {
      const { _id } = action.payload;
      const { data } = state;

      for (const [category, adds] of Object.entries(data)) {
        const isAddIdPresent = adds.findIndex((add) => add._id === _id);
        /**if the addIs is present in the list of adds then update the add's properties */
        if (isAddIdPresent) {
          data[category][isAddIdPresent] = {
            ...data[category][isAddIdPresent],
            isSendingMessage: false,
            isMessageSentSuccess: false,
            isError: true,
          };
        }
      }

      return {
        ...state,
        data,
      };
    }

    case HOME_PAGE__DELETE_MESSAGE_NOTIFICATION: {
      const { _id } = action.payload;
      const { data } = state;

      for (const [category, adds] of Object.entries(data)) {
        const isAddIdPresent = adds.findIndex((add) => add._id === _id);
        /**if the addIs is present in the list of adds then update the add's properties */
        if (isAddIdPresent >= 0) {
          /** removing the properties */
          const {
            isSendingMessage,
            isMessageSentSuccess,
            isError,
            ...product
          } = data[category][isAddIdPresent];
          data[category][isAddIdPresent] = product;
        }
      }

      return {
        ...state,
        data,
      };
    }

    default:
      return state;
  }
};

export default reducer;
