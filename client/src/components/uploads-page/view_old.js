import { useState } from "react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import Headers from "../headers";
import Sidebar from "./components/sidebar";
import NewAdd from "./components/new-add";
// import ActiveAdds from "./components/active-adds";
// import InActiveAdds from "./components/in-active-adds";
import PendingVerification from "./components/pending-verification";
import AddsDisplayContainer from "./components/adds-display-container";

import {
  CAR_TRAILER,
  MOTOR_BIKE,
  TRANSPORT_VAN,
  FURNITURE,
  ELECTRICAL_AND_ELECTRONIC,
  SOFA,
  TABLE,
  CHAIR,
  WARDROBE,
  BED,
  SINGLE,
  SOFA_SET,
  LEATHER,
  COTTON,
  LINEN,
  SILK,
  VELVET,
  EXCELLENT,
  GOOD,
  AVERAGE,
  DROP_DOWN,
  INPUT_TEXT,
  DATE,
  CALENDAR,
  GROUP__INPUT_TEXT__DROP_DOWN,
  GROUP__INPUT_NUMBER__DROP_DOWN,
  GROUP__INPUT_NUMBER__DROP_DOWN__DROP_DOWN,
  DAYS,
  MONTHS,
  YEARS,
  DOLLAR,
  EURO,
  DAY,
  WEEK,
  WEEKS,
  MONTH,
  YEAR,
  PENDING_VERIFICATION,
  RESTAURANT,
  STUDY,
  DINING,
  WOOD,
  IRON,
  ALUMINIUM,
  SQUARE,
  ROUND,
  RECTANGLE,
  NEW_ADD,
  ACTIVE_ADDS,
  INACTIVE_ADDS,
  ACTIVE,
  INACTIVE,
  UPLOADS_PAGE,
} from "../../constants";

// import { NEW_UPLOAD, ACTIVE_UPLOADS, IN_ACTIVE_UPLOADS } from "../../constants";

import "./styles.scss";

const newUploadFormSchema = yup.object().shape({
  category: yup.string().required("Category is required"),
  subCategory: yup.string().required("Sub-category is required"),
  name: yup.string().required("Product Name is required"),
  type: yup.string().oneOf([SINGLE, SOFA_SET, RESTAURANT, STUDY, DINING]),
  fabric: yup.string().oneOf([LEATHER, COTTON, LINEN, SILK, VELVET]),
  size: yup.string(),
  condition: yup.string().oneOf([EXCELLENT, GOOD, AVERAGE]),
  purchaseDate: yup.date(),
  minRentingPeriod: yup.string(),
  maxRentingPeriod: yup.string(),
  originalPrice: yup.string(),
  rentPrice: yup.string(),
  availabileFrom: yup.date(),
});

const categories = [
  { label: "Furniture", value: FURNITURE },
  {
    label: "Electrical & Electronics items",
    value: ELECTRICAL_AND_ELECTRONIC,
  },
  // { label: 'Bicycle', value: BICYCLE },
  // { label: 'Car', value: CAR },
  // { label: 'Truck', value: TRUCK },
  // { label: 'Transport Van', value: TRANSPORT_VAN },
  // { label: 'Car trailer', value: CAR_TRAILER },
  // { label: 'Motorbike', value: MOTOR_BIKE },
  // { label: 'Speed boat', value: SPEED_BOAT },
  // { label: 'Books', value: BOOKS },
  // { label: 'Flat/House', value: FLAT_OR_HOUSE },
  // { label: 'Warehouse', value: WAREHOUSE },
  // { label: 'Party Hall', value: PARTY_HALL },
  // { label: 'Land', value: LAND },
  // { label: 'Shop', value: SHOP },
  // { label: 'Designer Clothes', value: DESIGNER_CLOTHES },
  // { label: 'Women Jewelry', value: WOMEN_JEWELLERY },
  // { label: 'Farming and Garden equipment', value: FARMING_AND_GARDEN_EQUIPMENTS },
];

const subCategories = {
  [FURNITURE]: [
    {
      label: "Sofa",
      value: SOFA,
    },
    {
      label: "Table",
      value: TABLE,
    },
    {
      label: "Chair",
      value: CHAIR,
    },
    {
      label: "Wardrobe",
      value: WARDROBE,
    },
    {
      label: "Bed",
      value: BED,
    },
  ],
};

