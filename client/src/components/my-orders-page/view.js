import { useState } from "react";
import Headers from "../headers";
import Sidebar from "../../shared-components/sidebar";
import Content from "../../shared-components/content";
// import Cart from "./components/cart";
import CartProductsCollection from "../../shared-components/cart-products-collection";
import {
  CART,
  MY_CURRENT_ORDERS,
  MY_PREVIOUS_ORDERS,
  CANCELLED_ORDERS,
  WISHLIST,
  MY_ORDERS_PAGE,
} from "../../constants";

import "./styles.scss";

const viewMap = {
  [CART]: CartProductsCollection,
  [MY_PREVIOUS_ORDERS]: CartProductsCollection,
  [MY_CURRENT_ORDERS]: Content,
  [CANCELLED_ORDERS]: Content,
  [WISHLIST]: Content,
};

const View = (props) => {
  const [view, setView] = useState(WISHLIST);

  const { products, onRemoveProductFromCart, onCheckoutProductFromCart } =
    props;

  const [isSidebarCollasped, setIsSidebarCollasped] = useState(false);
  const [mobileSidebarVisible, setMobileSidebarVisible] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarCollasped(!isSidebarCollasped);
  };

  const handleToggleMobileSidebar = () => {
    setMobileSidebarVisible(!mobileSidebarVisible);
  };

  const handleChangeView = (nextView) => {
    // console.log("handleChangeView() nextView", nextView);
    setView(nextView);
  };

  const Screen = viewMap[view];

  const sidebarItems = [
    {
      label: CART,
      value: "Cart",
    },
    {
      label: MY_CURRENT_ORDERS,
      value: "Current Orders",
    },
    {
      label: MY_PREVIOUS_ORDERS,
      value: "My Previous Orders",
    },
    {
      label: CANCELLED_ORDERS,
      value: "Cancelled Orders",
    },
    {
      label: WISHLIST,
      value: "Wish List",
    },
  ];

  return (
    <>
      <Headers
        // headerBottomCurrentSelected={MY_ORDERS_PAGE}
        isSidebarCollasped={isSidebarCollasped}
        toggleSidebar={handleToggleSidebar}
        showMobileSidebar={handleToggleMobileSidebar}
        currentPage={MY_ORDERS_PAGE}
      />
      <div className='p-grid my-orders-page__container'>
        <Sidebar
          sidebarItems={sidebarItems}
          isCollasped={isSidebarCollasped}
          hideSidebar={handleToggleSidebar}
          mobileSidebarVisible={mobileSidebarVisible}
          hideMobileSidebar={handleToggleMobileSidebar}
          changeView={handleChangeView}
          view={view}
        />
        <Screen
          products={products}
          contentHeader={view}
          onRemoveProductFromCart={onRemoveProductFromCart}
          onCheckoutProductFromCart={onCheckoutProductFromCart}
        />
      </div>
    </>
  );
};

export default View;
