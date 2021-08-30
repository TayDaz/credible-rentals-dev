import React from "react";
import { Dialog } from "primereact/dialog";
import { Galleria } from "primereact/galleria";
import { url } from "../../../../config";

export default class ProductDisplayWithDialog extends React.Component {
	constructor(props) {
		super(props);
		this.state = { images: props.product.images };

		this.itemTemplate = this.itemTemplate.bind(this);
	}
	// state = props.product.images;

	itemTemplate(item) {
		console.log("item", item);
		return (
			<img
				src={`${url.image}/${item.key}`}
				alt={item.alt}
				style={{ width: "100%", display: "block" }}
			/>
		);
	}

	// thumbnailTemplate(item) {
	// 	return (
	// 		<img
	// 			src={item.thumbnailImageSrc}
	// 			alt={item.alt}
	// 			style={{ display: "block" }}
	// 		/>
	// 	);
	// }

	render() {
		function header() {
			return <div>This is the header</div>;
		}

		return (
			<>
				<Galleria
					ref={(el) => (this.galleria2 = el)}
					value={this.state.images}
					responsiveOptions={this.responsiveOptions}
					numVisible={7}
					style={{ maxWidth: "850px" }}
					circular
					fullScreen
					showItemNavigators
					showThumbnails={false}
					item={this.itemTemplate}
					footer={header()}
					// thumbnail={this.thumbnailTemplate}
				/>

				<img
					src={`${url.image}/${this.props.product.images[0].key}`}
					// alt={item.alt}
					style={{ width: "150px", display: "block" }}
					onClick={() => this.galleria2.show()}
				/>
				{/* <Button
					label="Show"
					icon="pi pi-external-link"
					onClick={() => this.galleria2.show()}
				/> */}
			</>
		);
	}
}

// const ProductDisplayDialog1 = (props) => {
// 	const [displayDialog, setDisplayDialog] = useState(false);

// 	const { product } = props;

// 	console.log("[product-display-with-dialog/.js] product ", product);

// 	const handleHideDialog = () => {
// 		setDisplayDialog(false);
// 	};

// 	const displayProductDialog = () => {
// 		setDisplayDialog(true);
// 	};

// 	const ProductHeader = () => {
// 		return <div>Product Header</div>;
// 	};

// 	const ProductFooter = () => {
// 		return <div>Product Footer</div>;
// 	};

// 	const responsiveOptions = [
// 		{
// 			breakpoint: "1024px",
// 			numVisible: 5,
// 		},
// 		{
// 			breakpoint: "768px",
// 			numVisible: 3,
// 		},
// 		{
// 			breakpoint: "560px",
// 			numVisible: 1,
// 		},
// 	];

// 	const itemTemplate = (item) => {
// 		return (
// 			<img
// 				src={`${url.image}/${item.key}`}
// 				alt={item.alt}
// 				style={{ width: "100%", display: "block" }}
// 			/>
// 		);
// 	};

// 	const thumbnailTemplate = (item) => {
// 		return (
// 			<img
// 				src={`${url.image}/${item.key}`}
// 				alt={item.alt}
// 				style={{ display: "block", width: "50px" }}
// 			/>
// 		);
// 	};

// 	return (
// 		<>
// 			<img
// 				src={`${url.image}/${product.images[0].key}`}
// 				onError={(e) =>
// 					(e.target.src =
// 						"https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
// 				}
// 				alt={product.name}
// 				className="product-image"
// 				// style={{ width: "150px" }}
// 				onClick={displayProductDialog}
// 			/>

// 			<div>
// 				<h4 className="p-mb-1">{product.name}</h4>
// 				{/* <h6 className="p-mt-0 p-mb-3">
// 						${product.originalPriceAmount}
// 					</h6> */}
// 				{/* <span
// 						className={`product-badge status-${product.inventoryStatus.toLowerCase()}`}
// 					>
// 						{product.inventoryStatus}
// 					</span> */}
// 				<span>
// 					{/* {product.rentPriceAmount +
// 						" " +
// 						denominationMap[product.rentPriceDenomination] +
// 						"/" +
// 						product.rentPriceDuration} */}
// 				</span>
// 			</div>
// 			<Dialog
// 				header={ProductHeader}
// 				visible={displayDialog}
// 				onHide={handleHideDialog}
// 				breakpoints={{ "960px": "75vw" }}
// 				style={{ width: "50vw" }}
// 				footer={ProductFooter}
// 			>
// 				{/* <Galleria
// 					value={product.images}
// 					responsiveOptions={responsiveOptions}
// 					numVisible={5}
// 					item={itemTemplate}
// 					showItemNavigators
// 					showThumbnails={false}
// 					circular
// 					// thumbnail={thumbnailTemplate}
// 					// caption={this.caption}
// 					style={{ maxWidth: "640px" }}
// 				/> */}
// 				<Galleria
// 					value={product.images}
// 					responsiveOptions={responsiveOptions}
// 					numVisible={7}
// 					style={{ maxWidth: "850px" }}
// 					circular
// 					fullScreen
// 					showItemNavigators
// 					showThumbnails={false}
// 					item={itemTemplate}
// 					// thumbnail={this.thumbnailTemplate}
// 				/>
// 			</Dialog>
// 		</>
// 	);
// };

// export default ProductDisplayDialog;
