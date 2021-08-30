import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Headers from "../headers";
import Sidebar from "./components/sidebar";
// import Content from "./components/content";
import Default from "./components/default";
import Category from "./components/category";
import {
  homePageGetLatestAdds,
  addProductToCart,
  addProductToWishlist,
  removeProductFromWishlist,
  sendMessageToOwner,
  deleteMessageNotification,
} from "../../redux";
import { DEFAULT, CATEGORY, HOME_PAGE } from "../../constants";
import "./styles.scss";
import { useHistory } from "react-router-dom";
import apiCall from "../../helpers/apiCall";

const viewMap = {
  [DEFAULT]: Default,
  [CATEGORY]: Category,
};

const HomePage = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const home = useSelector((state) => state.home);
  const user = useSelector((state) => state.user);
  const token = user.data?.token;

  const latestAdds = home.data?.latestAdds || [];

  const [isSidebarCollasped, setIsSidebarCollasped] = useState(false);
  const [mobileSidebarVisible, setMobileSidebarVisible] = useState(false);
  const [view, setView] = useState(DEFAULT);

  useEffect(() => {
    if (!home.data?.latestAdds) {
      dispatch(homePageGetLatestAdds());
    }
  }, []);

  const handleToggleSidebar = () => {
    setIsSidebarCollasped(!isSidebarCollasped);
  };

  const handleToggleMobileSidebar = () => {
    setMobileSidebarVisible(!mobileSidebarVisible);
  };

  const handleChangeView = (nextView) => {
    setView(nextView);
  };

  const handleOnAddProductToCart = (product) => {
    dispatch(addProductToCart(token, product));
  };

  const handleOnAddProductToWishlist = (product) => {
    dispatch(addProductToWishlist(token, product));
  };

  const handleOnRemoveProductFromWishlist = (product) => {
    dispatch(removeProductFromWishlist(token, product));
  };

  const handleRouteToLogin = () => {
    history.push("/login");
  };

  const handleSendMessageToOwner = (product, message) => {
    dispatch(sendMessageToOwner(token, product, message));
  };

  const handleDeleteMessageNotofication = (product) => {
    dispatch(deleteMessageNotification(product));
  };

  const Screen = viewMap[view === DEFAULT ? DEFAULT : CATEGORY];

  return (
    <>
      <Headers
        isSidebarCollasped={isSidebarCollasped}
        toggleSidebar={handleToggleSidebar}
        showMobileSidebar={handleToggleMobileSidebar}
        changeView={handleChangeView}
        currentPage={HOME_PAGE}
      />
      <div className='p-grid home-page__wrapper'>
        <Sidebar
          isCollasped={isSidebarCollasped}
          hideSidebar={handleToggleSidebar}
          mobileSidebarVisible={mobileSidebarVisible}
          hideMobileSidebar={handleToggleMobileSidebar}
          changeView={handleChangeView}
          view={view}
        />
        <div className='p-col content__container'>
          <Screen
            view={view}
            user={user}
            products={latestAdds}
            onAddProductToCart={handleOnAddProductToCart}
            onAddProductToWishlist={handleOnAddProductToWishlist}
            onRemoveProductFromWishlist={handleOnRemoveProductFromWishlist}
            routeToLogin={handleRouteToLogin}
            sendMessageToOwner={handleSendMessageToOwner}
            deleteMessageNotification={handleDeleteMessageNotofication}
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;
