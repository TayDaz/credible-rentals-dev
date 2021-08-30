import { useState } from "react";
import Product from "./components/product";
import ProductModal from "./components/product-modal";
import { classNames } from "primereact/utils";
import { ROWS } from "../../constants";

import "./styles.scss";

const ProductsCollection = (props) => {
  const {
    products,
    scroll,
    displayAsRows = false,
    // user,
    // currentPage,
    // routeToLogin,
    // onAddProductToCart,
    // onAddProductToWishlist,
    // onRemoveProductFromWishlist,
    // onConfirmToRentTheProduct,
    // sendMessageToOwner,
  } = props;

  const [showProductModal, setShowProductModal] = useState(false);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  const handleOnShowPreviousProduct = () => {
    if (currentProductIndex > 0) {
      setCurrentProductIndex(currentProductIndex - 1);
    }
  };

  const handleOnShowNextProduct = () => {
    if (currentProductIndex < products.length) {
      setCurrentProductIndex(currentProductIndex + 1);
    }
  };

  const handleOnProductClick = (index) => {
    // console.log("INDEX", index);
    setCurrentProductIndex(index);
    setShowProductModal(true);
  };

  const handleOnHideModal = () => {
    setShowProductModal(false);
  };

  const productProps = {
    ...props,
    onProductClick: handleOnProductClick,
  };

  const productModalProps = {
    ...props,
    currentProductIndex,
    totalProducts: products.length,
    product: products[currentProductIndex],
    showProductModal,
    onHideModal: handleOnHideModal,
    onShowPreviousProduct: handleOnShowPreviousProduct,
    onShowNextProduct: handleOnShowNextProduct,
  };

  return (
    <>
      <div
        className='p-d-flex products-collection__container'
        className={classNames(
          "p-d-flex",
          {
            "products-collection__container": scroll,
          },
          {
            "p-flex-wrap": !scroll,
          }
        )}>
        {products.map((product, index) => (
          <Product
            {...productProps}
            product={product}
            productIndex={index}
            key={index}
          />
        ))}
      </div>
      {products.length > 0 && (
        <ProductModal
          {...productModalProps}
          // user={user}
          // currentPage={currentPage}
          // currentProductIndex={currentProductIndex}
          // totalProducts={products.length}
          // product={products[currentProductIndex]}
          // showProductModal={showProductModal}
          // routeToLogin={routeToLogin}
          // onHideModal={handleOnHideModal}
          // onShowPreviousProduct={handleOnShowPreviousProduct}
          // onShowNextProduct={handleOnShowNextProduct}
          // onAddProductToCart={onAddProductToCart}
          // onAddProductToWishlist={onAddProductToWishlist}
          // onRemoveProductFromWishlist={onRemoveProductFromWishlist}
          // onConfirmToRentTheProduct={onConfirmToRentTheProduct}
          // sendMessageToOwner={sendMessageToOwner}
        />
      )}
    </>
  );
};

export default ProductsCollection;
