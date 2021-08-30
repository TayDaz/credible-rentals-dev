import { url } from "../../config";
import { SUCCESS, FAILURE } from "../../constants";
import apiCall from "../../helpers/apiCall";
import {
  MY_ORDERS__CART__ADD_PRODUCT_REQUEST,
  MY_ORDERS__CART__ADD_PRODUCT_SUCCESS,
  MY_ORDERS__CART__ADD_PRODUCT_FAILURE,
  MY_ORDERS__CART__REMOVE_PRODUCT_REQUEST,
  MY_ORDERS__CART__REMOVE_PRODUCT_SUCCESS,
  MY_ORDERS__CART__REMOVE_PRODUCT_FAILURE,
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

/**add product to cart */
const cartAddProductRequest = () => ({
  type: MY_ORDERS__CART__ADD_PRODUCT_REQUEST,
});

const cartAddProductSuccess = (payload) => ({
  type: MY_ORDERS__CART__ADD_PRODUCT_SUCCESS,
  payload,
});

const cartAddProductFailure = (payload) => ({
  type: MY_ORDERS__CART__ADD_PRODUCT_FAILURE,
  payload,
});

export const addProductToCart = (token, product) => async (dispatch) => {
  dispatch(cartAddProductRequest());

  try {
    const response = await apiCall
      .post(url.cart, { token }, { product })
      .then((response) => response.json());

    if (response?.status === SUCCESS) {
      dispatch(cartAddProductSuccess(response.data));
    } else if (response?.status === FAILURE) {
      dispatch(cartAddProductFailure(response.message));
    } else {
      dispatch(cartAddProductFailure("Server error"));
    }
  } catch (err) {
    dispatch(cartAddProductFailure("Server error"));
  }
};

/**remove product to cart */
const cartRemoveProductRequest = () => ({
  type: MY_ORDERS__CART__REMOVE_PRODUCT_REQUEST,
});

const cartRemoveProductSuccess = (payload) => ({
  type: MY_ORDERS__CART__REMOVE_PRODUCT_SUCCESS,
  payload,
});

const cartRemoveProductFailure = (payload) => ({
  type: MY_ORDERS__CART__REMOVE_PRODUCT_FAILURE,
  payload,
});

export const removeProductFromCart = (token, product) => async (dispatch) => {
  dispatch(cartRemoveProductRequest());

  try {
    const response = await apiCall
      .delete(url.cart, { token }, { product })
      .then((response) => response.json());

    if (response?.status === SUCCESS) {
      dispatch(cartRemoveProductSuccess(response.data));
    } else if (response?.status === FAILURE) {
      dispatch(cartRemoveProductFailure(response.message));
    } else {
      dispatch(cartRemoveProductFailure("Server error"));
    }
  } catch (err) {
    console.error(
      "[redux/my-orders/actions.js] removeProductFromCart apiCall ",
      err
    );
    dispatch(cartRemoveProductFailure("Server error"));
  }
};

/**get all cart items */

const cartGetAllProductsRequest = () => ({
  type: MY_ORDERS__CART__GET_ALL_PRODUCTS_REQUEST,
});

const cartGetAllProductsSuccess = (payload) => ({
  type: MY_ORDERS__CART__GET_ALL_PRODUCTS_SUCCESS,
  payload,
});

const cartGetAllProductsFailure = (payload) => ({
  type: MY_ORDERS__CART__GET_ALL_PRODUCTS_FAILURE,
  payload,
});

export const getAllCartProducts = (token) => async (dispatch) => {
  dispatch(cartGetAllProductsRequest());

  try {
    const response = await apiCall
      .get(url.cart, { token })
      .then((response) => response.json());

    if (response?.status === SUCCESS) {
      dispatch(cartGetAllProductsSuccess(response.data));
    } else if (response?.status === FAILURE) {
      dispatch(cartGetAllProductsFailure(response.message));
    } else {
      dispatch(cartGetAllProductsFailure("Server error"));
    }
  } catch (err) {
    dispatch(cartGetAllProductsFailure("Server error"));
  }
};

/** checkout from cart */

const cartCheckoutProductRequet = () => ({
  type: MY_ORDERS__CART__CHECKOUT_PRODUCT_REQUEST,
});

const cartCheckoutProductSuccess = (payload) => ({
  type: MY_ORDERS__CART__CHECKOUT_PRODUCT_SUCCESS,
  payload,
});

const cartCheckoutProductFailure = (payload) => ({
  type: MY_ORDERS__CART__CHECKOUT_PRODUCT_FAILURE,
  payload,
});

export const checkoutProductFromCart = (token, product) => async (dispatch) => {
  dispatch(cartCheckoutProductRequet());

  try {
    const response = await apiCall
      .post(url.cartCheckout, { token }, { product })
      .then((response) => response.json());

    if (response?.status === SUCCESS) {
      dispatch(cartCheckoutProductSuccess(response.data));
    } else if (response?.status === FAILURE) {
      dispatch(cartCheckoutProductFailure(response.message));
    } else {
      dispatch(cartCheckoutProductFailure("Server error"));
    }
  } catch (err) {
    console.error(
      "[redux/my-orders/actions.js] removeProductFromCart apiCall ",
      err
    );
    dispatch(cartCheckoutProductFailure("Server error"));
  }
};

/**add product to wishlist */
const wishlistAddProductRequest = () => ({
  type: MY_ORDERS__WISHLIST__ADD_PRODUCT_REQUEST,
});

const wishlistAddProductSuccess = (payload) => ({
  type: MY_ORDERS__WISHLIST__ADD_PRODUCT_SUCCESS,
  payload,
});

const wishlistAddProductFailure = (payload) => ({
  type: MY_ORDERS__WISHLIST__ADD_PRODUCT_FAILURE,
  payload,
});

export const addProductToWishlist = (token, product) => async (dispatch) => {
  dispatch(wishlistAddProductRequest());

  try {
    const response = await apiCall
      .post(url.wishlist, { token }, { product })
      .then((response) => response.json());

    if (response?.status === SUCCESS) {
      dispatch(wishlistAddProductSuccess(response.data));
    } else if (response?.status === FAILURE) {
      dispatch(wishlistAddProductFailure(response.message));
    } else {
      dispatch(wishlistAddProductFailure("Server error"));
    }
  } catch (err) {
    dispatch(wishlistAddProductFailure("Server error"));
  }
};

/**remove product to wishlist */
const wishlistRemoveProductRequest = () => ({
  type: MY_ORDERS__WISHLIST__REMOVE_PRODUCT_REQUEST,
});

const wishlistRemoveProductSuccess = (payload) => ({
  type: MY_ORDERS__WISHLIST__REMOVE_PRODUCT_SUCCESS,
  payload,
});

const wishlistRemoveProductFailure = (payload) => ({
  type: MY_ORDERS__WISHLIST__REMOVE_PRODUCT_FAILURE,
  payload,
});

export const removeProductFromWishlist =
  (token, product) => async (dispatch) => {
    dispatch(wishlistRemoveProductRequest());

    try {
      const response = await apiCall
        .delete(url.wishlist, { token }, { product })
        .then((response) => response.json());

      if (response?.status === SUCCESS) {
        dispatch(wishlistRemoveProductSuccess(response.data));
      } else if (response?.status === FAILURE) {
        dispatch(wishlistRemoveProductFailure(response.message));
      } else {
        dispatch(wishlistRemoveProductFailure("Server error"));
      }
    } catch (err) {
      console.error(
        "[redux/my-orders/actions.js] removeProductFromWishlist apiCall ",
        err
      );
      dispatch(wishlistRemoveProductFailure("Server error"));
    }
  };

/**get all wishlist items */

const wishlistGetAllProductsRequest = () => ({
  type: MY_ORDERS__WISHLIST__GET_ALL_PRODUCTS_REQUEST,
});

const wishlistGetAllProductsSuccess = (payload) => ({
  type: MY_ORDERS__WISHLIST__GET_ALL_PRODUCTS_SUCCESS,
  payload,
});

const wishlistGetAllProductsFailure = (payload) => ({
  type: MY_ORDERS__WISHLIST__GET_ALL_PRODUCTS_FAILURE,
  payload,
});

export const getAllWishlistProducts = (token) => async (dispatch) => {
  dispatch(wishlistGetAllProductsRequest());

  try {
    const response = await apiCall
      .get(url.wishlist, { token })
      .then((response) => response.json());

    if (response?.status === SUCCESS) {
      dispatch(wishlistGetAllProductsSuccess(response.data));
    } else if (response?.status === FAILURE) {
      dispatch(wishlistGetAllProductsFailure(response.message));
    } else {
      dispatch(wishlistGetAllProductsFailure("Server error"));
    }
  } catch (err) {
    dispatch(wishlistGetAllProductsFailure("Server error"));
  }
};

/**cancelCheckedoutProductFromCart */

const cancelCheckedoutProductFromCartSuccess = (payload) => ({
  type: MY_ORDERS__CART__CANCEL_CHECKEDOUT_PRODUCT_SUCCESS,
  payload,
});

export const cancelCheckedoutProductFromCart =
  (product, token) => async (dispatch) => {
    try {
      const response = await apiCall
        .delete(url.cartCheckout, { token }, { product })
        .then((response) => response.json());

      if (response?.status === SUCCESS) {
        dispatch(cancelCheckedoutProductFromCartSuccess(response.data));
      } else if (response?.status === FAILURE) {
        // dispatch(wishlistGetAllProductsFailure(response.message));
      } else {
        // dispatch(wishlistGetAllProductsFailure("Server error"));
      }
    } catch (err) {
      console.error("cancelCheckedoutProductFromCart catch(err)", err);
      // dispatch(wishlistGetAllProductsFailure("Server error"));
    }
  };

/** Cancel current order from CURRENT ORDERS */
const cancelCurrentOrderFromCurrentOrdersRequest = () => ({
  type: MY_ORDERS__CURRENT_ORDERS__CANCEL_CURRENT_ORDER_REQUEST,
});

const cancelCurrentOrderFromCurrentOrdersSuccess = (payload) => ({
  type: MY_ORDERS__CURRENT_ORDERS__CANCEL_CURRENT_ORDER_SUCCESS,
  payload,
});

const cancelCurrentOrderFromCurrentOrdersFailure = (payload) => ({
  type: MY_ORDERS__CURRENT_ORDERS__CANCEL_CURRENT_ORDER_FAILURE,
  payload,
});

export const cancelCurrentOrderFromCurrentOrders =
  (product, token) => async (dispatch) => {
    try {
      dispatch(cancelCurrentOrderFromCurrentOrdersRequest());

      const response = await apiCall
        .delete(url.cancelCurrentOrders, { token }, { product })
        .then((response) => response.json());

      if (response?.status === SUCCESS) {
        dispatch(cancelCurrentOrderFromCurrentOrdersSuccess(response.data));
      } else if (response?.status === FAILURE) {
        dispatch(cancelCurrentOrderFromCurrentOrdersFailure(response.message));
      } else {
        dispatch(cancelCurrentOrderFromCurrentOrdersFailure("Server error"));
      }
    } catch (err) {
      console.error("cancelCurrentOrderFromCurrentOrders catch(err)", err);
      dispatch(cancelCurrentOrderFromCurrentOrdersFailure("Server error"));
    }
  };
