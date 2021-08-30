import HeaderTop from "../header-top";
import HeaderBottom from "../header-bottom";

const Headers = (props) => {
  return (
    <>
      <HeaderTop {...props} />
      <HeaderBottom {...props} />
    </>
  );
};

export default Headers;
