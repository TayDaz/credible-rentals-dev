import { useRef } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "primereact/avatar";
import { Menu } from "primereact/menu";
import { url } from "../../config";
import defaultAvatarPng from "./assets/images/portfolio.png";
import "./styles.scss";
import { classNames } from "primereact/utils";
import { logoutUser } from "../../redux";
import { MY_ORDERS_PAGE, PROFILE_PAGE, UPLOADS_PAGE } from "../../constants";

const HeaderBottom = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const menu = useRef(null);
  const menuMobile = useRef(null);
  const toast = useRef(null);

  const { currentPage } = props;

  const toggleSidebar = () => {
    props.toggleSidebar();
  };

  const showMobileSidebar = () => {
    props.showMobileSidebar();
  };

  const routeToMyOrdersPage = () => {
    history.push("/my-orders");
  };

  const routeToUploadsPage = () => {
    history.push("/uploads");
  };

  const routeToProfilePage = () => {
    history.push("/profile");
  };

  const routeToLoginPage = () => {
    history.push("/login");
  };

  const userLogout = () => {
    dispatch(logoutUser());
  };

  const items = [
    {
      label: "Profile",
      icon: "pi pi-fw pi-plus",
      command: () => {
        routeToProfilePage();
      },
    },
    {
      label: "Logout",
      icon: "pi pi-fw pi-trash",
      command: () => {
        userLogout();
      },
    },
  ];

  const itemsMobile = [
    {
      label: "Profile",
      icon: "pi pi-user",
      command: () => {
        routeToProfilePage();
      },
    },
    {
      label: "Uploads",
      icon: "pi pi-upload",
      command: () => {
        routeToUploadsPage();
      },
    },
    {
      label: "Orders",
      icon: "pi pi-briefcase",
      command: () => {
        routeToProfilePage();
      },
    },
    {
      label: "Logout",
      icon: "pi pi-fw pi-trash",
      command: () => {
        logoutUser();
      },
    },
  ];

  /**Setting the image depending if the user is logged in or not */
  let image;

  if (!user.data?.avatar) {
    image = defaultAvatarPng;
  } else {
    if (user.data?.avatar?.includes("http")) {
      image = user.avatar;
    } else {
      image = `${url.image}/${user.data?.avatar}`;
    }
  }

  const isPageSelected = (page) => page === currentPage;

  return (
    <>
      <div className='p-d-none p-d-md-flex p-jc-between header-bottom__container'>
        <div className='p-d-flex p-jc-between icon-header__container'>
          <div
            className='p-d-flex p-ai-center icon__wrapper'
            onClick={toggleSidebar}>
            {props.isSidebarCollasped ? (
              <i
                className='pi pi-angle-double-right'
                style={{ fontSize: "2rem", color: "white" }}></i>
            ) : (
              <i
                className='pi pi-angle-double-left'
                style={{ fontSize: "2rem", color: "white" }}></i>
            )}
          </div>
          <div className='p-d-flex p-ai-center p-ml-4 heading__wrapper'>
            <div>Categories</div>
          </div>
        </div>

        <div className='p-d-flex p-ai-center links__container p-text-center'>
          <div
            // className='link__wrapper p-d-flex p-ai-center selected'
            className={classNames("link__wrapper p-d-flex p-ai-center", {
              selected: isPageSelected(MY_ORDERS_PAGE),
            })}>
            <div
              className='link-item p-text-center'
              onClick={routeToMyOrdersPage}>
              My Orders
            </div>
          </div>
          <div
            className={classNames("link__wrapper p-d-flex p-ai-center", {
              selected: isPageSelected(UPLOADS_PAGE),
            })}
            onClick={routeToUploadsPage}>
            <div className='link-item'>Uploads</div>
          </div>
          {user.isLoggedIn ? (
            <div
              // className='link__wrapper p-d-flex p-jc-center p-text-left'
              className={classNames(
                "link__wrapper p-d-flex p-ai-center p-jc-center",
                {
                  selected: isPageSelected(PROFILE_PAGE),
                }
              )}
              onClick={(e) => menu.current.toggle(e)}>
              <div className='p-d-flex p-flex-column'>
                {/* <div className="link-item-logged-in-top">
								My Account,
							</div> */}
                <div className=' p-d-flex p-ai-center link-item-logged-in-bottom'>
                  Hi, <Avatar image={image} className='p-mr-2' shape='circle' />
                </div>
              </div>
              <Menu model={items} popup ref={menu} id='popup_menu' />
            </div>
          ) : (
            <div
              // className='link__wrapper p-d-flex p-ai-center'
              className={classNames("link__wrapper p-d-flex p-ai-center", {
                selected: isPageSelected(PROFILE_PAGE),
              })}
              onClick={routeToLoginPage}>
              <div className='link-item'>Login</div>
            </div>
          )}
        </div>
      </div>
      <div className='p-d-md-none p-d-flex header-bottom__mobile-container'>
        <div className='p-ml-4 p-mr-4 p-d-flex p-jc-between p-ai-center header-bottom__wrapper'>
          <div
            className='p-d-flex p-jc-between p-ai-center icon__container'
            onClick={showMobileSidebar}>
            <i
              className='pi pi-bars'
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#ffffff",
              }}></i>
          </div>
          <div className='header__wrapper'>Categories</div>
          <div className='p-d-flex p-ai-center profile_wrapper'>
            {user.isLoggedIn ? (
              <>
                <Avatar
                  image={image}
                  className='p-mr-2'
                  shape='circle'
                  onClick={(e) => menuMobile.current.toggle(e)}
                />
                <Menu
                  model={itemsMobile}
                  popup
                  ref={menuMobile}
                  id='popup_menu_mobile'
                />
              </>
            ) : (
              <span onClick={routeToLoginPage} className='p-d-flex p-ai-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='25'
                  height='25'
                  fill='currentColor'
                  className='bi bi-person-circle'
                  viewBox='0 0 16 16'>
                  <path d='M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z' />
                  <path
                    fillRule='evenodd'
                    d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z'
                  />
                </svg>
              </span>

              // <i
              // 	className="pi pi-user"
              // 	style={{ fontSize: "1.5rem", color: "#ffffff" }}
              // 	onClick={routeToLoginPage}
              // ></i>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderBottom;
