import { Button } from "primereact/button";

import "./styles.scss";

const UserNotLoggedIn = (props) => {
  const { routeToLogin } = props;

  const handleRouteToLogin = () => {
    routeToLogin();
  };

  return (
    <div className='p-d-flex p-jc-center p-ai-center p-flex-column user-not-logged-in__container'>
      <span className='message'>
        You need to be logged in to see the Owner's details
      </span>
      <div className='p-mt-1 login-button__container'>
        <Button label='Login' onClick={handleRouteToLogin} />
      </div>
    </div>
  );
};

export default UserNotLoggedIn;
