import { useEffect } from "react";
// import {
//   HOME_PAGE,
//   MY_ORDERS_PAGE,
//   UPLOADS_PAGE,
// } from "../../../../../../constants";
import IsNotLoggedIn from "./components/is-not-logged-in";
import MessageBox from "./components/message-box";
import "./styles.scss";

const OwnerInfoContact = (props) => {
  const {
    product,
    // getOwnerInfo,
    // currentPage,
    // view,
    user: { isLoggedIn },
  } = props;
  const showOwnerDetails = product?.showOwnerDetails;

  useEffect(() => {
    /**if  */
    if (showOwnerDetails) {
      //getOwnerInfo(product);
    }
  });
  return (
    <div className='p-d-flex p-flex-column p-mt-2 owner-info-contact__container'>
      {/* <span className='p-pt-2 main-heading'>Owner Info</span> */}
      {isLoggedIn ? <MessageBox {...props} /> : <IsNotLoggedIn {...props} />}
    </div>
  );
};

export default OwnerInfoContact;
