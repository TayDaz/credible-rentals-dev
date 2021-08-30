import { url } from "../../../../config";
import "./styles.scss";

const Product = (props) => {
	const { product, index } = props;

	const selectProduct = () => {
		props.selectProduct(index);
	};
	return (
		<>
			{product ? (
				<div
					className="p-d-flex p-flex-column p-mr-2 p-mb-2 product__container"
					onClick={selectProduct}
				>
					<div className="p-d-flex p-jc-center image__container">
						<img
							src={`${url.image}/${product.images[0].key}`}
							alt=""
						/>
					</div>
					<div className="p-pl-2 p-d-flex p-ai-center product-info__container">
						<div className="product-info__wrapper">
							<div className="name__wrapper">{product.name}</div>
							<div className="rent-price__wrapper">
								{product.rentPrice}
							</div>
						</div>
					</div>
				</div>
			) : null}
		</>
	);
};

export default Product;
