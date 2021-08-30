import { url } from "../../../../config";
import Wishlist from "../wishlist";
import { productFieldMap } from "../../../../config/product-map";
import "./styles.scss";

const Product = (props) => {
  const {
    product,
    user,
    currentPage,
    productIndex,
    onProductClick,
    onAddProductToWishlist,
    onRemoveProductFromWishlist,
    routeToLogin,
  } = props;

  const handleOnProductClick = () => {
    console.log("handleOnProductClick", productIndex);
    onProductClick(productIndex);
  };

  const getRentPriceAmountDuration = () => {
    if (!product) {
      return null;
    }

    const {
      category,
      subCategory,
      rentPriceAmount,
      rentPriceDenomination,
      rentPriceDuration,
    } = product;

    const extractedFields = productFieldMap[category][subCategory].find(
      (fields) => fields.name === "rentPrice"
    );

    if (!extractedFields) {
      return null;
    }

    const denomication = extractedFields.options1.find(
      (field) => field.value === rentPriceDenomination
    ).label;

    const duration = extractedFields.options2.find(
      (field) => field.value === rentPriceDuration
    ).label;

    return (
      <>
        {rentPriceAmount} {denomication}
        {duration}
      </>
    );
  };

  return (
    <>
      <div className='p-d-flex p-flex-column p-ai-center p-jc-center p-mr-2 p-mb-2 product__container'>
        {product ? (
          <>
            <div
              className='p-d-flex p-jc-center image__container'
              onClick={handleOnProductClick}>
              <img src={`${url.image}/${product.images[0].key}`} alt='' />
            </div>
            <div className='p-pl-2 p-pr-2 p-d-flex p-jc-between p-ai-center product-info__container'>
              <div
                className='p-d-flex p-flex-column product-info__wrapper'
                onClick={handleOnProductClick}>
                <div className='name__wrapper'>{product.name}</div>
                <div className='rent-price__wrapper'>
                  {getRentPriceAmountDuration()}
                </div>
              </div>
              <div className='wishlist-icon__wrapper'>
                <Wishlist
                  product={product}
                  currentPage={currentPage}
                  user={user}
                  routeToLogin={routeToLogin}
                  onAddProductToWishlist={onAddProductToWishlist}
                  onRemoveProductFromWishlist={onRemoveProductFromWishlist}
                />
              </div>
            </div>
          </>
        ) : (
          <div>Product data not available</div>
        )}
      </div>
    </>
  );
};

export default Product;
