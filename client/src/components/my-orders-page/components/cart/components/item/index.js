import { Button } from "primereact/button";
import { Message } from "primereact/message";
import ProductRentStatus from "../product-rent-status";
import CartActionButtons from "../cart-action-buttons";
import { url } from "../../../../../../config";
import { PROCESSING, RENTED } from "../../../../../../constants";

import "./styles.scss";

const Item = (props) => {
  const {
    product,
    // onRemoveProductFromCart,
    // onCheckoutProductFromCart,
    // userId,
  } = props;

  return (
    <>
      {product && (
        <div className='p-d-flex p-jc-between p-ai-center cart-item__container'>
          <div className='p-d-flex p-ai-center product-image-info__container'>
            <div className='p-d-flex p-ai-center p-jc-center image__wrapper'>
              <img
                src={`${url.image}/${product.images[0].key}`}
                alt='product image'
              />
            </div>
          </div>
          <div>{product.name}</div>
          <ProductRentStatus {...props} />
          <CartActionButtons {...props} />
        </div>
      )}
    </>
  );
};

export default Item;