const subCategoriesForm = {
  [SOFA]: [
    {
      name: "name",
      fieldType: INPUT_TEXT,
      placeholder: "Product Name",
      floatLabel: "Product Name",
      colSm: "12",
      colMd: "12",
      colLg: "12",
    },
    {
      name: "type",
      fieldType: DROP_DOWN,
      placeholder: "Sofa type",
      options: [
        { label: "Single", value: SINGLE },
        { label: "Sofa Set", value: SOFA_SET },
      ],
      floatLabel: "Sofa type",
      colSm: "6",
      colMd: "6",
      colLg: "6",
    },
    {
      name: "fabric",
      fieldType: DROP_DOWN,
      placeholder: "Fabric type",
      options: [
        { label: "Leather", value: LEATHER },
        { label: "Cotton", value: COTTON },
        { label: "Linen", value: LINEN },
        { label: "Silk", value: SILK },
        { label: "Velvet", value: VELVET },
      ],
      floatLabel: "Fabric type",
      colSm: "6",
      colMd: "6",
      colLg: "6",
    },
    {
      name: "size",
      fieldType: INPUT_TEXT,
      placeholder: "Sofa size in L x B x H",
      floatLabel: "Sofa size in L x B x H",
      colSm: "12",
      colMd: "6",
      colLg: "6",
    },
    {
      name: "condition",
      fieldType: DROP_DOWN,
      placeholder: "Please select the condition",
      floatLabel: "Product Condition",
      options: [
        { label: "Excellent", value: EXCELLENT },
        { label: "Good", value: GOOD },
        { label: "Average", value: AVERAGE },
      ],
      colSm: "12",
      colMd: "6",
      colLg: "6",
    },
    {
      name: "purchaseDate",
      fieldType: CALENDAR,
      placeholder: "Purchase Date",
      floatLabel: "Product Purchase Date",
      colSm: "12",
      colMd: "6",
      colLg: "6",
    },
    {
      name: "minRentingPeriod",
      nameInputNumber: "minRentingPeriodNumber",
      nameDropDown: "minRentingPeriodDuration",
      fieldType: GROUP__INPUT_NUMBER__DROP_DOWN,
      placeholderInputNumber: "Min Number of days/months/years",
      floatLabelInputNumber: "Mininum tenure",
      placeholderDropDown: "Select duration",
      floatLabelDropDown: "Duration Type",
      options: [
        { label: "Days", value: DAYS },
        { label: "Weeks", value: WEEKS },
        { label: "Months", value: MONTHS },
        { label: "Years", value: YEARS },
      ],
      colSm: "12",
      colMd: "6",
      colLg: "6",
    },
    {
      name: "maxRentingPeriod",
      nameInputNumber: "maxRentingPeriodNumber",
      nameDropDown: "maxRentingPeriodDuration",
      fieldType: GROUP__INPUT_NUMBER__DROP_DOWN,
      placeholderInputNumber: "Max Number of days/months/years",
      floatLabelInputNumber: "Max tenure duration",
      placeholderDropDown: "Select duration",
      floatLabelDropDown: "Duration Type",
      options: [
        { label: "Days", value: DAYS },
        { label: "Weeks", value: WEEKS },
        { label: "Months", value: MONTHS },
        { label: "Years", value: YEARS },
      ],
      colSm: "12",
      colMd: "6",
      colLg: "6",
    },
    {
      name: "originalPrice",
      nameInputNumber: "originalPriceAmount",
      nameDropDown: "originalPriceDenomination",
      fieldType: GROUP__INPUT_NUMBER__DROP_DOWN,
      placeholderInputNumber: "Original price",
      floatLabelInputNumber: "Original price",
      placeholderDropDown: "Denomination",
      floatLabelDropDown: "Denomination",
      options: [
        { label: "$", value: DOLLAR },
        { label: "€", value: EURO },
      ],
      colSm: "12",
      colMd: "6",
      colLg: "6",
    },
    {
      name: "rentPrice",
      fieldType: GROUP__INPUT_NUMBER__DROP_DOWN__DROP_DOWN,
      nameInputNumber: "rentPriceAmount",
      nameDropDown1: "rentPriceDenomination",
      nameDropDown2: "rentPriceDuration",
      placeholderInputNumber: "Rent price",
      floatLabelInputNumber: "Rent price",
      placeholderDropDown1: "Denomination",
      floatLabelDropDown1: "Denomination",
      placeholderDropDown2: "Duration",
      floatLabelDropDown2: "Duration",
      options1: [
        { label: "$", value: DOLLAR },
        { label: "€", value: EURO },
      ],
      options2: [
        { label: "/Day", value: DAY },
        { label: "/Week", value: WEEK },
        { label: "/Month", value: MONTH },
        { label: "/Year", value: YEAR },
      ],
      colSm: "12",
      colMd: "6",
      colLg: "6",
    },
    {
      name: "availableFrom",
      fieldType: CALENDAR,
      placeholder: "Available from",
      floatLabel: "Available from",
      colSm: "12",
      colMd: "6",
      colLg: "6",
    },
  ],
  [TABLE]: [
    {
      name: "name",
      fieldType: INPUT_TEXT,
      placeholder: "Product Name",
      floatLabel: "Product Name",
      colSm: "12",
      colMd: "12",
      colLg: "12",
    },
    {
      name: "type",
      fieldType: DROP_DOWN,
      placeholder: "Table type",
      floatLabel: "Table type",
      options: [
        { label: "Restaurant", value: RESTAURANT },
        { label: "Study", value: STUDY },
        { label: "Dining", value: DINING },
      ],
      colSm: "6",
      colMd: "6",
      colLg: "6",
    },
    {
      name: "fabric",
      fieldType: DROP_DOWN,
      placeholder: "Fabric type",
      floatLabel: "Fabric type",
      options: [
        { label: "Leather", value: LEATHER },
        { label: "Cotton", value: COTTON },
        { label: "Linen", value: LINEN },
        { label: "Silk", value: SILK },
        { label: "Velvet", value: VELVET },
      ],
      colSm: "6",
      colMd: "6",
      colLg: "6",
    },
    {
      name: "materialType",
      fieldType: DROP_DOWN,
      placeholder: "Material type",
      floatLabel: "Material type",
      options: [
        { label: "Wood", value: WOOD },
        { label: "Iron", value: IRON },
        { label: "Aluminium", value: ALUMINIUM },
      ],
      colSm: "6",
      colMd: "6",
      colLg: "6",
    },
    {
      name: "shape",
      fieldType: DROP_DOWN,
      placeholder: "Shape",
      floatLabel: "Shape",
      options: [
        { label: "Square", value: SQUARE },
        { label: "Round", value: ROUND },
        { label: "Rectangle", value: RECTANGLE },
      ],
      colSm: "6",
      colMd: "6",
      colLg: "6",
    },
    {
      name: "size",
      fieldType: INPUT_TEXT,
      placeholder: "Table size in L x B x H",
      floatLabel: "Table size in L x B x H",
      colSm: "12",
      colMd: "6",
      colLg: "6",
    },
    {
      name: "quantity",
      fieldType: INPUT_TEXT,
      placeholder: "Quantity",
      floatLabel: "Quantity",
      colSm: "12",
      colMd: "6",
      colLg: "6",
    },
    {
      name: "condition",
      fieldType: DROP_DOWN,
      placeholder: "Please select the condition",
      floatLabel: "Please select the condition",
      options: [
        { label: "Excellent", value: EXCELLENT },
        { label: "Good", value: GOOD },
        { label: "Average", value: AVERAGE },
      ],
      colSm: "12",
      colMd: "6",
      colLg: "6",
    },
    {
      name: "purchaseDate",
      fieldType: CALENDAR,
      placeholder: "Purchase Date",
      floatLabel: "Purchase Date",
      colSm: "12",
      colMd: "6",
      colLg: "6",
    },
    {
      name: "minRentingPeriod",
      nameInputNumber: "minRentingPeriodNumber",
      nameDropDown: "minRentingPeriodDuration",
      fieldType: GROUP__INPUT_NUMBER__DROP_DOWN,
      placeholderInputNumber: "Min Number of days/months/years",
      floatLabelInputNumber: "Min Number of days/months/years",
      placeholderDropDown: "Select duration",
      floatLabelDropDown: "Select duration",
      options: [
        { label: "Days", value: DAYS },
        { label: "Weeks", value: WEEKS },
        { label: "Months", value: MONTHS },
        { label: "Years", value: YEARS },
      ],
      colSm: "12",
      colMd: "12",
      colLg: "12",
    },
    {
      name: "maxRentingPeriod",
      nameInputNumber: "maxRentingPeriodNumber",
      nameDropDown: "maxRentingPeriodDuration",
      fieldType: GROUP__INPUT_NUMBER__DROP_DOWN,
      placeholderInputNumber: "Max Number of days/months/years",
      floatLabelInputNumber: "Max Number of days/months/years",
      placeholderDropDown: "Select duration",
      floatLabelDropDown: "Select duration",
      options: [
        { label: "Days", value: DAYS },
        { label: "Weeks", value: WEEKS },
        { label: "Months", value: MONTHS },
        { label: "Years", value: YEARS },
      ],
      colSm: "12",
      colMd: "12",
      colLg: "12",
    },
    {
      name: "originalPrice",
      nameInputNumber: "originalPriceAmount",
      nameDropDown: "originalPriceDenomination",
      fieldType: GROUP__INPUT_NUMBER__DROP_DOWN,
      placeholderInputNumber: "Original price",
      floatLabelInputNumber: "Original price",
      placeholderDropDown: "Denomination",
      floatLabelDropDown: "Denomination",
      options: [
        { label: "$", value: DOLLAR },
        { label: "€", value: EURO },
      ],
      colSm: "12",
      colMd: "12",
      colLg: "12",
    },
    {
      name: "rentPrice",
      fieldType: GROUP__INPUT_NUMBER__DROP_DOWN__DROP_DOWN,
      nameInputNumber: "rentPriceAmount",
      nameDropDown1: "rentPriceDenomination",
      nameDropDown2: "rentPriceDuration",
      placeholderInputNumber: "Rent price",
      floatLabelInputNumber: "Rent price",
      placeholderDropDown1: "Denomination",
      floatLabelDropDown1: "Denomination",
      placeholderDropDown2: "Duration",
      floatLabelDropDown2: "Duration",
      options1: [
        { label: "$", value: DOLLAR },
        { label: "€", value: EURO },
      ],
      options2: [
        { label: "/Day", value: DAY },
        { label: "/Week", value: WEEK },
        { label: "/Month", value: MONTH },
        { label: "/Year", value: YEAR },
      ],
      colSm: "12",
      colMd: "6",
      colLg: "6",
    },
    {
      name: "availableFrom",
      fieldType: CALENDAR,
      placeholder: "Available from",
      floatLabel: "Available from",
      colSm: "12",
      colMd: "6",
      colLg: "6",
    },
  ],
};

