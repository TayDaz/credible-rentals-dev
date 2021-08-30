import ProductDetails from "./components/product-details";
// import { AccordionTab } from "primereact/accordion";
// import OwnerDetailsCartWishlistButtonsWrapper from "./components/owner-details-cart-wishlist-buttons-wrapper";
import "./styles.scss";

const ProductInfo = (props) => {
  return (
    // <AccordionTab
    //   header={
    //     <>
    //       <span>Product Info</span>
    //     </>
    //   }>
    <ProductDetails {...props} />
    // </AccordionTab>
  );
};

export default ProductInfo;
