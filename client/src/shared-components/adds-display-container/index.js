// import { useEffect, useState } from "react";
// import ProductFilter from "../product-filter";
// import ProductCollection from "../product-collection";
import AddsCollection from "../adds-collection";
// import { getFilteredAdds } from "../utils/getFilteredAdds";
import {
  ACTIVE,
  ACTIVE_ADDS,
  CART,
  DATE,
  INACTIVE_ADDS,
  MY_CURRENT_ORDERS,
} from "../../constants";
import "./styles.scss";

const AddsDisplayContainer = (props) => {
  // const { view, activeAdds, inactiveAdds, products } = props;

  // let adds = products;
  // if (view === ACTIVE_ADDS) {
  //   adds = activeAdds;
  // } else if (view === INACTIVE_ADDS) {
  //   adds = inactiveAdds;
  // }
  // // else if (view === CART) {
  // //   adds = products.filter((product) => product.rentStatus !== "RENTED");
  // // } else if (view === MY_CURRENT_ORDERS) {
  // //   adds = products.filter((product) => product.rentStatus === "RENTED");
  // // }

  // const updatedProps = {
  //   ...props,
  //   products: adds,
  // };
  return (
    <>
      <AddsCollection {...props} />
    </>
  );
};

export default AddsDisplayContainer;
