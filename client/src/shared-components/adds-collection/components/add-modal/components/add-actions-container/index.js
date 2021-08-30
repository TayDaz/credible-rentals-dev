import { Button } from "primereact/button";

const AddActionsContainer = (props) => {
  const { product, onConfirmToRentTheProduct } = props;

  const handleOnConfirmToRentTheProduct = () => {
    onConfirmToRentTheProduct(product);
  };
  return (
    <>
      {product?.rentStatus === "PROCESSING" ? (
        <div className='p-d-flex p-flex-column add-actions__container'>
          <div className='p-d-flex p-jc-center'>
            Please click on the confirm button to rent the product
          </div>
          <div className='p-d-flex p-jc-center'>
            <Button label='Confirm' onClick={handleOnConfirmToRentTheProduct} />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default AddActionsContainer;
