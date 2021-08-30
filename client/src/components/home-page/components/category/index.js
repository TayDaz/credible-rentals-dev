import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { HOME_PAGE } from "../../../../constants";
import {
  getLatestCategoryAdds,
  addProductToCart,
  addProductToWishlist,
  removeProductFromWishlist,
} from "../../../../redux";
// import Content from "../../../../shared-components/content";
// import ProductsCollection from "../../../../shared-components/products-collection";
import ProductsDisplayContainer from "../../../../shared-components/products-display-container";
import "./styles.scss";

const Category = (props) => {
  // const [adds, setAdds] = useState();
  const dispatch = useDispatch();
  // const history = useHistory();

  const home = useSelector((state) => state.home);
  // const user = useSelector((state) => state.user);

  const category = props.view;
  const categoryAdds = home.data?.[category];
  // const token = user.data?.token;

  const {
    view,
    user,
    routeToLogin,
    onAddProductToCart,
    onAddProductToWishlist,
    onRemoveProductFromWishlist,
    sendMessageToOwner,
  } = props;

  const token = user.data?.token;

  // console.log("CATEGORY_ADDS", categoryAdds);

  // let adds = [];

  useEffect(() => {
    // console.log("running useEffect in category");
    if (categoryAdds) {
      // adds = categoryAdds;
    } else {
      /**Dispatch to get the latest adds for the slelcted category */
      dispatch(getLatestCategoryAdds(category, token));
    }
  }, [category]);

  // const handleRouteToLogin = () => {
  //   history.push("/login");
  // };

  // const handleAddToCart = (product) => {
  //   console.log("Add product to cart", product);
  //   dispatch(addProductToCart(token, product));
  // };

  // const handleAddToWishlist = (product) => {
  //   // dispatch(addToWishlist(token, product));
  // };

  const productCollectionProps = {
    ...props,
    products: categoryAdds || [],
    view,
    user,
    routeToLogin,
    onAddProductToCart,
    onAddProductToWishlist,
    onRemoveProductFromWishlist,
    sendMessageToOwner,
    currentPage: HOME_PAGE,
  };

  return (
    // <Content
    //   products={categoryAdds}
    //   heading={category}
    //   routeToLogin={handleRouteToLogin}
    //   user={user}
    //   addToCart={handleAddToCart}
    //   addToWishlist={handleAddToWishlist}
    //   sendMessageToOwner={sendMessageToOwner}
    // />
    <ProductsDisplayContainer {...productCollectionProps} />
  );
};

export default Category;
