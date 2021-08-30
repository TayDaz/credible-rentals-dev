import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import HeaderBottom from "../header-bottom";
import Initiator from "./components/initiator";
import ChallengeCode from "./components/challenge-code";
import UpdatePassword from "./components/update-password";
import Success from "./components/success";
import {
  forgotPasswordCheckEmailId,
  forgotPasswordCheckChallengeCode,
  forgotPasswordUpdatePassword,
  forgotPasswordClearData,
} from "../../redux/forgot-password/actions";
import { NOT_INITIATED, INITIATED, UPDATE, VERIFIED } from "../../constants";
import "./styles.scss";

const viewMap = {
  [NOT_INITIATED]: Initiator,
  [INITIATED]: ChallengeCode,
  [UPDATE]: UpdatePassword,
  [VERIFIED]: Success,
};

const ForgotPassword = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const forgotPassword = useSelector((state) => state.forgotPassword);
  const token = forgotPassword.data?.token;
  const forgotPasswordStatus = forgotPassword.data?.forgotPasswordStatus;
  const isFinalAttempt = forgotPassword.data?.isFinalAttempt;

  // const [view, setView] = useState(forgotPasswordStatus || NOT_INITIATED);
  const view = forgotPasswordStatus || NOT_INITIATED;

  const ForgotPasswordScreen = viewMap[view];

  const handleCheckEmailId = (email) => {
    dispatch(forgotPasswordCheckEmailId({ email }));
  };

  const handleCheckChallengeCode = (challengeCode) => {
    dispatch(forgotPasswordCheckChallengeCode({ challengeCode }, token));
  };

  const handleUpdatePassword = (passwords) => {
    dispatch(forgotPasswordUpdatePassword(passwords, token));
  };

  const handleRouteToLogin = () => {
    dispatch(forgotPasswordClearData());
    history.push("/login");
  };

  return (
    <>
      <HeaderBottom />
      <div className='p-grid p-justify-center p-align-center forgot-password-page__wrapper'>
        <div className='p-col-12 p-md-6 p-lg-6 p-shadow-24'>
          <ForgotPasswordScreen
            checkEmailId={handleCheckEmailId}
            checkChallengeCode={handleCheckChallengeCode}
            updatePassword={handleUpdatePassword}
            routeToLogin={handleRouteToLogin}
          />
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
