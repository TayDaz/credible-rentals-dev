import "./styles.scss";
import Image from "../custom-carousel/assets/images/image_1.jpg";
const ProductViewer = (props) => {
	const view = props.view;
	return (
		<>
			{view && (
				<div
					className="product-viewer__container"
					onClick={props.hideView}
				>
					<div className="p-d-flex p-jc-end close-button__container">
						<div className="button__wrapper">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="40"
								height="40"
								fill="white"
								class="bi bi-x-lg"
								viewBox="0 0 16 16"
							>
								<path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z" />
							</svg>
						</div>
					</div>
					<div className="p-grid p-align-stretch p-justify-center p-fluid">
						<div className="p-col-1 p-md-1 p-d-flex p-jc-center p-ai-center">
							<i
								className="pi pi-chevron-left"
								style={{ fontSize: "2em" }}
							></i>
						</div>
						<div className="p-col-10 p-md-5 image-product-details__container">
							<img
								src={Image}
								style={{ width: "100%" }}
								alt="Product image"
							/>
							<div className=" product-details__container">
								<div className="p-col-12">Product name</div>
								<div className="p-col-12">Product name</div>
								<div className="p-col-12">Product name</div>
							</div>
						</div>
						<div className="p-col-1 p-md-1  p-d-flex p-jc-center p-ai-center">
							<i
								className="pi pi-chevron-right"
								style={{ fontSize: "2em" }}
							></i>
						</div>

						{/* <div className="p-col-12 p-md-8 product-details">
							<div className="p-grid">
								<div className="p-col-12">Name :</div>
								<div className="p-col-12">Price :</div>
								<div className="p-col-12">Name :</div>
							</div>
						</div>
						<div className=""></div> */}
					</div>
				</div>
			)}
		</>
	);
};

export default ProductViewer;
