import { useSelector } from "react-redux";

import HeaderBottom from "../header-bottom";
import SignupStatusSteps from "./components/signup-status-steps";
import SignupForms from "./components/signup-forms";
import SmsOtp from "./components/sms-otp";
import EmailOtp from "./components/email-otp";
import Verified from "./components/verified";
import { Divider } from "primereact/divider";
import Wrapper from "./components/wrapper";

import { INITIATED, SMS_OTP, EMAIL, VERIFIED, PENDING } from "../../constants";

const viewMap = {
  INITIATED: SignupForms,
  SMS_OTP: SmsOtp,
  EMAIL: EmailOtp,
  VERIFIED: Verified,
};

const View = (props) => {
  const createAccount = useSelector((state) => state.createAccount);
  const user = useSelector((state) => state.user);
  const isRequestLoading = false;
  console.log("[create-account/view.js] props", props);

  const screenProps = {
    hasErrorResponse: createAccount.hasErrorResponse,
    responseErrorMessage: createAccount.responseErrorMessage,
    provider: user.data?.provider,
    firstName: user.data?.firstName,
    lastName: user.data?.lastName,
    signupStatus: user.data?.signupStatus || INITIATED,
    smsAuthStatus: user.data?.smsAuthStatus,
    emailAuthStatus: user.data?.emailAuthStatus,
    mobileNumber: user.data?.mobileNumber,
    email: user.data?.email,
    ...props,
  };

  // const signupStatus = VERIFIED;
  const Screen = viewMap[screenProps.signupStatus || INITIATED];

  // const screenProps = {
  // 	...props,
  // 	// provider: "facebook",
  // 	signupStatus: signupStatus,
  // 	smsAuthStatus: INITIATED,
  // 	emailAuthStatus: INITIATED,
  // 	mobileNumber: "919000000001",
  // 	email: "email@email.com",
  // 	registerUserLocal
  // registerUserSocial
  // submitSmsOtp
  // submitEmailOtp
  // };

  return (
    <>
      <HeaderBottom />
      <Wrapper>
        <h1>Create Account</h1>
        <SignupStatusSteps signupStatus={user.data?.signupStatus} />
        <Divider />
        <Screen {...screenProps} />
      </Wrapper>
    </>
  );
};

export default View;
