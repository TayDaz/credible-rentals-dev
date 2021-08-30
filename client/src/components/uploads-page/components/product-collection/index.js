import { useState } from "react";
import { Carousel } from "primereact/carousel";

import ProductTemplate from "./components/product-template";
import "./styles.scss";

const responsiveOptions = [
	{
		breakpoint: "1024px",
		numVisible: 3,
		numScroll: 3,
	},
	{
		breakpoint: "600px",
		numVisible: 2,
		numScroll: 2,
	},
	{
		breakpoint: "480px",
		numVisible: 1,
		numScroll: 1,
	},
];

const ProductCollection = (props) => {
	console.log("[product-collection/.js] props", props);

	const [products, setProducts] = useState([...props.products]);

	return (
		<div className="card">
			<Carousel
				value={products}
				numVisible={3}
				numScroll={3}
				responsiveOptions={responsiveOptions}
				itemTemplate={ProductTemplate}
				header={
					<div className="p-d-flex p-ai-center product-collection-header__wrapper">
						<div className="p-ml-2 product-header">
							{props.filterName}
						</div>
					</div>
				}
			/>
		</div>
	);
};

export default ProductCollection;
