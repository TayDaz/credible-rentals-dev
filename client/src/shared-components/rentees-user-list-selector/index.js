import { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { PROCESSING } from "../../constants";
import "./styles.scss";

const RenteesUserListSelector = (props) => {
  // const [renteeInfos, setRenteeInfos] = useState([]);
  const [checkedIndex, setCheckedIndex] = useState(null);

  const { product, getProductRenteeUserInfo, onConfirmToRentTheProduct } =
    props;

  const {
    _id,
    rentStatus,
    currentCheckedoutRenteeUserIds = [],
    currentCheckedoutRenteeUserInformations = [],
  } = product;

  useEffect(() => {
    console.info("RenteesUserListSelector");

    if (
      currentCheckedoutRenteeUserIds.length > 0 &&
      currentCheckedoutRenteeUserInformations.length === 0
    ) {
      console.log("IF");
      getProductRenteeUserInfo(product);
    }
    // else if (currentCheckedoutRenteeUserInformations.length >= 0) {
    //   console.log("ELSE");
    //   setRenteeInfos(currentCheckedoutRenteeUserInformations);
    //   // setChecked(currentCheckedoutRenteeUserInformations.map(() => false));
    // }
  });

  const handleOnConfirmToRentTheProduct = () => {
    onConfirmToRentTheProduct(
      product,
      currentCheckedoutRenteeUserIds[checkedIndex]
    );
  };

  const toggleUserSelection = (index) => {
    let selectedIndex = null;

    if (checkedIndex === index) {
      /**deselecting the user already checked */
      selectedIndex = null;
    } else {
      selectedIndex = index;
    }

    setCheckedIndex(selectedIndex);
  };

  /** to check if the product is in PROCESSING state and list the users */

  return (
    <>
      {rentStatus === PROCESSING ? (
        currentCheckedoutRenteeUserIds.length > 0 ? (
          <div className='p-d-flex p-flex-column'>
            <table className='rentees-table'>
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                </tr>
              </thead>
              <tbody>
                {currentCheckedoutRenteeUserInformations.map(
                  (userInfo, index) => (
                    <tr key={userInfo._id}>
                      <td>
                        <Checkbox
                          inputId='binary'
                          checked={checkedIndex === index}
                          onChange={() => toggleUserSelection(index)}
                        />
                      </td>
                      <td>{`${userInfo.firstName} ${userInfo.lastName}`}</td>
                      <td>{userInfo.email}</td>
                      <td>{userInfo.mobileNumber}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
            <div className='p-d-flex p-jc-end p-mt-2'>
              <Button
                label='Rent'
                onClick={handleOnConfirmToRentTheProduct}
                disabled={checkedIndex === null}
              />
            </div>
          </div>
        ) : null
      ) : (
        <span>There are no current user requests for renting this Add.</span>
      )}
    </>
  );
};

export default RenteesUserListSelector;
