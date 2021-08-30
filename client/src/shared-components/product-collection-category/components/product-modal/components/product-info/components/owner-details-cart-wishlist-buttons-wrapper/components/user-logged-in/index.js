import OwnerInfoShown from "./components/owner-info-shown";
import OwnerInfoHidden from "./components/owner-info-hidden";
import CartWishListButtons from "./components/cart-wishlist-buttons";

const UserLoggedIn = (props) => {
  const { product } = props;
  const showOwnerInfo = true || product.showOwnerInfo;

  const getComponent = () => {
    if (showOwnerInfo) {
      return <OwnerInfoShown {...props} />;
    } else {
      return <OwnerInfoHidden {...props} />;
    }
  };

  return (
    <div className='user-is-logged-in__container'>
      {getComponent()}
      <CartWishListButtons {...props} />
    </div>
  );
};

export default UserLoggedIn;
