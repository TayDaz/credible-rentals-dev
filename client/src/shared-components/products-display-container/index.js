import ProductsCollection from "../products-collection";

const ProductsDisplayContainer = (props) => {
  console.log("ProductsDisplayContainer props", props);
  return <ProductsCollection {...props} />;
};

export default ProductsDisplayContainer;
