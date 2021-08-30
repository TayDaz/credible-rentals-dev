import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import View from "./view";
import View from "./view1";
import {
  uploadsPageFetchAllAddsRequest,
  uploadsPageFetchAllAddsSuccess,
  uploadsPageFetchAllAddsFailure,
  changeProductRentStatus,
} from "../../redux";
import { SUCCESS } from "../../constants";

const UploadsPage = (props) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const token = user.data?.token;

  useEffect(() => {
    const getAllAddsDetails = async () => {
      dispatch(uploadsPageFetchAllAddsRequest());

      const res = await fetch("/api/user/upload/allAdds", {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit,
        headers: { token },
        // body: formData,
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      });

      if (res.status === 200) {
        const resJson = await res.json();

        if (resJson.status === SUCCESS) {
          dispatch(uploadsPageFetchAllAddsSuccess(resJson.data));
        } else {
          dispatch(uploadsPageFetchAllAddsFailure(resJson.message));
        }
      }
    };

    if (token) getAllAddsDetails();
  });

  const handleUploadAdd = async (data) => {
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
    for (var value of formData.values()) {
      console.log("[uploads-page/.js]  uploadAdd() formData value", value);
    }

    const res = await fetch("/api/user/upload/add", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit,
      headers: { token },
      body: formData,
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
  };

  const handleOnConfirmToRentTheProduct = (product) => {
    dispatch(changeProductRentStatus(token, product));
  };

  const products = [];
  return (
    <View
      uploadAdd={handleUploadAdd}
      onConfirmToRentTheProduct={handleOnConfirmToRentTheProduct}
      products={products}
    />
  );
};

export default UploadsPage;
