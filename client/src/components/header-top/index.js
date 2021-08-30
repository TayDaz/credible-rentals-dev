import { useRef } from "react";
import { useHistory } from "react-router-dom";
import { Menu } from "primereact/menu";
import Logo from "./assets/logo.svg";
import UKFlag from "./assets/uk-flag-button-square-250.png";
import SlovakiaFlag from "./assets/slovakia-flag-button-square-250.png";
import {
  DEFAULT,
  UPLOADS_PAGE,
  PROFILE_PAGE,
  LOGIN_PAGE,
  HOME_PAGE,
  MY_ORDERS_PAGE,
} from "../../constants";
import "./styles.scss";

const HeaderTop = (props) => {
  const history = useHistory();
  const menuMobile = useRef(null);

  // console.log("HeaderTop props", props);

  const itemsMobile = [
    {
      label: "Language",
      icon: "pi pi-user",
      command: () => {
        // routeToProfilePage();
      },
    },
    {
      label: "Contact us",
      icon: "pi pi-upload",
      command: () => {
        // routeToUploadsPage();
      },
    },
    {
      label: "About us",
      icon: "pi pi-briefcase",
      command: () => {
        // routeToProfilePage();
      },
    },
  ];

  const routeToHomePage = () => {
    switch (props.currentPage) {
      case UPLOADS_PAGE:
      case PROFILE_PAGE:
      case LOGIN_PAGE:
      case MY_ORDERS_PAGE:
        history.push("/");
        break;
      case HOME_PAGE:
        props.changeView(DEFAULT);
    }
    //
  };
  return (
    <>
      <div className='p-d-none p-d-md-flex p-ai-end header-top__container'>
        <div className='p-d-flex p-mb-2 view-desktop__container'>
          <div
            className='p-d-flex p-jc-center p-ai-center logo__wrapper'
            onClick={routeToHomePage}>
            <img src={Logo} alt='Credible Rentals Logo' />
          </div>
          <div className='p-d-flex p-ai-end location__container'>
            <div className='p-d-flex location__wrapper'>
              <div className='p-d-flex p-ai-center location__icon-wrapper'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='22'
                  height='22'
                  fill='currentColor'
                  className='bi bi-geo-alt-fill'
                  viewBox='0 0 16 16'>
                  <path d='M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z' />
                </svg>
              </div>
              <div className='p-d-flex p-flex-column location-details__wrapper'>
                <div className='location-text'>Location</div>
                <div className='location-city-name'>Cityyyyyyyyyyy</div>
                <div className='location-radius'>5KM</div>
              </div>
            </div>
          </div>
          <div className='p-d-flex p-jc-center p-ai-end search-bar__container'>
            <div className='search-bar__wrapper p-d-flex'>
              <input type='text' className='' />
              <button>
                <i
                  className='pi pi-search'
                  style={{
                    fontSize: "2em",
                    color: "white",
                    fontWeight: "bold",
                  }}></i>
              </button>
            </div>
          </div>
          <div className='p-d-flex p-ai-end about-contact-us__container'>
            <div className='p-d-flex p-ml-1 p-mr-1 p-jc-between about-contact-us__wrapper'>
              <div className='p-mr-1 about-us__wrapper'>About&nbsp;us</div>
              <div className='p-ml-1 contact-us__wrapper'>Contact&nbsp;us</div>
            </div>
          </div>
          <div className='p-d-flex p-ai-end  flags__container'>
            <div className='p-d-flex p-ai-end p-jc-between p-ml-2 p-mr-2 flags__wrapper'>
              <div className='p-ml-3 uk-flag'>
                <img src={UKFlag} alt='UK Flag' />
              </div>
              <div className='p-ml-1 p-mr-1 separator'>/</div>
              <div className='p-mr-3 slovakia-flag'>
                <img src={SlovakiaFlag} alt='Slovakia flag' />
              </div>
            </div>
          </div>
          <div className='p-d-flex p-ai-end shopping-basket__container'>
            <div className='p-d-flex shopping-basket__wrapper'>
              <div className='p-d-flex p-ai-center p-jc-center shopping-cart-icon__container'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='25'
                  height='25'
                  fill='currentColor'
                  className='bi bi-cart3'
                  viewBox='0 0 16 16'>
                  <path d='M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z' />
                </svg>
              </div>
              <div className='p-d-flex p-flex-column shopping-text__container'>
                <div className='text-top'>Shopping</div>
                <div className='text-bottom'>Basket</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='p-d-flex p-d-md-none header-top__mobile-container'>
        <div className='p-d-flex p-jc-between  p-ml-2 p-mr-2 header-top__mobile-wrapper'>
          <div className='p-d-flex p-ai-center location__container'>
            <div className='p-d-flex p-mb-2 location__wrapper'>
              <div className='p-d-flex p-ai-center location__icon-wrapper'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='22'
                  height='22'
                  fill='currentColor'
                  className='bi bi-geo-alt-fill'
                  viewBox='0 0 16 16'>
                  <path d='M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z' />
                </svg>
              </div>
              <div className='p-d-flex p-flex-column location-details__wrapper'>
                <div className='location-text'>Location</div>
                <div className='location-city-name'>Cityyyyyyyyyyy</div>
                <div className='location-radius'>5KM</div>
              </div>
            </div>
          </div>
          <div className='p-d-flex brand-logo__container'>
            <div
              className='p-d-flex p-jc-center p-ai-center logo__wrapper'
              onClick={routeToHomePage}>
              <img src={Logo} alt='Credible Rentals Logo' />
            </div>
          </div>
          <div className='p-d-flex cart-language-links__container'>
            <div className='p-d-flex p-ai-center p-mr-2 p-mt-2 p-mb-2 shopping-basket__wrapper'>
              <div className='p-d-flex p-ai-end p-jc-center shopping-cart-icon__container'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='30'
                  height='30'
                  fill='currentColor'
                  className='bi bi-cart3'
                  viewBox='0 0 16 16'>
                  <path d='M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z' />
                </svg>
              </div>
              {/* <div className="p-d-flex p-flex-column shopping-text__container">
								<div className="text-top">Shopping</div>
								<div className="text-bottom">Basket</div>
							</div> */}
            </div>
            <div
              className='p-d-flex p-ai-center p-mt-2 links__wrapper'
              onClick={(e) => menuMobile.current.toggle(e)}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='30'
                height='30'
                fill='currentColor'
                className='bi bi-three-dots-vertical'
                viewBox='0 0 16 16'>
                <path d='M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z' />
              </svg>
              <Menu
                model={itemsMobile}
                popup
                ref={menuMobile}
                id='popup_menu_mobile'
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderTop;
