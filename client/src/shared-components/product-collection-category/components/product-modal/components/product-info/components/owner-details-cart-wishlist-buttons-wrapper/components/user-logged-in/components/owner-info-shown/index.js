import { useEffect } from "react";

const OwnerInfoShown = (props) => {
  const { product } = props;

  useEffect(() => {
    /** get the owner info */
    console.log("[owner-info-shown/.js] useEffect() triggered");
  }, [product]);
  return "OWNER_INFO_SHOW";
};

export default OwnerInfoShown;
