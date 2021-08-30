// import ProductInfoView from "./components/product-info-view";
import { Galleria } from "primereact/galleria";
import { url } from "../../../../config";
import ProductImageScroller from "./components/product-image-scroller";
import "./styles.scss";
// import Image from "../custom-carousel/assets/images/image_1.jpg";

const ProductModal = (props) => {
	const {
		show,
		product,
		nextProduct,
		previousProduct,
		currentProductIndx,
		totalProducts,
	} = props;

	const prevBtnDisable = currentProductIndx === 0;
	const nextBtnDisable = currentProductIndx === totalProducts - 1;

	console.log("[product-modal/.js] product", product);

	return (
		<>
			{show && (
				<div className="product-modal__container">
					<div className="p-d-flex p-jc-end close-button__container">
						<div className="button__wrapper" onClick={props.hide}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="40"
								height="40"
								fill="#18595d"
								class="bi bi-x-lg"
								viewBox="0 0 16 16"
							>
								<path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z" />
							</svg>
						</div>
					</div>
					<div className="p-grid p-align-stretch p-justify-center p-fluid content__container">
						<div className="p-col-1 p-md-1 p-d-flex p-jc-center p-ai-center traverse-button-container">
							<button
								disabled={prevBtnDisable}
								onClick={previousProduct}
								className="traverse-button"
							>
								<i
									className="pi pi-chevron-left"
									style={{
										fontSize: "2em",
										color: "#18595D",
									}}
								></i>
							</button>
						</div>
						<div className="p-col-10 p-md-5 image-product-details__container">
							<ProductImageScroller images={product.images} />

							{/* <div className="p-d-flex p-jc-center image-wrapper">
								<img
									src={`${url.image}/${product.images[0].key}`}
									// style={{ width: "100%" }}
									alt="Product image"
								/>
							</div> */}
							<div className="p-grid product-details__container">
								<div className="p-col-12">Product name</div>
								<div className="p-col-12">Product name</div>
								<div className="p-col-12">Product name</div>
								<div className="p-col-12">Product name</div>
								<div className="p-col-12">Product name</div>
								<div className="p-col-12">Product name</div>
							</div>
						</div>
						<div className="p-col-1 p-md-1 p-d-flex p-jc-center p-ai-center traverse-button-container">
							<button
								disabled={nextBtnDisable}
								onClick={nextProduct}
								className="traverse-button"
							>
								<i
									className="pi pi-chevron-right"
									style={{
										fontSize: "2em",
										color: "#18595D",
									}}
								></i>
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

const ProductModal_old = (props) => {
	const {
		show,
		product,
		nextProduct,
		previousProduct,
		currentProductIndx,
		totalProducts,
	} = props;

	const prevBtnDisable = currentProductIndx === 0;
	const nextBtnDisable = currentProductIndx === totalProducts - 1;

	console.log("[product-modal/.js] product", product);

	return (
		<>
			{show && (
				<div className="product-modal__container">
					<div className="p-d-flex p-jc-end close-button__container">
						<div className="button__wrapper" onClick={props.hide}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="40"
								height="40"
								fill="#18595d"
								class="bi bi-x-lg"
								viewBox="0 0 16 16"
							>
								<path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z" />
							</svg>
						</div>
					</div>
					<div className="p-grid p-align-stretch p-justify-center p-fluid content__container">
						<div className="p-col-1 p-md-1 p-d-flex p-jc-center p-ai-center traverse-button-container">
							<button
								disabled={prevBtnDisable}
								onClick={previousProduct}
								className="traverse-button"
							>
								<i
									className="pi pi-chevron-left"
									style={{
										fontSize: "2em",
										color: "#18595D",
									}}
								></i>
							</button>
						</div>
						<div className="p-col-10 p-md-5 image-product-details__container">
							<div className="p-d-flex p-jc-center image-wrapper">
								<img
									src={`${url.image}/${product.images[0].key}`}
									// style={{ width: "100%" }}
									alt="Product image"
								/>
							</div>
							<div className="p-grid product-details__container">
								<div className="p-col-12">Product name</div>
								<div className="p-col-12">Product name</div>
								<div className="p-col-12">Product name</div>
								<div className="p-col-12">Product name</div>
								<div className="p-col-12">Product name</div>
								<div className="p-col-12">Product name</div>
							</div>
						</div>
						<div className="p-col-1 p-md-1 p-d-flex p-jc-center p-ai-center traverse-button-container">
							<button
								disabled={nextBtnDisable}
								onClick={nextProduct}
								className="traverse-button"
							>
								<i
									className="pi pi-chevron-right"
									style={{
										fontSize: "2em",
										color: "#18595D",
									}}
								></i>
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default ProductModal;
