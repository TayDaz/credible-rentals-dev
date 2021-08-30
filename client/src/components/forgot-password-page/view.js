import { useState } from "react";
import { useSelector } from "react-redux";
import HeaderBottom from "../header-bottom";
import { NOT_INITIATED, INITIATED, UPDATE, VERIFIED } from "../../constants";
import "./styles.scss";
import Initiator from "./components/initiator";
import ResponseCode from "./components/response-code";
import UpdatePassword from "./components/update-password";
import Success from "./components/success";

const viewMap = {
  [NOT_INITIATED]: Initiator,
  [INITIATED]: ResponseCode,
  [UPDATE]: UpdatePassword,
  [VERIFIED]: Success,
};

const View = (props) => {
  const forgotPassword = useSelector((state) => state.forgotPassword);

  const forgotPasswordStatus = forgotPassword.data?.forgotPasswordStatus;
  const isFinalAttempt = forgotPassword.data?.isFinalAttempt;

  const [view, setView] = useState(forgotPasswordStatus || NOT_INITIATED);

  const ForgotPasswordScreen = viewMap[view];

  return (
    <>
      <HeaderBottom />
      <div className='p-grid p-justify-center p-align-center forgot-password-page__wrapper'>
        <div className='p-col-12 p-md-6 p-lg-6 p-shadow-24'>
          <ForgotPasswordScreen {...props} />
        </div>
      </div>
    </>
  );
};

export default View;
