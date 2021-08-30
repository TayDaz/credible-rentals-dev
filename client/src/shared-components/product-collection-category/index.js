import { useState } from "react";
import Product from "./components/product";
import ProductModal from "./components/product-modal";
import "./styles.scss";

const ProductCollectionCategory = (props) => {
  const { products } = props;

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

  // console.log(
  //   "[shared-components/product-collection-category/.js] products, currentProductIndx",
  //   products,
  //   currentProductIndex
  // );

  return (
    <>
      <div className='p-d-flex p-flex-wrap p-jc-center p-jc-md-start p-jc-lg-start product-collection-category__container'>
        {products.map((product, index) => (
          <Product
            product={product}
            productIndex={index}
            key={index}
            onProductClick={handleOnProductClick}
          />
        ))}
      </div>
      <ProductModal
        {...props}
        product={products[currentProductIndex]}
        showProductModal={showProductModal}
        onHideModal={handleOnHideModal}
        onShowPreviousProduct={handleOnShowPreviousProduct}
        onShowNextProduct={handleOnShowNextProduct}
      />
    </>
  );
};

export default ProductCollectionCategory;