const viewMap = {
  [NEW_ADD]: NewAdd,
  [ACTIVE_ADDS]: AddsDisplayContainer,
  [INACTIVE_ADDS]: AddsDisplayContainer,
  [PENDING_VERIFICATION]: PendingVerification,
};

const View = (props) => {
  const uploads = useSelector((state) => state.uploads);

  const adds = uploads.adds;
  console.log("[uploads-page/view.js] adds", adds);

  const [view, setView] = useState(NEW_ADD);
  const [images, setImages] = useState([]);

  const [isSidebarCollasped, setIsSidebarCollasped] = useState(false);
  const [mobileSidebarVisible, setMobileSidebarVisible] = useState(false);

  // const [currentSelectedLink, setCurrentSelectedLink] = useState(NEW_ADD);

  const handleToggleSidebar = () => {
    setIsSidebarCollasped(!isSidebarCollasped);
  };

  const handleToggleMobileSidebar = () => {
    setMobileSidebarVisible(!mobileSidebarVisible);
  };

  const handleFormSubmit = (values) => {
    props.uploadAdd({ ...values, images });
  };

  const formik = useFormik({
    initialValues: {
      category: null,
      subCategory: null,
    },
    validationSchema: newUploadFormSchema,
    onSubmit: handleFormSubmit,
  });

  const handleChangeView = (newView) => {
    console.log("[uploads-page/view/.js] handleChangeView() newView", newView);
    setView(newView);
  };

  const handleAddImage = (src, title) => {
    const updatedImages = [...images, { src, title }];
    setImages(updatedImages);
  };

  const handleUpdateImage = (indx, src) => {
    const updatedImages = [...images];
    updatedImages[indx].src = src;
    setImages(updatedImages);
  };

  const handleUpdateTitle = (indx, title) => {
    const updatedImages = [...images];
    updatedImages[indx].title = title;
    setImages(updatedImages);
  };

  const handleDeleteImage = (indx) => {
    const updatedImages = [...images];
    updatedImages.splice(indx, 1);
    setImages(updatedImages);
  };

  const activeAdds = adds.filter((add) => add.addStatus === ACTIVE);
  const inactiveAdds = adds.filter((add) => add.addStatus === INACTIVE);

  const contentProps = {
    view,
    formik,
    schema: newUploadFormSchema,
    categories,
    subCategories,
    subCategoriesForm,
    images,
    handleAddImage,
    handleUpdateImage,
    handleUpdateTitle,
    handleDeleteImage,
    adds,
    activeAdds,
    inactiveAdds,
    ...props,
  };

  // const handleChangeSelectedLink = (linkName) => {
  // 	setCurrentSelectedLink(linkName);
  // };

  // console.log("FORMIKKKK", formik);
  const Content = viewMap[view];

  return (
    <>
      <Headers
        isSidebarCollasped={isSidebarCollasped}
        toggleSidebar={handleToggleSidebar}
        showMobileSidebar={handleToggleMobileSidebar}
        currentPage={UPLOADS_PAGE}
      />
      <div className='p-grid uploads-page__wrapper'>
        {/* <div
					className="p-col-fixed p-col-align-stretch p-d-none p-d-md-flex p-flex-column sidebar__wrapper"
					style={{ width: "250px", postition: "fixed" }}
				> */}
        <Sidebar
          isCollasped={isSidebarCollasped}
          hideSidebar={handleToggleSidebar}
          mobileSidebarVisible={mobileSidebarVisible}
          hideMobileSidebar={handleToggleMobileSidebar}
          changeView={handleChangeView}
          view={view}
          // selectedLink={currentSelectedLink}
          // changeSelectedLink={handleChangeSelectedLink}
        />
        {/* </div> */}
        <div className='p-col content__container'>
          {/* <ContentWrapper> */}
          <Content {...contentProps} />
          {/* </ContentWrapper> */}
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default View;
