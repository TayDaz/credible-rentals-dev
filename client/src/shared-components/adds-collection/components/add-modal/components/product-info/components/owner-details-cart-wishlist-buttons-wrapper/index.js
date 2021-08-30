import UserNotLoggedIn from "./components/user-not-logged-in";
import UserLoggedIn from "./components/user-logged-in";
import "./styles.scss";

const OwnerDetailsCartWishlistButtonsWrapper = (props) => {
  const { user } = props;

  const userIsLoggedIn = user.isLoggedIn;

  console.log("[owner-details/.js] props", props);

  const getComponents = () => {
    if (!userIsLoggedIn) {
      /**If the user is not logged in then it will show the Login/Signup message with the login button */

      return <UserNotLoggedIn {...props} />;
    } else {
      /** if the user is logged in check if the user has allowed the information to be visible*/
      return <UserLoggedIn {...props} />;
    }
  };
  return (
    <div className='owner-details__container'>
      <span className='main-header'>Owner Details</span>
      {getComponents()}
    </div>
  );
};

export default OwnerDetailsCartWishlistButtonsWrapper;
