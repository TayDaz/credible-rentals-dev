import { Galleria } from "primereact/galleria";
import { url } from "../../../../../../config";
import "./styles.scss";

const ProductImageScroller = (props) => {
	const responsiveOptions = [
		{
			breakpoint: "1024px",
			numVisible: 5,
		},
		{
			breakpoint: "768px",
			numVisible: 3,
		},
		{
			breakpoint: "560px",
			numVisible: 1,
		},
	];

	const itemTemplate = (item) => (
		<div className="p-d-flex p-jc-center product-image-scroller__item-template__wrapper">
			<img
				src={`${url.image}/${item.key}`}
				alt={item?.alt || ""}
				// style={{ width: "100%", display: "block" }}
			/>
		</div>
	);

	const thumbnailTemplate = (item) => (
		<div className="p-d-flex p-jc-center product-image-scroller__thumbnail-template__wrapper">
			<img
				src={`${url.image}/${item.key}`}
				alt={item.alt || ""}
				// style={{ display: "block", width: "100px" }}
			/>
		</div>
	);

	const caption = (item) => (
		<>
			<h4>{item.title}</h4>
			{/* <p>{item.alt}</p> */}
		</>
	);

	return (
		<div className="product-image-scroller__wrapper">
			<Galleria
				value={props.images}
				responsiveOptions={responsiveOptions}
				numVisible={5}
				item={itemTemplate}
				thumbnail={thumbnailTemplate}
				caption={caption}
				// style={{ maxWidth: "640px", maxHeight: "500px" }}
				showItemNavigators
			/>
		</div>
	);
};

export default ProductImageScroller;
