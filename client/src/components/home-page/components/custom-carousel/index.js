import { Carousel } from "primereact/carousel";
import Image1 from "./assets/images/image_7.jpg";
import Image2 from "./assets/images/image_8.jpg";
import Image3 from "./assets/images/image_9.jpg";
import Image4 from "./assets/images/image_1.jpg";
import Image5 from "./assets/images/image_11.jpg";
import Image6 from "./assets/images/image_12.jpg";

import "./styles.scss";

const CustomCarousel = (props) => {
	const products = [
		{
			image: Image1,
		},
		{
			image: Image2,
		},
		{
			image: Image3,
		},
		// {
		// 	image: Image4,
		// },
		{
			image: Image5,
		},
		{
			image: Image6,
		},
	];

	const responsiveOptions = [
		{
			breakpoint: "1024px",
			numVisible: 3,
			numScroll: 1,
		},
		{
			breakpoint: "600px",
			numVisible: 2,
			numScroll: 1,
		},
		{
			breakpoint: "480px",
			numVisible: 1,
			numScroll: 1,
		},
	];

	const productTemplate = (product) => {
		return (
			<div className="product-item">
				<div className="product-item-content">
					<div className="p-mb-3">
						<img
							src={product.image}
							onError={(e) =>
								(e.target.src =
									"https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
							}
							alt={product.name}
							className="product-image"
						/>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className="custom-carousel__wrapper">
			<Carousel
				value={products}
				numVisible={3}
				numScroll={1}
				responsiveOptions={responsiveOptions}
				itemTemplate={productTemplate}
				// header={<h5>Basic</h5>}
			/>
		</div>
	);
};

export default CustomCarousel;
