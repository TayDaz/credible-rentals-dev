import {
  MY_ORDERS__CART__ADD_PRODUCT_REQUEST,
  MY_ORDERS__CART__ADD_PRODUCT_SUCCESS,
  MY_ORDERS__CART__ADD_PRODUCT_FAILURE,
  MY_ORDERS__CART__GET_ALL_PRODUCTS_REQUEST,
  MY_ORDERS__CART__GET_ALL_PRODUCTS_SUCCESS,
  MY_ORDERS__CART__GET_ALL_PRODUCTS_FAILURE,
  MY_ORDERS__CART__CHECKOUT_PRODUCT_REQUEST,
  MY_ORDERS__CART__CHECKOUT_PRODUCT_SUCCESS,
  MY_ORDERS__CART__CHECKOUT_PRODUCT_FAILURE,
  MY_ORDERS__CART__CANCEL_CHECKEDOUT_PRODUCT_SUCCESS,
  MY_ORDERS__WISHLIST__ADD_PRODUCT_REQUEST,
  MY_ORDERS__WISHLIST__ADD_PRODUCT_SUCCESS,
  MY_ORDERS__WISHLIST__ADD_PRODUCT_FAILURE,
  MY_ORDERS__WISHLIST__REMOVE_PRODUCT_REQUEST,
  MY_ORDERS__WISHLIST__REMOVE_PRODUCT_SUCCESS,
  MY_ORDERS__WISHLIST__REMOVE_PRODUCT_FAILURE,
  MY_ORDERS__WISHLIST__GET_ALL_PRODUCTS_REQUEST,
  MY_ORDERS__WISHLIST__GET_ALL_PRODUCTS_SUCCESS,
  MY_ORDERS__WISHLIST__GET_ALL_PRODUCTS_FAILURE,
  MY_ORDERS__CURRENT_ORDERS__CANCEL_CURRENT_ORDER_REQUEST,
  MY_ORDERS__CURRENT_ORDERS__CANCEL_CURRENT_ORDER_SUCCESS,
  MY_ORDERS__CURRENT_ORDERS__CANCEL_CURRENT_ORDER_FAILURE,
} from "./types";

const initialState = {
  isLoading: false,
  isError: false,
  errorMessage: "",
  data: [],
  cart: [],
  wishlist: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case MY_ORDERS__CART__ADD_PRODUCT_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        errorMessage: "",
      };

    case MY_ORDERS__CART__ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        // cart: [...state.cart, action.payload],
      };

    case MY_ORDERS__CART__ADD_PRODUCT_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };

    case MY_ORDERS__CART__GET_ALL_PRODUCTS_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        errorMessage: "",
      };

    case MY_ORDERS__CART__GET_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        cart: action.payload,
      };

    case MY_ORDERS__CART__GET_ALL_PRODUCTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };

    case MY_ORDERS__CART__CHECKOUT_PRODUCT_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        errorMessage: "",
      };

    case MY_ORDERS__CART__CHECKOUT_PRODUCT_SUCCESS:
      const updatedProduct = { ...action.payload };
      const currentCart = state.cart.filter(
        (product) => product._id !== updatedProduct._id
      );

      currentCart.push(updatedProduct);

      return {
        ...state,
        isLoading: false,
        cart: currentCart,
      };

    case MY_ORDERS__CART__CHECKOUT_PRODUCT_FAILURE:
      return {
        ...state,
        isError: true,
        errorMessage: action.payload,
      };

    case MY_ORDERS__CART__CANCEL_CHECKEDOUT_PRODUCT_SUCCESS: {
      const cart = [...state.cart];
      const updateProductIndex = cart.findIndex(
        (product) => product._id === action.payload._id
      );

      cart[updateProductIndex] = action.payload;

      return {
        ...state,
        cart,
      };
    }

    case MY_ORDERS__WISHLIST__ADD_PRODUCT_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        errorMessage: "",
      };

    case MY_ORDERS__WISHLIST__ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        // cart: [...state.cart, action.payload],
      };

    case MY_ORDERS__WISHLIST__ADD_PRODUCT_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };

    case MY_ORDERS__WISHLIST__GET_ALL_PRODUCTS_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        errorMessage: "",
      };

    case MY_ORDERS__WISHLIST__GET_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        wishlist: action.payload,
      };

    case MY_ORDERS__WISHLIST__GET_ALL_PRODUCTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };

    case MY_ORDERS__CURRENT_ORDERS__CANCEL_CURRENT_ORDER_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        errorMessage: "",
      };

    case MY_ORDERS__CURRENT_ORDERS__CANCEL_CURRENT_ORDER_SUCCESS: {
      const updateCartAddIndex = state.cart.findIndex(
        (add) => add._id === action.payload._id
      );

      const cart = [...state.cart];
      cart[updateCartAddIndex] = action.payload;

      return {
        ...state,
        isLoading: false,
        cart,
      };
    }

    case MY_ORDERS__CURRENT_ORDERS__CANCEL_CURRENT_ORDER_FAILURE:
      return {
        ...state,
        isError: true,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default cartReducer;
