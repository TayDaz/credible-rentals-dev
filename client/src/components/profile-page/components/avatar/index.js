import { useState } from "react";
import { Button } from "primereact/button";
import { url } from "../../../../config";
import Portfolio from "../../assets/images/portfolio.png";

// import ImageCropperCropperjs from "../image-cropper-cropperjs";
import ImageCropper from "../image-cropper";

import "./styles.scss";

const Avatar = (props) => {
	const [avatar, setAvatar] = useState(props.src);
	const [showDialog, setShowDialog] = useState(false);

	const handleSaveCroppedImage = (croppedImg) => {
		setAvatar(croppedImg);
		props.updateAvatar(croppedImg);
	};

	const handleShowDialog = () => {
		setShowDialog(true);
	};

	const handleHideDialog = () => {
		setShowDialog(false);
	};

	// let imgSrc;

	// if (!avatar) {
	// 	imgSrc = Portfolio;
	// } else {
	// 	if (avatar?.includes("http")) {
	// 		imgSrc = avatar;
	// 	} else {
	// 		imgSrc = `${url.image}/${avatar}`;
	// 	}
	// }

	return (
		<>
			<div className="avatar__image__container">
				<img
					src={avatar}
					// style={{ width: "200px", height: "200px", borderRadius: "50%" }}
					className="avatar-image"
				/>
				<Button
					icon="pi pi-pencil"
					className="p-button-rounded p-button-info p-button-sm avatar-edit-icon"
					onClick={handleShowDialog}
				/>
			</div>
			<ImageCropper
				src={avatar}
				isDialogVisible={showDialog}
				showDialog={handleShowDialog}
				hideDialog={handleHideDialog}
				saveCroppedImage={handleSaveCroppedImage}
			/>
		</>
	);
};

export default Avatar;
