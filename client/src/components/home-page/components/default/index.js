// import { useState } from "react";
// import Carousel from "../carousel";
import CustomCarousel from "../custom-carousel";
// import ProductViewer from "../product-viewer";
// import Image1 from "../../assets/images/image_1.jpg";
// import Image2 from "../../assets/images/image_2.jpg";
// import Image3 from "../../assets/images/image_3.jpeg";
// import Image4 from "../../assets/images/image_4.jpeg";
// import Image5 from "../../assets/images/image_5.jpg";
// import Image6 from "../../assets/images/image_6.jpg";
// import Image7 from "../../assets/images/image_7.jpg";
// import Image8 from "../../assets/images/image_8.jpg";
// import Image9 from "../../assets/images/image_9.jpg";
// import Image10 from "../../assets/images/image_10.jpg";
// import Image11 from "../../assets/images/image_11.jpg";
// import Image12 from "../../assets/images/image_12.jpg";
// import LongImage from "../../assets/images/long_image.jpg";
// import ProductCollection from "../../../../shared-components/product-collection";
import ProductsCollection from "../../../../shared-components/products-collection";
import { HOME_PAGE } from "../../../../constants";

import "./styles.scss";

const Default = (props) => {
  const {
    user,
    products = [],
    routeToLogin,
    onAddProductToCart,
    onAddProductToWishlist,
    onRemoveProductFromWishlist,
    sendMessageToOwner,
  } = props;

  const productCollectionProps = {
    ...props,
    currentPage: HOME_PAGE,
    scroll: true,
  };

  return (
    <>
      <CustomCarousel />
      <div className='p-mb-3 new-arrivals-heading__wrapper'>New Arrivals</div>
      {/* <ProductCollection products={adds || []} /> */}
      <ProductsCollection
        // user={user}
        // products={products || []}
        // currentPage={HOME_PAGE}
        // routeToLogin={routeToLogin}
        // onAddProductToCart={onAddProductToCart}
        // onAddProductToWishlist={onAddProductToWishlist}
        // onRemoveProductFromWishlist={onRemoveProductFromWishlist}
        // sendMessageToOwner={sendMessageToOwner}
        // scroll
        {...productCollectionProps}
      />
    </>
  );
};

export default Default;
