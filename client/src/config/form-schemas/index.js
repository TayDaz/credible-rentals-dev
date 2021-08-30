import * as yup from "yup";
import {
  AVERAGE,
  COTTON,
  DINING,
  EXCELLENT,
  GOOD,
  LEATHER,
  LINEN,
  RESTAURANT,
  SILK,
  SINGLE,
  SOFA_SET,
  STUDY,
  VELVET,
} from "../../constants";

export const newUpload = yup.object().shape({
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
