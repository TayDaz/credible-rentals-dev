import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import View from "./view.js";
import {
  changeProductRentStatus,
  uploadsFetchAllAdds,
  uploadsPageUploadAdd,
  resetNewAddUploadStatus,
  getProductRenteeUserInfo,
} from "../../redux";

const UploadsPage = (props) => {
  const dispatch = useDispatch();
  const uploads = useSelector((state) => state.uploads);
  const user = useSelector((state) => state.user);
  const token = user.data?.token;
  // const products = uploads.adds;
  const {
    isNewAddUploading,
    newAddUploadStatus,
    isErrorNewAddUpload,
    errorMessageNewAddUpload,
    adds: products,
  } = uploads;

  useEffect(() => {
    /**get all adds once the page is mounted */
    dispatch(uploadsFetchAllAdds(token));
  }, [user]);

  const handleOnUploadAdd = async (data) => {
    const images = [],
      imageTitles = [];
    let base64Response, blob;

    //loop throught the data and add to form data
    const formData = new FormData();

    for (const [key, value] of Object.entries(data)) {
      console.log(
        "[uploads-page/.js]  uploadAdd() for..of key, value",
        key,
        value
      );
      if (key !== "images") {
        formData.append(key, value);
      } else {
        // base64Response = await fetch(data[key][0].src);
        // blob = await base64Response.blob();
        // formData.append("image", blob);
        // formData.append("image", blob);

        for (const imageObj of data[key]) {
          base64Response = await fetch(imageObj.src);
          blob = await base64Response.blob();

          formData.append("image", blob);
          imageTitles.push(imageObj.title);
        }

        // formData.append(key, images);
        formData.append("imageTitles", imageTitles);
      }
      // console.log(`${key}: ${value}`);
    }
    // console.log("[uploads-page/.js]  uploadAdd()  data", data);
    // console.log("[uploads-page/.js]  uploadAdd()  formData", formData);
    for (const value of formData.values()) {
      console.log("[uploads-page/.js]  uploadAdd() formData value", value);
    }

    dispatch(uploadsPageUploadAdd(token, formData));
  };

  const handleOnConfirmToRentTheProduct = (product, currentRenteeUserId) => {
    dispatch(changeProductRentStatus(token, product, currentRenteeUserId));
  };

  const handleOnClickNewAddUploadSuccess = () => {
    /**Dispatch to change newAddUploadStatus to NOT_INITIATED
     * and
     * clear the form data along with images state variable
     */
    dispatch(resetNewAddUploadStatus());
  };

  const handleOnClickNewAddUploadError = () => {
    /** Dispatch to change the newAddUploadStatus to NOT_INITIATED */
    dispatch(resetNewAddUploadStatus());
  };

  const handleGetProductRenteeUserInfo = (product) => {
    console.info("handleGetProductRenteeUserInfo() product", product);
    dispatch(getProductRenteeUserInfo(product, token));
  };

  const viewProps = {
    user,
    products,
    onUploadAdd: handleOnUploadAdd,
    onConfirmToRentTheProduct: handleOnConfirmToRentTheProduct,
    isNewAddUploading,
    newAddUploadStatus,
    isErrorNewAddUpload,
    errorMessageNewAddUpload,
    onClickNewAddUploadSuccess: handleOnClickNewAddUploadSuccess,
    onClickNewAddUploadError: handleOnClickNewAddUploadError,
    getProductRenteeUserInfo: handleGetProductRenteeUserInfo,
  };

  return <View {...viewProps} />;
};

export default UploadsPage;
