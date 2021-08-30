import { Button } from "primereact/button";
import {
  HOME_PAGE,
  MY_ORDERS_PAGE,
  UPLOADS_PAGE,
} from "../../../../../../constants";

const addActionsViewMap = {
  [HOME_PAGE]: false,
  [MY_ORDERS_PAGE]: false,
  [UPLOADS_PAGE]: true,
};

const AddActionsContainer = (props) => {
  const { currentPage, user, product, onConfirmToRentTheProduct } = props;
  console.log("AddActionsContainer", props);

  const handleOnConfirmToRentTheProduct = () => {
    onConfirmToRentTheProduct(product);
  };
  return (
    <>
      {addActionsViewMap?.[currentPage] && (
        <>
          {product?.rentStatus === "PROCESSING" &&
          product.userId === user.data?._id ? (
            <div className='p-d-flex p-flex-column add-actions__container'>
              <div className='p-d-flex p-jc-center'>
                Please click on the confirm button to rent the product
              </div>
              <div className='p-d-flex p-jc-center'>
                <Button
                  label='Confirm'
                  onClick={handleOnConfirmToRentTheProduct}
                />
              </div>
            </div>
          ) : null}
        </>
      )}
    </>
  );
};

export default AddActionsContainer;
