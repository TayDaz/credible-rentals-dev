import { useState, useEffect } from "react";
import {
  CATEGORY,
  DATE,
  DEFAULT,
  SUB_CATEGORY,
  PRICE__LOW_TO_HIGH,
  PRICE__HIGH_TO_LOW,
  DATE__OLD_TO_NEW,
  DATE__NEW_TO_OLD,
} from "../../constants";
import ProductCollectionCategory from "../product-collection-category";
import ProductFilter from "./components/product-filter";
import { getFilteredAdds } from "./components/get-filtered-adds";

import "./styles.scss";

const filters = [
  // { label: "Default", value: DEFAULT },
  // { label: "Category", value: CATEGORY },
  { label: "Sub-Category", value: SUB_CATEGORY },
  { label: "Date", value: DATE },
  { label: "Price: Low to High", value: PRICE__LOW_TO_HIGH },
  { label: "Price: High To Low", value: PRICE__HIGH_TO_LOW },
  { label: "Date: Old to New", value: DATE__OLD_TO_NEW },
  { label: "Date: New to Old", value: DATE__NEW_TO_OLD },
];

const Content = (props) => {
  const { products, heading, contentHeader } = props;

  let defaultProducts = [];
  /** if the products were passed as an array */
  console.log("[content/.js] products", products);
  if (products) {
    defaultProducts = products;
  }

  const [range, setRange] = useState([1, 10000]);
  const [filter, setFilter] = useState(null);
  const [currentProducts, setCurrentProducts] = useState(defaultProducts);

  // console.log("CurrentProducts", currentProducts);
  useEffect(() => {
    if (products?.length > 0) {
      setCurrentProducts(products);
    } else {
      setCurrentProducts([]);
    }
  }, [products]);

  const handleOnRangeChange = (value) => {
    setRange(value);
  };

  const handleOnFilterChange = (value) => {
    // console.log(value);
    setFilter(value);
  };

  const handleOnApplyFilterSort = () => {
    defaultProducts = [];

    console.log("CURRENT_PRODUCTS", currentProducts);

    defaultProducts = getFilteredAdds(filter, products);

    // if (Array.isArray(currentProducts)) {
    // 	// defaultProducts = currentProducts;
    // 	// defaultProducts = Object.values(currentProducts).flat();
    // 	defaultProducts = getFilteredAdds(filter, products);
    // } else {
    // 	defaultProducts = Object.values(products).flat();
    // }

    console.log("Content onapplyFilter", defaultProducts);
    setCurrentProducts(defaultProducts);
  };

  const displayMappedAdds = () => {
    defaultProducts = [];
    currentProducts.forEach((products, key) => {
      defaultProducts.push(
        <>
          <h5>{key}</h5>
          <ProductCollectionCategory products={products} {...props} />
        </>
      );
    });

    return defaultProducts;
  };

  const displayDefaultAdds = () => {
    const productCollectionProps = {
      ...props,
      products: currentProducts,
    };

    return <ProductCollectionCategory {...productCollectionProps} />;
  };

  return (
    <div className='content__container'>
      <div className='p-d-flex p-jc-between heading-filter-sort-icon__container'>
        <div className='heading__wrapper'>{contentHeader}</div>
        <div className='filter-sort-icon__wrapper'>
          <ProductFilter
            range={range}
            minRange={1}
            maxRange={10000}
            rangeStep={100}
            filter={filter}
            onRangeChange={handleOnRangeChange}
            onFilterChange={handleOnFilterChange}
            onApplyFilterSort={handleOnApplyFilterSort}
            filters={filters}
          />
        </div>
      </div>

      <div className='product-display__container'>
        {Array.isArray(currentProducts)
          ? displayDefaultAdds()
          : displayMappedAdds()}
      </div>
    </div>
  );
};

export default Content;
