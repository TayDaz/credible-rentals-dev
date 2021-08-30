import ProductDetails from "./components/product-details";
import OwnerDetailsCartWishlistButtonsWrapper from "./components/owner-details-cart-wishlist-buttons-wrapper";
import "./styles.scss";

const ProductInfo = (props) => {
  return (
    <>
      <ProductDetails {...props} />
      {/* <OwnerDetailsCartWishlistButtonsWrapper {...props} /> */}
    </>
  );
};

export default ProductInfo;
