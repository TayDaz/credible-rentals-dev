import Sidebar from "./components/sidebar";
import MainContentWrapper from "./components/main-content-wrapper";
// import TestComponent from "./components/test-component";
import { useState } from "react";
import Headers from "../../components/headers";

import "./styles.scss";

const SidebarMainContentContainer = (props) => {
  const { defaultView, sidebarItems, currentPage } = props;

  const [view, setView] = useState(defaultView);
  const [isSidebarCollasped, setIsSidebarCollasped] = useState(false);
  const [mobileSidebarVisible, setMobileSidebarVisible] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarCollasped(!isSidebarCollasped);
  };

  const handleToggleMobileSidebar = () => {
    setMobileSidebarVisible(!mobileSidebarVisible);
  };

  const handleChangeView = (nextView) => {
    setView(nextView);
  };

  const CurrentDisplayComponent = sidebarItems.filter(
    (item) => item.label === view
  )[0].component;

  const currentProducts = sidebarItems.filter((item) => item.label === view)[0]
    .products;

  const contentProps = {
    ...props,
    products: currentProducts,
    view,
  };
  // console.log("previous props", props);

  // console.log("content props", contentProps);

  return (
    <>
      <Headers
        // headerBottomCurrentSelected={MY_ORDERS_PAGE}
        isSidebarCollasped={isSidebarCollasped}
        toggleSidebar={handleToggleSidebar}
        showMobileSidebar={handleToggleMobileSidebar}
        currentPage={currentPage}
      />
      <div className='p-grid sidebar_main-content__container'>
        <Sidebar
          sidebarItems={sidebarItems}
          isCollasped={isSidebarCollasped}
          hideSidebar={handleToggleSidebar}
          mobileSidebarVisible={mobileSidebarVisible}
          hideMobileSidebar={handleToggleMobileSidebar}
          changeView={handleChangeView}
          view={view}
        />
        <MainContentWrapper>
          <CurrentDisplayComponent {...contentProps} />
        </MainContentWrapper>
      </div>
    </>
  );
};

/**
 * defaultView: contains the default view
 * sidebarItems: contains the sidebaritems with their corresponding component
 */

export default SidebarMainContentContainer;
