import { useState } from "react";
import Product from "./components/product";
import ProductModal from "./components/product-modal";

import "./styles.scss";

const ProductCollection = (props) => {
	const { products } = props;

	const [showProductModal, setShowProductModal] = useState(false);
	const [currentProductIndx, setCurrentProductIndx] = useState(0);

	const handlePreviousProduct = () => {
		setCurrentProductIndx(currentProductIndx - 1);
	};

	const handleNextProduct = () => {
		setCurrentProductIndx(currentProductIndx + 1);
	};

	const handleSelectProduct = (id) => {
		setCurrentProductIndx(id);
		setShowProductModal(true);
	};

	const handleHideModal = () => {
		setShowProductModal(false);
	};

	console.log(
		"[shared-components/product-collection/.js] products, currentProductIndx",
		products,
		currentProductIndx
	);

	return (
		<div className="p-d-flex product-collection__container">
			<div className="p-d-flex product-collection__wrapper">
				{products.map((product, indx) => (
					<Product
						product={product}
						selectProduct={handleSelectProduct}
						index={indx}
					/>
				))}
			</div>
			<ProductModal
				show={showProductModal}
				hide={handleHideModal}
				currentProductIndx={currentProductIndx}
				product={products[currentProductIndx]}
				previousProduct={handlePreviousProduct}
				nextProduct={handleNextProduct}
				totalProducts={products.length}
			/>
		</div>
	);
};

export default ProductCollection;
