import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { url } from "../../../../config";
import AddActionsContainer from "./components/add-actions-container";
import ProductImageScroller from "./components/product-image-scroller";
import ProductInfo from "./components/product-info";
import "./styles.scss";
// import Image from "../custom-carousel/assets/images/image_1.jpg";

const ProductModal = (props) => {
  useEffect(() => {
    if (props?.product) {
      if (props.product._id !== product._id) {
        setProduct(props.product);
      }
    }
  });

  const [product, setProduct] = useState(props.product);

  const {
    totalProducts,
    showProductModal,
    onHideModal,
    onShowPreviousProduct,
    onShowNextProduct,
    currentProductIndex,
  } = props;
  // debugger;

  console.log(`product,${product}
    totalProducts,${totalProducts}
    showProductModal,
    onHideModal,
    onShowPreviousProduct,
    onShowNextProduct,
    currentProductIndex,${currentProductIndex}`);

  const prevBtnDisable = currentProductIndex === 0;
  const nextBtnDisable = currentProductIndex === totalProducts - 1;

  console.log("[product-modal/.js] product", product);

  const updatedProps = {
    ...props,
    product,
  };

  return (
    <>
      {showProductModal && (
        <div className='product-modal__container'>
          <div className='p-d-flex p-jc-end close-button__container'>
            <div className='button__wrapper' onClick={onHideModal}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='40'
                height='40'
                fill='#18595d'
                className='bi bi-x-lg'
                viewBox='0 0 16 16'>
                <path d='M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z' />
              </svg>
            </div>
          </div>
          <div className='p-d-flex p-flex-nowrap p-jc-center content__container'>
            <div className='p-d-flex p-jc-end p-mr-4 p-ai-center navigation-buttons previous-button__container'>
              <div className='p-d-flex p-jc-center p-ai-center button__wrapper'>
                <Button
                  // label='Primary'
                  className='p-button-text'
                  icon='pi pi-chevron-left'
                  disabled={prevBtnDisable}
                  onClick={onShowPreviousProduct}
                />
                {/* <i
                  className='pi pi-chevron-left'
                  style={{
                    fontSize: "2rem",
                    color: "#18595D",
                  }}></i> */}
              </div>
            </div>
            <div className='product-image-info__container'>
              <div className='product-image__container'>
                <ProductImageScroller images={product.images} />
              </div>
              <div className='product-info__container'>
                <ProductInfo {...updatedProps} />
                <AddActionsContainer {...updatedProps} />
              </div>
            </div>
            <div className='p-d-flex p-ai-center  p-ml-4  navigation-buttons next-button__container'>
              <div className='p-d-flex p-jc-center p-ai-center button__wrapper'>
                <Button
                  // label='Primary'
                  className='p-button-text'
                  icon='pi pi-chevron-right'
                  disabled={nextBtnDisable}
                  onClick={onShowNextProduct}
                />
                {/* <i
                  className='pi pi-chevron-right'
                  style={{
                    fontSize: "2rem",
                    color: "#18595D",
                  }}></i> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductModal;
