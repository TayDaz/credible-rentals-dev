import ProductFieldData from "./components/product-field-data";
import { productFieldMap } from "../../../../../../../../config/product-map";
import "./styles.scss";

const ProductDetails = (props) => {
  const { product } = props;
  const { category, subCategory } = product;

  return (
    <div className='product-details__container'>
      {productFieldMap[category][subCategory].map((field, index) => (
        <ProductFieldData field={field} key={index} product={product} />
      ))}
    </div>
  );
};

export default ProductDetails;
