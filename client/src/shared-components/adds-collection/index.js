import { useState } from "react";
import Add from "./components/add";
import AddModal from "./components/add-modal";
import "./styles.scss";

const ProductCollectionCategory = (props) => {
  const { products } = props;
  console.log("products add-collection", props);
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

  return (
    <>
      <div className='p-d-flex p-flex-wrap p-jc-center p-jc-md-start p-jc-lg-start product-collection-category__container'>
        {products.map((product, index) => (
          <Add
            product={product}
            productIndex={index}
            key={index}
            onProductClick={handleOnProductClick}
          />
        ))}
      </div>
      <AddModal
        {...props}
        currentProductIndex={currentProductIndex}
        totalProducts={products.length}
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
