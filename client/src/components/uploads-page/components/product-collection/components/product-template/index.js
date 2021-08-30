import { useState } from "react";
import url from "../../../../../../config/url";
import { Button } from "primereact/button";
import ProductDisplayWithDialog from "../../../product-display-with-dialog";
import { EURO, DOLLAR } from "../../../../../../constants";
import "./styles.scss";

const denominationMap = {
	[EURO]: "€",
	[DOLLAR]: "$",
};

const ProductTemplate = (product) => {
	// const [showProduct, setShowProduct] = useState(false);
	// console.log("[product-collection/product-template/.js] product", product);
	let showProduct = false;

	const displayProductDialog = () => {
		showProduct = true;
		console.log("displau");
	};

	// const handleHideProduct = () => {
	// 	setShowProduct(false);
	// };

	return (
		<div className="product-item">
			<div className="product-item-content">
				<div className="p-mb-3">
					<ProductDisplayWithDialog product={product} />

					{/* <div className="car-buttons p-mt-5">
						<Button
							icon="pi pi-search"
							className="p-button p-button-rounded p-mr-2"
						/>
						<Button
							icon="pi pi-star"
							className="p-button-success p-button-rounded p-mr-2"
						/>
						<Button
							icon="pi pi-cog"
							className="p-button-help p-button-rounded"
						/>
					</div> */}
				</div>
			</div>
		</div>
	);
};

export default ProductTemplate;
