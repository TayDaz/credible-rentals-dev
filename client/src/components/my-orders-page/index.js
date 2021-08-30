import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getAllCartProducts,
  removeProductFromCart,
  checkoutProductFromCart,
  removeProductFromWishlist,
  getAllWishlistProducts,
  addProductToWishlist,
  cancelCheckedoutProductFromCart,
  cancelCurrentOrderFromCurrentOrders,
} from "../../redux";
// import View from "./view";
import View from "./view1";

const MyOrdersPage = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const myOrders = useSelector((state) => state.myOrders);
  const cartProducts = myOrders.cart || [];
  const wishlistProducts = myOrders.wishlist;
  const user = useSelector((state) => state.user);
  const { isLoggedIn: isUserLoggedIn } = user;
  const token = user.data?.token;

  useEffect(() => {
    /**Loading the cart items */
    if (isUserLoggedIn) {
      dispatch(getAllCartProducts(token));
      dispatch(getAllWishlistProducts(token));
    } else {
      history.push("/login");
    }
  }, [user.data?.cart, user.data?.wishlist]);

  const handleOnRemoveProductFromCart = (product) => {
    console.log("Remove product from cart", product);
    dispatch(removeProductFromCart(token, product));
  };

  const handleOnCheckoutProductFromCart = (product) => {
    console.log("Checkout product from cart");
    dispatch(checkoutProductFromCart(token, product));
  };

  const handleOnRemoveProductFromWishlist = (product) => {
    console.log("Remove product from wishlist");
    dispatch(removeProductFromWishlist(token, product));
  };

  const onAddProductToWishlist = (product) => {
    dispatch(addProductToWishlist(token, product));
  };

  const handleOnCancelCheckoutProductFromCart = (product) => {
    dispatch(cancelCheckedoutProductFromCart(product, token));
  };

  const handleOnCancelOrderFromCurrentOrders = (product) => {
    dispatch(cancelCurrentOrderFromCurrentOrders(product, token));
  };

  console.log("my-orders/cart", cartProducts);

  const viewComponentProps = {
    user,
    cartProducts,
    wishlistProducts,
    onRemoveProductFromCart: handleOnRemoveProductFromCart,
    onCheckoutProductFromCart: handleOnCheckoutProductFromCart,
    onAddProductToWishlist,
    onRemoveProductFromWishlist: handleOnRemoveProductFromWishlist,
    onCancelCheckoutProductFromCart: handleOnCancelCheckoutProductFromCart,
    onCancelOrderFromCurrentOrders: handleOnCancelOrderFromCurrentOrders,
  };

  return <>{isUserLoggedIn ? <View {...viewComponentProps} /> : null}</>;
};

export default MyOrdersPage;
