import { Badge } from "primereact/badge";
import { classNames } from "primereact/utils";
import { Sidebar } from "primereact/sidebar";
import getIcon from "../icons";

import {
  NEW_ADD,
  ACTIVE_ADDS,
  INACTIVE_ADDS,
  PENDING_VERIFICATION,
  CART,
  MY_CURRENT_ORDERS,
  MY_PREVIOUS_ORDERS,
  CANCELLED_ORDERS,
  WISHLIST,
} from "../../constants";

import "./styles.scss";

const CustomSidebar = (props) => {
  const {
    isCollasped,
    mobileSidebarVisible,
    view,
    sidebarItems,
    sidebarMaxWidth,
  } = props;

  let sidebarWidth,
    linkClasses,
    linkClassesMobile,
    iconClasses,
    iconClassesMobile,
    textClasses,
    textClassesMobile;

  /** CSS classes configuration for desktop sidebar on collasped and expanded*/
  if (isCollasped) {
    sidebarWidth = "70px";
    linkClasses = "p-col-12 p-d-flex p-jc-center p-ai-stretch link__container";
    iconClasses = "p-d-flex p-jc-center p-ai-center icon__wrapper";
    textClasses = "hidden";
  } else {
    sidebarWidth = "200px";
    linkClasses = "p-col-12 p-d-flex link__container";
    iconClasses = "p-d-flex p-ai-center p-ml-2 icon__wrapper";
    textClasses = "p-d-flex p-ai-center text__wrapper";
  }

  /**CSS classes for mobile sidebar */
  linkClassesMobile = "p-d-flex p-ai-center link__container";
  iconClassesMobile = "p-d-flex p-mr-2 icon__wrapper";
  textClassesMobile = "p-d-flex text__wrapper";

  const getSidebarLinks = () => {
    return (
      <>
        {sidebarItems.map((item, index) => (
          <div
            className={classNames(linkClassesMobile, {
              selected: isViewSelected(item.label),
            })}
            onClick={() => props.changeView(item.label)}
            key={index}>
            <div className={iconClassesMobile}>
              <img src={getIcon(item.label, isViewSelected(item.label))} />
            </div>
            <div className={textClassesMobile}>{item.value}</div>
          </div>
        ))}

        {/* <div
          className={classNames(linkClassesMobile, {
            selected: isViewSelected(NEW_ADD),
          })}
          onClick={() => props.changeView(NEW_ADD)}>
          <div className={iconClassesMobile}>
            <img src={getIcon(NEW_ADD, isViewSelected(NEW_ADD))} />
          </div>
          <div className={textClassesMobile}>New Add</div>
        </div>

        <div
          className={classNames(linkClassesMobile, {
            selected: isViewSelected(ACTIVE_ADDS),
          })}
          onClick={() => props.changeView(ACTIVE_ADDS)}>
          <div className={iconClassesMobile}>
            <img src={getIcon(ACTIVE_ADDS, isViewSelected(ACTIVE_ADDS))} />
          </div>
          <div className={textClassesMobile}>Active Adds</div>
        </div>

        <div
          className={classNames(linkClassesMobile, {
            selected: isViewSelected(INACTIVE_ADDS),
          })}
          onClick={() => props.changeView(INACTIVE_ADDS)}>
          <div className={iconClassesMobile}>
            <img src={getIcon(INACTIVE_ADDS, isViewSelected(INACTIVE_ADDS))} />
          </div>
          <div className={textClassesMobile}>Inactive Adds</div>
        </div> */}
      </>
    );
  };

  const hideMobileSidebar = () => {
    props.hideMobileSidebar();
  };

  const isViewSelected = (linkId) => linkId === view;

  return (
    <>
      <div
        className='p-col-fixed p-col-align-stretch p-d-none p-d-md-flex p-flex-column custom-page__sidebar__container'
        style={{ width: sidebarWidth }}>
        {sidebarItems.map((item, index) => (
          <div
            className={classNames(linkClasses, {
              selected: isViewSelected(item.label),
            })}
            onClick={() => props.changeView(item.label)}
            key={index}>
            <div className={iconClasses}>
              <img src={getIcon(item.label, isViewSelected(item.label))} />
            </div>
            <div className={textClasses}>{item.value}</div>
          </div>
        ))}
      </div>
      <div className='p-d-md-none uploads-page__sidebar__mobile-container'>
        <Sidebar
          visible={mobileSidebarVisible}
          className='ui-sidebar-sm uploads-page__sidebar__mobile-wrapper'
          onHide={hideMobileSidebar}>
          {getSidebarLinks()}
        </Sidebar>
      </div>
    </>
  );
};

export default CustomSidebar;
