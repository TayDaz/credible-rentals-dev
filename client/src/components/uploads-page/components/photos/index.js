import { useState } from "react";
import AddImageContainer from "./components/add-image-container";

const Images = (props) => {
	// const [images, setImages] = useState([]);
	console.log("[uploads-page/photos/.js] images", props.images);

	// const handleAddImage = (src, title) => {
	// 	const updatedImages = [...images, { src, title }];
	// 	setImages(updatedImages);
	// };

	// const handleUpdateImage = (indx, src) => {
	// 	const updatedImages = [...images];
	// 	updatedImages[indx].src = src;
	// 	setImages(updatedImages);
	// };

	// const handleUpdateTitle = (indx, title) => {
	// 	const updatedImages = [...images];
	// 	updatedImages[indx].title = title;
	// 	setImages(updatedImages);
	// };

	// const handleDeleteImage = (indx) => {
	// 	const updatedImages = [...images];
	// 	updatedImages.splice(indx, 1);
	// 	setImages(updatedImages);
	// };

	return (
		<div className="p-col-12">
			<div className="p-fluid p-grid p-justify-center">
				{props.images.map((image, indx) => (
					<AddImageContainer
						key={indx}
						indx={indx}
						src={image.src}
						title={image.title}
						updateImage={props.handleUpdateImage}
						updateTitle={props.handleUpdateTitle}
						deleteImage={props.handleDeleteImage}
					/>
				))}
				<AddImageContainer addImage={props.handleAddImage} />
			</div>
		</div>
	);
};

export default Images;
