import { Message } from "primereact/message";
import { PROCESSING, RENTED } from "../../../../../../constants";

const ProductRentStatus = (props) => {
  const { product, userId } = props;
  const {
    rentStatus,
    currentRenteeUserId = null,
    currentCheckedoutRenteeUserIds = [],
  } = product;

  const getProductRentStatus = () => {
    let component;
    if (rentStatus === RENTED && currentRenteeUserId !== userId) {
      component = <Message severity='warn' text='Rented Out' />;
    } else if (
      rentStatus === PROCESSING &&
      currentCheckedoutRenteeUserIds.find(
        (renteeUserId) => renteeUserId === userId
      )
    ) {
      component = <Message severity='info' text='Processing' />;
    } else {
      component = null;
    }

    return component;
  };

  return <div className='product-status'>{getProductRentStatus()}</div>;
};

export default ProductRentStatus;
