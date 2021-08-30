import { Button } from "primereact/button";
import {
  HOME_PAGE,
  MY_ORDERS_PAGE,
  UPLOADS_PAGE,
} from "../../../../../../constants";

const heartIcon = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='16'
    height='16'
    fill='currentColor'
    class='bi bi-heart'
    viewBox='0 0 16 16'>
    <path d='m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z' />
  </svg>
);

const heartIconFilled = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='16'
    height='16'
    fill='currentColor'
    class='bi bi-heart-fill'
    viewBox='0 0 16 16'>
    <path
      fillRule='evenodd'
      d='M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z'
    />
  </svg>
);

const CartWishlistIcons = (props) => {
  const {
    currentPage,
    product,
    user,
    onAddProductToCart,
    onAddProductToWishlist,
    onRemoveProductFromWishlist,
    routeToLogin,
  } = props;
  const isLoggedIn = user.isLoggedIn;
  const wishlist = user.data?.wishlist;
  const cart = user.data?.cart;

  const isWishlistIconSelected = wishlist?.find(
    (wProduct) => wProduct.addId === product._id
  )
    ? true
    : false;

  const isProductAddedToCart = cart?.find(
    (cProduct) => cProduct.addId === product._id
  );

  const wishlistIcon = isWishlistIconSelected ? heartIconFilled : heartIcon;
  const wishlistIconLabel = isWishlistIconSelected
    ? "Remove from wishlist"
    : "Add to wishlist";

  const cartIconLabel = isProductAddedToCart ? "Added to cart" : "Add to cart";

  const handleWishlistBtnOnClick = () => {
    if (!isLoggedIn) {
      routeToLogin();
    } else {
      isWishlistIconSelected
        ? onRemoveProductFromWishlist(product)
        : onAddProductToWishlist(product);
    }
  };

  const handleCartBtnOnClick = () => {
    if (!isLoggedIn) {
      routeToLogin();
    } else {
      onAddProductToCart(product);
    }
  };

  return (
    <>
      {/* {cartWishlistViewMap?.[currentPage] ? ( */}
      <div className='p-d-flex p-jc-between cart-wishlist-icons__container'>
        <Button
          label={cartIconLabel}
          className='p-button-rounded p-button-success'
          icon='pi pi-shopping-cart'
          onClick={handleCartBtnOnClick}
          disabled={isProductAddedToCart}
        />
        <Button
          label={wishlistIconLabel}
          className='p-button-rounded p-button-success'
          icon={wishlistIcon}
          onClick={handleWishlistBtnOnClick}
        />
      </div>
      {/* ) : null} */}
    </>
  );
};

export default CartWishlistIcons;
