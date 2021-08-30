import SidebarMainContentContainer from "../../shared-components/sidebar-main-content-container";
import TestComponent from "../../shared-components/sidebar-main-content-container/components/test-component";
// import AddsDisplayContainer from "../../shared-components/adds-display-container";
import ProductsDisplayContainer from "../../shared-components/products-display-container";
import Cart from "./components/cart";
import CartProductsCollection from "../../shared-components/cart-products-collection";
import {
  CANCELLED_ORDERS,
  CART,
  MY_CURRENT_ORDERS,
  MY_ORDERS_PAGE,
  MY_PREVIOUS_ORDERS,
  RENTED,
  WISHLIST,
} from "../../constants";

const View = (props) => {
  const {
    user,
    products,
    cartProducts,
    wishlistProducts,
    onRemoveProductFromCart,
    onCheckoutProductFromCart,
    onAddProductToWishlist,
    onRemoveProductFromWishlist,
    onCancelCheckoutProductFromCart,
    onCancelOrderFromCurrentOrders,
  } = props;

  const { _id: userId } = user.data;
  // console.log("my-orders-page/view1.js userId", userId);

  const sidebarItems = [
    {
      label: CART,
      value: "Cart",
      component: CartProductsCollection,
      products: cartProducts.filter((product) => {
        if (product.rentStatus === RENTED) {
          if (product.currentRenteeUserId === userId) {
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
      }),
    },
    {
      label: MY_CURRENT_ORDERS,
      value: "Current Orders",
      component: CartProductsCollection,
      products: cartProducts.filter(
        (product) =>
          product.rentStatus === RENTED &&
          userId === product?.currentRenteeUserId
      ),
    },
    {
      label: MY_PREVIOUS_ORDERS,
      value: "My Previous Orders",
      component: TestComponent,
      products,
    },
    {
      label: CANCELLED_ORDERS,
      value: "Cancelled Orders",
      component: CartProductsCollection,
      products: cartProducts.filter((product) =>
        product?.cancelledOrders?.find((order) => order.userId === userId)
      ),
    },
    {
      label: WISHLIST,
      value: "Wish List",
      component: ProductsDisplayContainer,
      products: wishlistProducts,
    },
  ];

  return (
    <>
      <SidebarMainContentContainer
        defaultView={CART}
        sidebarItems={sidebarItems}
        currentPage={MY_ORDERS_PAGE}
        user={user}
        products={products}
        onRemoveProductFromCart={onRemoveProductFromCart}
        onCheckoutProductFromCart={onCheckoutProductFromCart}
        onAddProductToWishlist={onAddProductToWishlist}
        onRemoveProductFromWishlist={onRemoveProductFromWishlist}
        onCancelCheckoutProductFromCart={onCancelCheckoutProductFromCart}
        onCancelOrderFromCurrentOrders={onCancelOrderFromCurrentOrders}
      />
    </>
  );
};

export default View;
